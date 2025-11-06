const mongoose = require("mongoose");
const Topic = require("./models/Topics");
require("dotenv").config();

// MongoDB Connection
const MONGODB_URI =
  "mongodb+srv://nankit793_db_user:6Unrr9pq7vqmac2q@cluster0.sn2gd36.mongodb.net/mernapp?retryWrites=true&w=majority&appName=Cluster0";

// Sample topics data
const topicsData = [
  {
    topicName: "algorithms",
    subTopics: [
      {
        subTopic: "Sorting Algorithms",
        difficulty: "Beginner",
        leetcodeLink: "https://leetcode.com/tag/sorting/",
        youtubeLink: "https://www.youtube.com/watch?v=pkkFqlG0Hds",
        articleLink: "https://www.geeksforgeeks.org/sorting-algorithms/",
      },
      {
        subTopic: "Binary Search",
        difficulty: "Beginner",
        leetcodeLink: "https://leetcode.com/problems/binary-search/",
        youtubeLink: "https://www.youtube.com/watch?v=V_T5NuccwRA",
        articleLink: "https://www.geeksforgeeks.org/binary-search/",
      },
      {
        subTopic: "Dynamic Programming Basics",
        difficulty: "Advanced",
        leetcodeLink: "https://leetcode.com/tag/dynamic-programming/",
        youtubeLink: "https://www.youtube.com/watch?v=oBt53YbR9Kk",
        articleLink: "https://www.geeksforgeeks.org/dynamic-programming/",
      },
      {
        subTopic: "Greedy Algorithms",
        difficulty: "Intermediate",
        leetcodeLink: "https://leetcode.com/tag/greedy/",
        youtubeLink: "https://www.youtube.com/watch?v=ARvQcqJ_-NY",
        articleLink: "https://www.geeksforgeeks.org/greedy-algorithms/",
      },
      {
        subTopic: "Graph Traversal (DFS/BFS)",
        difficulty: "Intermediate",
        leetcodeLink: "https://leetcode.com/tag/graph/",
        youtubeLink: "https://www.youtube.com/watch?v=pcKY4hjDrxk",
        articleLink:
          "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
      },
    ],
  },
  {
    topicName: "data structures",
    subTopics: [
      {
        subTopic: "Linked List Basics",
        difficulty: "Beginner",
        leetcodeLink: "https://leetcode.com/tag/linked-list/",
        youtubeLink: "https://www.youtube.com/watch?v=njTh_OwMljA",
        articleLink:
          "https://www.geeksforgeeks.org/data-structures/linked-list/",
      },
      {
        subTopic: "Stack and Queue",
        difficulty: "Beginner",
        leetcodeLink: "https://leetcode.com/tag/stack/",
        youtubeLink: "https://www.youtube.com/watch?v=wjI1WNcIntg",
        articleLink: "https://www.geeksforgeeks.org/stack-data-structure/",
      },
      {
        subTopic: "Binary Trees",
        difficulty: "Intermediate",
        leetcodeLink: "https://leetcode.com/tag/tree/",
        youtubeLink: "https://www.youtube.com/watch?v=fAAZixBzIAI",
        articleLink:
          "https://www.geeksforgeeks.org/binary-tree-data-structure/",
      },
      {
        subTopic: "Hash Tables",
        difficulty: "Intermediate",
        leetcodeLink: "https://leetcode.com/tag/hash-table/",
        youtubeLink: "https://www.youtube.com/watch?v=shs0KM3wKv8",
        articleLink: "https://www.geeksforgeeks.org/hashing-data-structure/",
      },
      {
        subTopic: "Heaps and Priority Queues",
        difficulty: "Advanced",
        leetcodeLink: "https://leetcode.com/tag/heap-priority-queue/",
        youtubeLink: "https://www.youtube.com/watch?v=t0Cq6tVNRBA",
        articleLink: "https://www.geeksforgeeks.org/heap-data-structure/",
      },
    ],
  },
  {
    topicName: "web development",
    subTopics: [
      {
        subTopic: "HTML Basics",
        difficulty: "Beginner",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
        articleLink: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
      },
      {
        subTopic: "CSS Flexbox",
        difficulty: "Beginner",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=fYq5PXgSsbE",
        articleLink: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
      },
      {
        subTopic: "JavaScript DOM Manipulation",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=5fb2aPlgoys",
        articleLink:
          "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
      },
      {
        subTopic: "React Basics",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
        articleLink: "https://react.dev/learn",
      },
      {
        subTopic: "Node.js & Express",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=Oe421EPjeBE",
        articleLink: "https://expressjs.com/",
      },
    ],
  },
  {
    topicName: "machine learning",
    subTopics: [
      {
        subTopic: "Linear Regression",
        difficulty: "Beginner",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=E5RjzSK0fvY",
        articleLink:
          "https://scikit-learn.org/stable/auto_examples/linear_model/plot_ols.html",
      },
      {
        subTopic: "Decision Trees",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=RmajweUFKvM",
        articleLink: "https://scikit-learn.org/stable/modules/tree.html",
      },
      {
        subTopic: "K-Means Clustering",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=4b5d3muPQmA",
        articleLink:
          "https://scikit-learn.org/stable/modules/clustering.html#k-means",
      },
      {
        subTopic: "Support Vector Machines",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=efR1C6CvhmE",
        articleLink: "https://scikit-learn.org/stable/modules/svm.html",
      },
      {
        subTopic: "Random Forests",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=J4Wdy0Wc_xQ",
        articleLink:
          "https://scikit-learn.org/stable/modules/ensemble.html#forest",
      },
    ],
  },
  {
    topicName: "mobile development",
    subTopics: [
      {
        subTopic: "Android Development Basics",
        difficulty: "Beginner",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=fis26HvvDII",
        articleLink: "https://developer.android.com/guide",
      },
      {
        subTopic: "iOS Development with Swift",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=F2ojC6TNwws",
        articleLink: "https://developer.apple.com/learn/curriculum/",
      },
      {
        subTopic: "React Native Fundamentals",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
        articleLink: "https://reactnative.dev/docs/getting-started",
      },
      {
        subTopic: "Flutter Widgets",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=x0uinJvhNxI",
        articleLink: "https://docs.flutter.dev/development/ui/widgets",
      },
      {
        subTopic: "Mobile App Deployment",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=E6qf-1Y2g9Y",
        articleLink: "https://developer.android.com/studio/publish",
      },
    ],
  },
  {
    topicName: "database management",
    subTopics: [
      {
        subTopic: "SQL Basics",
        difficulty: "Beginner",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        articleLink: "https://www.w3schools.com/sql/",
      },
      {
        subTopic: "Joins and Normalization",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=9Pzj7Aj25lw",
        articleLink: "https://www.geeksforgeeks.org/normal-forms-in-dbms/",
      },
      {
        subTopic: "Indexes and Query Optimization",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=HubezKbFL7E",
        articleLink: "https://use-the-index-luke.com/",
      },
      {
        subTopic: "Transactions and ACID Properties",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=J4VumFj31vE",
        articleLink: "https://www.geeksforgeeks.org/acid-properties-in-dbms/",
      },
      {
        subTopic: "NoSQL Databases Overview",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=KgDNoYAvde0",
        articleLink: "https://www.mongodb.com/nosql-explained",
      },
    ],
  },
  {
    topicName: "software engineering",
    subTopics: [
      {
        subTopic: "Software Development Life Cycle (SDLC)",
        difficulty: "Beginner",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=30gTNI4aaVI",
        articleLink:
          "https://www.geeksforgeeks.org/software-development-life-cycle-sdlc/",
      },
      {
        subTopic: "Agile Methodology",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=Z9QbYZh1YXY",
        articleLink: "https://www.atlassian.com/agile",
      },
      {
        subTopic: "Version Control (Git)",
        difficulty: "Beginner",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=RGOj5yH7evk",
        articleLink: "https://git-scm.com/doc",
      },
      {
        subTopic: "CI/CD Pipelines",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=scEDHsr3APg",
        articleLink: "https://www.redhat.com/en/topics/devops/what-is-ci-cd",
      },
      {
        subTopic: "System Design Basics",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=G6rV2ApmLkY",
        articleLink: "https://github.com/donnemartin/system-design-primer",
      },
    ],
  },
  {
    topicName: "artificial intelligence",
    subTopics: [
      {
        subTopic: "Introduction to AI",
        difficulty: "Beginner",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=JMUxmLyrhSk",
        articleLink: "https://www.ibm.com/topics/artificial-intelligence",
      },
      {
        subTopic: "Search Algorithms in AI",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=JtiK0DOeI4A",
        articleLink:
          "https://www.geeksforgeeks.org/uninformed-search-algorithms-in-ai/",
      },
      {
        subTopic: "Knowledge Representation",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=x8GeE34Mfrs",
        articleLink:
          "https://www.geeksforgeeks.org/knowledge-representation-in-ai/",
      },
      {
        subTopic: "Natural Language Processing Basics",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=fIvKw8K8Rj8",
        articleLink: "https://www.ibm.com/topics/natural-language-processing",
      },
      {
        subTopic: "Computer Vision Introduction",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=5BcjvJjKnqM",
        articleLink:
          "https://www.geeksforgeeks.org/introduction-to-computer-vision/",
      },
    ],
  },
  {
    topicName: "cybersecurity",
    subTopics: [
      {
        subTopic: "Network Security Basics",
        difficulty: "Beginner",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=Yz3s2g9pR3U",
        articleLink: "https://www.geeksforgeeks.org/network-security-basics/",
      },
      {
        subTopic: "Cryptography Fundamentals",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=NLDT3xzGzN4",
        articleLink:
          "https://www.geeksforgeeks.org/cryptography-and-its-types/",
      },
      {
        subTopic: "Web Application Security",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=ZbZ8Jxnb2Dk",
        articleLink: "https://owasp.org/www-project-top-ten/",
      },
      {
        subTopic: "Ethical Hacking Overview",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=lR0nh-TdpVg",
        articleLink:
          "https://www.geeksforgeeks.org/introduction-to-ethical-hacking/",
      },
      {
        subTopic: "Incident Response",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=7H7gLU5x8Io",
        articleLink:
          "https://www.crowdstrike.com/cybersecurity-101/incident-response/",
      },
    ],
  },
  {
    topicName: "blockchain",
    subTopics: [
      {
        subTopic: "Blockchain Basics",
        difficulty: "Beginner",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
        articleLink: "https://www.ibm.com/topics/what-is-blockchain",
      },
      {
        subTopic: "Smart Contracts",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=ZE2HxTmxfrI",
        articleLink: "https://ethereum.org/en/developers/docs/smart-contracts/",
      },
      {
        subTopic: "Consensus Mechanisms",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=8zKuNo4ay8E",
        articleLink:
          "https://www.geeksforgeeks.org/consensus-algorithms-in-blockchain/",
      },
      {
        subTopic: "Ethereum and DApps",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=WSN5BaCzsbo",
        articleLink: "https://ethereum.org/en/developers/docs/dapps/",
      },
      {
        subTopic: "Blockchain Security",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=YbxPz7vD2BE",
        articleLink:
          "https://www.geeksforgeeks.org/security-issues-in-blockchain-technology/",
      },
    ],
  },
  {
    topicName: "ui/ux design",
    subTopics: [
      {
        subTopic: "UI vs UX Basics",
        difficulty: "Beginner",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=9B1VSRg6a9M",
        articleLink:
          "https://www.interaction-design.org/literature/topics/ui-vs-ux",
      },
      {
        subTopic: "Design Principles",
        difficulty: "Beginner",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=6K00P7zkMnA",
        articleLink:
          "https://uxplanet.org/basic-principles-of-ui-design-5f2a8e8e92b7",
      },
      {
        subTopic: "Wireframing and Prototyping",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=2zKzZcS5xCA",
        articleLink:
          "https://www.adobe.com/creativecloud/ui-ux/wireframing.html",
      },
      {
        subTopic: "User Research Methods",
        difficulty: "Intermediate",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=7VbUPlb5Wyk",
        articleLink:
          "https://www.nngroup.com/articles/ux-research-cheat-sheet/",
      },
      {
        subTopic: "Accessibility in Design",
        difficulty: "Advanced",
        leetcodeLink: "",
        youtubeLink: "https://www.youtube.com/watch?v=3f31oufqFSM",
        articleLink: "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
      },
    ],
  },
];

// Connect to MongoDB and seed data
async function seedTopics() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Clear existing topics (optional - comment out if you want to keep existing data)
    // await Topic.deleteMany({});
    // console.log("🗑️  Cleared existing topics");

    // Check if topics already exist
    const existingTopics = await Topic.find();
    if (existingTopics.length > 0) {
      console.log(
        `⚠️  Found ${existingTopics.length} existing topics. Skipping seed to avoid duplicates.`
      );
      console.log(
        "💡 To reseed, delete existing topics first or modify the script."
      );
      await mongoose.connection.close();
      process.exit(0);
    }

    // Insert topics
    const topics = await Topic.insertMany(topicsData);
    console.log(`✅ Successfully seeded ${topics.length} topics`);
    console.log("\n📋 Seeded Topics:");
    topics.forEach((topic, index) => {
      console.log(
        `${index + 1}. ${topic.topicName} - ${topic.subTopic} [${topic.status}]`
      );
    });

    // Close connection
    await mongoose.connection.close();
    console.log("✅ Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding topics:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the seed function
seedTopics();
