const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    lastLoginDate: {
      type: Date,
      default: null,
    },
    is2FaEnabled: {
      type: Boolean,
      default: false,
    },
    secret2faKey: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: "ACTIVE",
      enum: ["ACTIVE", "DEACTIVE"],
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    isTest: {
      type: Boolean,
      default: false,
    },
    isNewUser: {
      type: Boolean,
      default: false,
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
