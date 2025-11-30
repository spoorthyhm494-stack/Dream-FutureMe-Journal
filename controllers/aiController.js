// controllers/aiController.js
export const generateRoadmap = async (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({ message: "Domain is required" });
    }

    // Simple logic-based roadmap (NO external API)
    const roadmap = [
      { step: 1, title: `Basics of ${domain}`, details: `Start with the fundamentals of ${domain}.` },
      { step: 2, title: `Core Concepts`, details: `Learn the important concepts used in ${domain}.` },
      { step: 3, title: `Beginner Projects`, details: `Build simple projects to strengthen your skills.` },
      { step: 4, title: `Advanced Topics`, details: `Move to advanced and real-world concepts.` },
      { step: 5, title: `Career Prep`, details: `Prepare for jobs or internships in ${domain}.` }
    ];

    res.status(200).json({ roadmap });

  } catch (error) {
    res.status(500).json({ message: "Error generating roadmap", error });
  }
};


export const analyzeDream = async (req, res) => {
  try {
    const { dreamText } = req.body;

    if (!dreamText) {
      return res.status(400).json({ message: "Dream text is required" });
    }

    // Simple dream analysis logic
    const interpretation = {
      summary: dreamText,
      emotion: dreamText.includes("fear") ? "Fear" :
               dreamText.includes("happy") ? "Happiness" :
               "Neutral",
      meaning: "This dream reflects your subconscious thoughts.",
      suggestion: "Try maintaining a journal to understand patterns."
    };

    res.status(200).json({ interpretation });

  } catch (error) {
    res.status(500).json({ message: "Error analyzing dream", error });
  }
};
