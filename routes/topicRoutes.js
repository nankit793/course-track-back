const express = require("express");
const router = express.Router();
const Topic = require("../models/Topics");
const UserSubTopicStatus = require("../models/UserSubTopicStatus");
const { protect } = require("../middleware/auth");

// GET all topics with user statuses
router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const topics = await Topic.find().sort({ createdAt: -1 });

    // Get all user statuses for these topics
    const userStatuses = await UserSubTopicStatus.find({ userId });

    // Create a map of topicId-subTopicId -> status
    const statusMap = new Map();
    userStatuses.forEach((us) => {
      statusMap.set(`${us.topicId}-${us.subTopicId}`, us.status);
    });

    // Attach user statuses to topics
    const topicsWithStatuses = topics.map((topic) => {
      const topicObj = topic.toObject();
      topicObj.subTopics = topicObj.subTopics.map((subTopic) => {
        const statusKey = `${topic._id}-${subTopic._id}`;
        const userStatus = statusMap.get(statusKey);
        return {
          ...subTopic,
          userStatus: userStatus || "pending",
        };
      });
      return topicObj;
    });

    res.json(topicsWithStatuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET topic by ID
router.get("/:id", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new topic
router.post("/", async (req, res) => {
  try {
    const { topicName, subTopics } = req.body;

    // Validate required fields
    if (!topicName) {
      return res.status(400).json({ message: "Topic name is required" });
    }

    const topic = new Topic({
      topicName,
      subTopics: subTopics || [],
    });

    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

// PUT update topic
router.put("/:id", async (req, res) => {
  try {
    const { topicName, subTopics } = req.body;

    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      {
        topicName,
        subTopics,
      },
      { new: true, runValidators: true }
    );

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json(topic);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

// DELETE topic
router.delete("/:id", async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json({ message: "Topic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET topics by status (optional filter endpoint)
router.get("/status/:status", async (req, res) => {
  try {
    const { status } = req.params;

    if (status !== "pending" && status !== "done") {
      return res
        .status(400)
        .json({ message: "Invalid status. Must be 'pending' or 'done'" });
    }

    const topics = await Topic.find({ status }).sort({ createdAt: -1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET topics by topicName (optional filter endpoint)
router.get("/topicName/:topicName", async (req, res) => {
  try {
    const { topicName } = req.params;
    const topics = await Topic.find({ topicName }).sort({ createdAt: -1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update subtopic status for a user
// @route   PUT /api/topics/:topicId/subtopics/:subTopicId/status
// @desc    Update subtopic status for authenticated user
// @access  Private
router.put(
  "/:topicId/subtopics/:subTopicId/status",
  protect,
  async (req, res) => {
    try {
      const { topicId, subTopicId } = req.params;
      const { status } = req.body;
      const userId = req.user._id;

      // Validate status
      if (!status || !["pending", "done"].includes(status)) {
        return res
          .status(400)
          .json({ message: "Status must be 'pending' or 'done'" });
      }

      // Verify topic exists
      const topic = await Topic.findById(topicId);
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }

      // Verify subtopic exists
      const subTopic = topic.subTopics.id(subTopicId);
      if (!subTopic) {
        return res.status(404).json({ message: "SubTopic not found" });
      }

      // Find or create user status
      let userStatus = await UserSubTopicStatus.findOne({
        userId,
        topicId,
        subTopicId,
      });

      if (userStatus) {
        // Update existing status
        userStatus.status = status;
        await userStatus.save();
      } else {
        // Create new status
        userStatus = await UserSubTopicStatus.create({
          userId,
          topicId,
          subTopicId,
          status,
        });
      }

      res.json({ success: true, userStatus });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
);

// GET user's statuses for all subtopics in a topic
// @route   GET /api/topics/:topicId/user-statuses
// @desc    Get all user statuses for subtopics in a topic
// @access  Private
router.get("/:topicId/user-statuses", protect, async (req, res) => {
  try {
    const { topicId } = req.params;
    const userId = req.user._id;

    const userStatuses = await UserSubTopicStatus.find({
      userId,
      topicId,
    });

    res.json(userStatuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all user's statuses
// @route   GET /api/topics/user-statuses/all
// @desc    Get all statuses for the authenticated user
// @access  Private
router.get("/user-statuses/all", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const userStatuses = await UserSubTopicStatus.find({ userId });

    res.json(userStatuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
