import mongoose from "mongoose";

const allowedUserSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    approvedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

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
      trim: true,
    },
    code: {
      type: String,
      default: "",
    },
    input: {
      type: String,
      default: "",
    },
    allowedUsers: {
      type: [allowedUserSchema],
      default: [],
    },
    isSessionActive: {
      type: Boolean,
      default: true,
    },
    lastSessionStartedAt: {
      type: Date,
      default: Date.now,
    },
    lastSessionEndedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;