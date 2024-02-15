// import mongoose and bcrypt
import { Schema, model, models } from "mongoose";
//import bcrypt from "bcrypt";

// define the user schema
const NewUserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 2-20 alphanumeric letters and be unique",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  image: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["admin", "user"], // only allow these two values
    default: "user", // Default role to user
  },
});

// hash the password before saving
/** UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// compare the password with the hashed one
UserSchema.methods.comparePassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};
**/

// create or get the user model
const User = models.User || model("User", NewUserSchema);

// export the user model
export default User;
