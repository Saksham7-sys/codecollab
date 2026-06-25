import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    adminUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminUsername: {
      type: String,
      required: true,
      trim: true,
    },
    accessMode: {
      type: String,
      enum: ["open", "approval"],
      default: "open",
    },
    language: {
      type: String,
      default: "cpp",
    },
    code: {
      type: String,
      default: "",
    },
    input: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;