const mongoose = require("mongoose");

const userSubTopicStatusSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: [true, "Topic ID is required"],
      index: true,
    },
    subTopicId: {
      type: String,
      required: [true, "SubTopic ID is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "done"],
        message:
          "{VALUE} is not a valid status. Status must be 'pending' or 'done'",
      },
      default: "pending",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure one status per user per subtopic
userSubTopicStatusSchema.index(
  { userId: 1, topicId: 1, subTopicId: 1 },
  { unique: true }
);

module.exports = mongoose.model("UserSubTopicStatus", userSubTopicStatusSchema);
