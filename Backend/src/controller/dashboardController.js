const User = require('../models/User');
const Post = require('../models/Post');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const posts = await Post.find({ user: userId });

    // Calculate engagement rate (this is a simplified version)
    const totalEngagement = posts.reduce((sum, post) => 
      sum + post.engagement.likes + post.engagement.retweets + post.engagement.replies, 0);
    const avgEngagementRate = (totalEngagement / (posts.length * user.followers)) * 100;

    // Get engagement history (simplified)
    const engagementHistory = posts.map(post => ({
      date: post.createdAt,
      rate: ((post.engagement.likes + post.engagement.retweets + post.engagement.replies) / user.followers) * 100
    }));

    res.json({
      followers: user.followers,
      avgEngagementRate: avgEngagementRate.toFixed(2),
      engagementHistory
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching dashboard data', error: error.message });
  }
};