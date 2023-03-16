const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validator: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      require: [true, "Email address is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
          }),
        message: "Password {VALUE} Is Not Strong",
      },
    },

    confirmPassword: {
      type: String,
      required: [true, "Please Confirm Your Password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password isn't match",
      },
    },

    role: {
      type: String,
      enum: ["viewer", "moderator", "admin"],
      default: "viewer",
    },

    name: {
      type: String,
      required: [true, "Please provide your name"],
      minLength: [3, "Name must be at list 3 characters"],
      maxLength: [100, "Name is to long"],
    },

    contactNumber: {
      type: Number,
    },

    imgURL: {
      type: String,
      validate: [validator.isURL, "pls provide a valid url"],
    },
    primary: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },

  { timestamps: true }
);

// password hashing
userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcryptjs.hashSync(password);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcryptjs.compareSync(password, hash);
  return isPasswordValid;
};

const user = mongoose.model("user", userSchema);
module.exports = user;
