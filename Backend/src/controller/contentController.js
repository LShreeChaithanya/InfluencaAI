const Post = require('../models/Post');
const twitterService = require('../services/twitterService');
const aiService = require('../services/aiService');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    // Analyze content using AI
    const contentScore = await aiService.analyzeContent(content);

    if (contentScore < 0.5) {
      return res.status(400).json({ message: 'Content quality is too low. Please improve your post.' });
    }

    // Post to Twitter
    const tweetData = await twitterService.postTweet(userId, content);

    // Save post to database
    const post = new Post({
      user: userId,
      content,
      twitterId: tweetData.id_str,
    });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
};