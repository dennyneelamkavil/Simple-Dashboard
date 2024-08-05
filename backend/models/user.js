const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    address: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmpassword: {
      type: String,
      required: true,
    },
    image: String,
    imagePublicId: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
