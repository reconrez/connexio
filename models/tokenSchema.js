const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    refresh_token: {
      type: String,
      unique: false,
    },
    user_id: {
      type: mongoose.Schema.Types.UUID,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const TokenModel = mongoose.model("Token", TokenSchema);

module.exports = TokenModel;