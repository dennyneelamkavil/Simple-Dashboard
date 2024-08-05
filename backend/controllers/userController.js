const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinaryConfig");
const UserJoi = require("../validations/userJoi");
const UserModel = require("../models/user");

exports.addUser = async (req, res) => {
    const userDetails = req.body;
    if(req.file) {
        userDetails.image = req.file.path;
        userDetails.imagePublicId = req.file.filename;
    }
    await UserJoi.validateAsync(userDetails);
    userDetails.password = await bcrypt.hash(userDetails.password, 10);
    userDetails.confirmpassword = await bcrypt.hash(userDetails.confirmpassword, 10);
    const user = new UserModel(userDetails);
    console.log(user);
    await user.save();
    res.status(201).send({message: "User added successfully"});
};

exports.getAllUsers = async (req, res) => {
    const allUsers = await UserModel.find({});
    res.status(200).send({data: allUsers, message: "Users fetched successfully"});
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if(!user) {
        return res.status(404).send({message: "User not found"});
    }
    res.status(200).send({data: user, message: "User fetched successfully"});
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findByIdAndDelete(id);
    if(!user) {
        return res.status(404).send({message: "User not found"});
    }
    if(user.imagePublicId) {
        await cloudinary.uploader.destroy(user.imagePublicId);
    }
    res.status(200).send({data: user, message: "User deleted successfully"});
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    if(req.file) {
        newData.image = req.file.path;
        newData.imagePublicId = req.file.filename;
    }
    newData.password = await bcrypt.hash(newData.password, 10);
    newData.confirmpassword = await bcrypt.hash(newData.confirmpassword, 10);
    const user = await UserModel.findByIdAndUpdate(id, newData);
    if(!user) {
        return res.status(404).send({message: "User not found"});
    }
    res.status(200).send({data: user, message: "User updated successfully"});
}