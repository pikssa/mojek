const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const validation = require("../validations/validation")
const jwt = require("jsonwebtoken")


const createUser = async function (req, res) {
    try {
        let data = req.body;
        let { fname, lname, email, password, phone, address } = data
        let files = req.files

        if (!validation.isValidRequestBody(data)) return res.status(400).send({ status: false, msg: "please provide  details" })

        if (!validation.isValid(fname)) return res.status(400).send({ status: false, message: "first name is required or not valid" })

        if (!validation.isValid(lname)) return res.status(400).send({ status: false, message: "last name is required or not valid" })



        if (!validation.isValid(email)) return res.status(400).send({ status: false, message: "email is required or not valid" })

        if (!validation.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })

        let checkEmail = await userModel.findOne({ email: email })

        if (checkEmail) return res.status(409).send({ status: false, msg: "email already exist" })



        if (!validation.isValid(password)) return res.status(400).send({ status: false, message: "Pasworrd is required or not valid" })

        if (!validation.isValidPassword(password)) return res.status(400).send({ status: false, message: "Password length should be 8 to 15 digits and enter atleast one uppercase or lowercase" })



        if (!validation.isValid(phone)) return res.status(400).send({ status: false, message: "phone is required or not valid" })

        if (!validation.isValidNumber(phone)) return res.status(400).send({ status: false, message: "phone number is not valid" })

        let checkPhone = await userModel.findOne({ phone: phone })

        if (checkPhone) return res.status(409).send({ status: false, msg: "Phone already exist" })



        const saltRounds = 10
        const hash = bcrypt.hashSync(password, saltRounds)
        data.password = hash

        // data.address = addresss
        let createUser = await userModel.create(data)
        return res.status(201).send({ status: true, message: "user created successfully", createUser })

    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


const loginUser = async (req, res) => {
    try {
        let data = req.body


        let { email, password } = data
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Email and password is required to login" })

        if (!validation.isValid(email)) return res.status(400).send({ status: false, message: "email is required or not valid" })

        if (!validation.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })

        if (!validation.isValid(password)) return res.status(400).send({ status: false, message: "password is required or not valid" })

        if (!validation.isValidPassword(password)) return res.status(400).send({ status: false, message: "Password length should be 8 to 15 digits and enter atleast one uppercase or lowercase" })




        let getUserData = await userModel.findOne({ email: data.email })
        if (!getUserData) return res.status(401).send({ status: false, msg: "Invalid credentials" })
        let ps = bcrypt.compareSync(password, getUserData.password)  //Sync
        //console.log(ps)
        if (!ps) return res.status(401).send({ status: false, msg: "ps wrong" })

        let token = jwt.sign({
            userID: getUserData._id,
        }, "sip-cal", { expiresIn: '30d' })



        res.status(200).send({ status: true, message: "User Login succesfully", data: { userId: getUserData._id, token: token } },)
    } catch (err) {
        res.status(500).send({ status: true, Error: err.message })
    }
}




const updateUserList = async (req, res) => {
    try {
        // Validate body
        const body = req.body
        //const reqBody = JSON.parse(req.body.data)



        // if (!validation.isValidRequestBody(body)) {
        //     return res.status(400).send({ status: false, msg: "Details must be present to update" })
        // }

        // Validate params
        userId = req.params.userId
        if (!validation.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, msg: `${userId} is invalid` })
        }

        const userFound = await userModel.findOne({ _id: userId })
        if (!userFound) {
            return res.status(404).send({ status: false, msg: "User does not exist" })
        }


        // AUTHORISATION
        let tokenId = req.userId
        if (!(userId == tokenId)) return res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });


        // Destructuring
        let { fname, lname, email, phone, password } = body;

        let updatedData = {}

        // console.log(fname)
        if (fname == "") return res.status(400).send({ status: false, msg: "fname not valid" })

        // console.log("hyuoy")
        if (fname) {
            if (!validation.isValid(fname)) {
                return res.status(400).send({ status: false, msg: "not valid fname" })
            }
            let Pattern = /^[a-zA-Z ]*$/;
            if (!(Pattern.test(fname))) return res.status(400).send({ status: false, msg: "not a valid format for fname" })

            updatedData['fname'] = fname

        }

        // console.log("iuniuin")
        if (lname == "") return res.status(400).send({ status: false, msg: "lname not valid" })
        if (lname) {
            if (!validation.isValid(lname)) {
                return resstatus(400).send({ status: false, msg: "not valid lname" })
            }
            let Pattern = /^[a-zA-Z ]*$/;
            if (!(Pattern.test(lname))) return res.status(400).send({ status: false, msg: "not a valid lname" })

            updatedData['lname'] = lname
        }

        // Updating of email
        if (validation.isValid(email)) {
            if (!validation.isValidEmail(email)) {
                return res.status(400).send({ status: false, msg: "Invalid email id" })
            }


            // Duplicate email
            const duplicatemail = await userModel.find({ email: email })
            if (duplicatemail.length) {
                return res.status(400).send({ status: false, msg: "email id already exist" })
            }
            updatedData['email'] = email
        }

        // Updating of phone
        if (validation.isValid(phone)) {
            if (!validation.isValidNumber(phone)) {
                return res.status(400).send({ status: false, msg: "Invalid phone number" })
            }

            // Duplicate phone
            const duplicatePhone = await userModel.find({ phone: phone })
            if (duplicatePhone.length) {
                return res.status(400).send({ status: false, msg: "phone number already exist" })
            }
            updatedData['phone'] = phone
        }

        // Updating of password
        if (password) {
            if (!validation.isValid(password)) {
                return res.status(400).send({ status: false, message: 'password is required' })
            }
            if (!validation.isValidPassword(password)) {
                return res.status(400).send({ status: false, message: "Password should be Valid min 8 character and max 15 " })
            }
            const encrypt = await bcrypt.hash(password, 10)
            updatedData['password'] = encrypt
        }



        //check it once.........................................................................................
        if (!validation.isValidRequestBody(updatedData)) { return res.status(400).send({ status: false, msg: "give some body for update" }) }
        console.log(updatedData)

        const updated = await userModel.findOneAndUpdate({ _id: userId }, updatedData, { new: true })

        return res.status(201).send({ status: true, data: updated })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message });
    };
}


const sipCalculatipon = async (req, res) => {
    try {

        userId = req.params.userId
        if (!validation.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, msg: `${userId} is invalid` })
        }

        const userFound = await userModel.findOne({ _id: userId })
        if (!userFound) {
            return res.status(404).send({ status: false, msg: "User does not exist" })
        }


        // AUTHORISATION
        let tokenId = req.userId
        if (!(userId == tokenId)) return res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });

        // Validate body
        const body = req.body
        if (!validation.isValidRequestBody(body)) { return res.status(400).send({ status: false, msg: "give some body for update" }) }
        // Destructuring
        let { P, n, r } = body

        //validation
        if (isNaN(P)) return res.status(400).send({ status: false, message: "P(Amount you invest through SIP) is required or not valid" })

        if (isNaN(n)) return res.status(400).send({ status: false, message: "n(Investment duration in months) is required or not valid" })



        if (isNaN(r)) return res.status(400).send({ status: false, message: "r(Expected rate of return) is required or not valid" })

        
        //check it once.........................................................................................


        let i = r / (12 * 100)

        let FV = (P * ((1 + i) ** n - 1) * (1 + i)) / i






        return res.status(200).send({ status: true, data: FV })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message });
    };
}


module.exports = { updateUserList, createUser, loginUser, sipCalculatipon }