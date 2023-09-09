import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  {
    // To store the date created and updated
    timestamps: true,
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
