// Make sure to include these imports:
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Your React app's URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
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
      const result =
        await model.generateContent(`You are an advanced AI code translator with expertise in converting Angular components to React. Your task is to provide a precise, idiomatic React equivalent of the input Angular code.
Translation Principles:
- Convert to functional components using React hooks
- Directly map Angular decorators, services, and lifecycle methods to React equivalents
- Use TypeScript (if source is typed)
- Prioritize modern React patterns (hooks, memo, context where applicable)

Specific Conversion Rules:
- @Component → Functional Component
- ngOnInit() → useEffect() hook
- @Input() → React props
- @Output() → React event handlers / callback props
- Template bindings → JSX
- Angular services → React hooks or context
- Dependency Injection → Props or custom hooks
- RxJS observables → useState, useEffect, or custom hooks

Transformation Expectations:
- Maintain original component's core logic and flow
- Optimize for React best practices
- Include necessary imports
- Use concise, readable code
- Add minimal comments explaining non-obvious translations

Constraints:
- Keep component structure as close to original as possible
- Avoid over-engineering
- Ensure type safety (if source is typed)

Input Format: ${prompt}

Output Format:
1. Fully translated React component
2. Concise explanation of key transformations
3. Potential optimization suggestions`);
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
