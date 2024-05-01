const { sendSuccessResponse, sendErrorResponse } = require('../../../config/helper');
const Users = require('../../models/Users')
const registerRecruiter = async (req, res) => {
    try {
        const { email, password, confirmPassword, name, company_name } = req.body;
        if (password == confirmPassword) {
            return sendErrorResponse(res, 400, "Passwords do not match");
        }
        const userExists = await Users.findOne({ email });
        if (userExists) {
            return sendErrorResponse(res, 403, "Email is already in use");
        }
        const newUser = new Users({ email, password });
        if (name) newUser.name = name;
        if (company_name) newUser.company_name = company_name;
        await newUser.save();
        const responseData = {
            id: newUser._id,
            email: newUser.email
        };
        if (newUser.name) responseData.name = newUser.name;
        if (newUser.company_name) responseData.company_name = newUser.company_name;
        return sendSuccessResponse(res, "Registered Successfully!", responseData);
    } catch (error) {
        return sendErrorResponse(res, 500, "An Unexpected Error occurred! " + error.message);
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return sendErrorResponse(res, 402, "Invalid email or password");
        }
        return sendErrorResponse(res, "Login successful", '');
    } catch (error) {
        return sendErrorResponse(res, 500, "An Unexpected Error occurred! " + error.message);
    }
}
const allMethods = {
    registerRecruiter,
    login
}
module.exports = allMethods;