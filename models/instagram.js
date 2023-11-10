const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const instagramSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Instagram", instagramSchema);
