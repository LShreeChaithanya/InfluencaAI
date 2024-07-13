const Post = require('../models/Post');
const aiService = require('../services/aiService');

exports.getAnalyticsData = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 }).limit(100);

    // Get top performing posts
    const topPosts = posts.sort((a, b) => 
      (b.engagement.likes + b.engagement.retweets + b.engagement.replies) - 
      (a.engagement.likes + a.engagement.retweets + a.engagement.replies)
    ).slice(0, 10);

    // Get audience demographics (this would typically come from Twitter API)
    const audienceDemographics = await aiService.getAudienceDemographics(userId);

    res.json({
      topPosts: topPosts.map(post => ({
        id: post._id,
        content: post.content,
        engagement: post.engagement.likes + post.engagement.retweets + post.engagement.replies
      })),
      audienceDemographics
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching analytics data', error: error.message });
  }
};