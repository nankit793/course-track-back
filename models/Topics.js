const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    topicName: {
      type: String,
      required: [true, "Please provide a topic name"],
      enum: {
        values: [
          "algorithms",
          "data structures",
          "web development",
          "mobile development",
          "database management",
          "software engineering",
          "machine learning",
          "artificial intelligence",
          "cybersecurity",
          "blockchain",
          "ui/ux design",
        ],
        message: "{VALUE} is not a valid topic name",
      },
      trim: true,
    },
    subTopics: [
      {
        subTopic: {
          type: String,
          required: true,
          trim: true,
        },
        leetcodeLink: {
          type: String,
          trim: true,
          default: "",
        },
        youtubeLink: {
          type: String,
          trim: true,
          default: "",
        },
        articleLink: {
          type: String,
          trim: true,
          default: "",
        },
        difficulty: {
          type: String,
          enum: {
            values: ["Beginner", "Intermediate", "Advanced"],
            message: "{VALUE} is not a valid difficulty",
          },
          default: "easy",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Topic", topicSchema);
