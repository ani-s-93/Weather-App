import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY missing from backend/.env");
  process.exit(1);
}

console.log("✅ Key loaded, starting server...");

app.post("/ai", async (req, res) => {
  try {
    const { weatherData } = req.body;

    if (!weatherData) {
      return res.status(400).json({ result: "No weather data sent" });
    }

    const prompt = `
Weather: ${weatherData.temperature}°C, Humidity: ${weatherData.humidity}%, Wind: ${weatherData.windSpeed} km/h.

Give weather advice in this EXACT format with NO markdown, no asterisks, no bold syntax:

👗 WHAT TO WEAR
[one sentence]

⏰ BEST TIME OUTSIDE
[one sentence]

💊 HEALTH TIPS
[one sentence]

⚠️ WARNINGS
[one sentence]

Keep each section to 1 sentence only. No asterisks or ** symbols.
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 600,
        }),
      }
    );

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "No response";
    res.json({ result: text });

  } catch (err) {
    console.error("❌ Server error:", err.message);
    res.status(500).json({ result: "Server error: " + err.message });
  }
});
app.post("/ask", async (req, res) => {
  try {
    const { question, weatherData } = req.body;

    if (!question || !weatherData) {
      return res.status(400).json({ result: "Missing question or weather data" });
    }

    const prompt = `
Current weather conditions:
- Temperature: ${weatherData.temperature}°C
- Humidity: ${weatherData.humidity}%
- Wind Speed: ${weatherData.windSpeed} km/h
- Location: ${weatherData.location}

The user is asking: "${question}"

Answer their question directly based on these weather conditions.
Be friendly, concise (2-3 sentences max), and practical.
No asterisks or markdown formatting.
    `;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 200,
        }),
      }
    );

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "No response";
    res.json({ result: text });

  } catch (err) {
    console.error("❌ Ask error:", err.message);
    res.status(500).json({ result: "Error: " + err.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
