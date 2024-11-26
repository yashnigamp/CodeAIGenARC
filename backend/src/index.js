// Make sure to include these imports:
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const axios = require("axios");
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Your React app's URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.post("/api/query", async (req, res) => {
  try {
    const run = async () => {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyCCfL5DI_1TnatUR9w1YQYvIN14yAQ0qK8"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      //   const prompt = "can you convert code from angular to react";
      const { prompt } = req.body;
      console.log(req.body);
      const result = await model.generateContent(`You are an expert code translator specializing in converting Angular components to React. Follow these core principles:
- Preserve the original component's core logic and structure
- Use functional components with React hooks
- Convert Angular template syntax to JSX
- Simplify and modernize where possible
- Use TypeScript if the original code uses TypeScript
- Minimize commentary unless code requires explanation

Input: [${prompt}]

Desired Output:
1. Full React equivalent component
2. Brief explanation of key transformations (if significant)
3. Highlight any potential areas that might need manual review`);
      console.log(result.response.text());
      res.json({ message: result.response.text() });
    };
    run();
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    res.status(500).json({
      error: "Failed to fetch response from OpenAI",
      details: error.message,
    });
  }
});
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
