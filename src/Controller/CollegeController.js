const collegeModel = require("../Model/CollegeModel")
const internModel = require("../Model/InternModel")
const validator = require("../validator/validator");

// Create collage function
const createCollege = async function (req, res) {
    try {
        let data = req.body
        // Checking input from request body
        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: "Bad Request,No Data Provided" })
        };
        let { name, fullName, logoLink } = data;

        // College Name is Mandatory
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, msg: " College Name is required" });
        }
        // FullName is Mandatory
        if (!validator.isValid(fullName)) {
            return res.status(400).send({ status: false, msg: "FullName of College is required" });
        }
        //Logolink is Mandatory
        if (!validator.isValid(logoLink)) {
            return res.status(400).send({ status: false, msg: "logoLink is required" });
        }
        
        // // Checking the inputted short name only in lowercase
        // let shortName = /^[a-z]+$/;
        // if(!shortName.test(data.name)){
        //     return res.status(400).send({ status: false, msg: "Use lowercase only" })
        // }

        // Checking college short name from our existing data base
        let findCollege = await collegeModel.findOne({ name: data.name })
        if (findCollege) {
            return res.status(400).send({ status: false, msg: "College already exist" })
        }

        // This is the URl format for checking if the inputted URL perfectely formatted or not
        let validUrlPattern = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        if (!validUrlPattern.test(data.logoLink)) {
            return res.status(400).send({ status: false, msg: "Not a valid URL" })
        }

        // let findUrl = await collegeModel.findOne({logoLink: data.logoLink})
        // console.log(findUrl)
        // if(findUrl){
        //     return res.status(400).send({staus: false, msg:"URL is already used"})
        // }

        // Creating college
        let createCollege = await collegeModel.create(data);

        return res.status(201).send({ status: true, msg: "College has been created successfully", createCollege })

    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }

}

// Get college details function
const getInterns = async function (req, res) {
    try {
        const data = req.query
        // Checking data from req.query
        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: "Bad Request, No Data Provided" })
        };

        let collegeName = req.query.collegeName
        // College Name is Mandatory in req.query
        if (!validator.isValid(collegeName)) {
            return res.status(400).send({ status: false, msg: "College name is rquired" })
        }

        // Checking inputted college sort name for lowercase
        let shortName = /^[a-z]+$/;
        if(!shortName.test(collegeName)){
            return res.status(400).send({ status: false, msg: "Input college short name in lowercase" })
        }

        // Checking inputted college name from our existing data base
        let findCollege = await collegeModel.findOne({ name: collegeName })
        if (!findCollege) {
            return res.status(400).send({ status: false, msg: "This college is not found" })
        }
        // Finding all the interns from our existing dada base
        let findInterns = await internModel.find({ collegeId: findCollege._id, isDeleted: false })
            .select({ _id: 1, name: 1, email: 1, mobile: 1 })
        // { collegeId: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })

        // Checking length the length of findInterns
        if (findInterns.length == 0) {
            return res.status(404).send({ status: false, msg: "No intern is resisterd for this college" })
        }

        res.status(200).send({
            status: true,
            data: {
                "name": findCollege.name,
                "fullName": findCollege.fullName,
                "logoLink": findCollege.logoLink,
                "interests": findInterns
            }
        })

    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


module.exports.createCollege = createCollege
module.exports.getInterns = getInterns
