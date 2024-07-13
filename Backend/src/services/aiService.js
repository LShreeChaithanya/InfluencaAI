const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generateContentSuggestions = async (recentTweets) => {
  const prompt = `Based on these recent tweets: ${recentTweets.map(t => t.text).join('\n')}\n\nGenerate 3 tweet ideas:`;
  
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    max_tokens: 200,
    n: 3,
    stop: null,
    temperature: 0.8,
  });

  return response.data.choices.map(choice => choice.text.trim());
};

exports.generatePartnershipSuggestions = async (userProfile) => {
  const prompt = `Based on this Twitter user profile: ${JSON.stringify(userProfile)}\n\nGenerate 3 brand partnership suggestions:`;
  
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    max_tokens: 200,
    n: 3,
    stop: null,
    temperature: 0.8,
  });

  return response.data.choices.map(choice => ({
    brandName: choice.text.split(':')[0].trim(),
    description: choice.text.split(':')[1].trim(),
    matchScore: Math.floor(Math.random() * 20) + 80 // Random score between 80-100
  }));
};
