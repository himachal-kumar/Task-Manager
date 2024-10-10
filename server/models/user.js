import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, },
    title: { type: String, },
    role: { type: String,  },
    email: { type: String,  unique: true },
    password: { type: String,  },
    isAdmin: { type: Boolean, default: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
