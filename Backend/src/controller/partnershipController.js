const aiService = require('../services/aiService');

exports.getPartnershipData = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Use AI to find potential partnerships
    const potentialPartnerships = await aiService.findPotentialPartnerships(userId);

    res.json({
      potentialPartnerships: potentialPartnerships.map(partnership => ({
        id: partnership.id,
        brandName: partnership.brandName,
        matchScore: partnership.matchScore,
        description: partnership.description
      }))
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching partnership data', error: error.message });
  }
};