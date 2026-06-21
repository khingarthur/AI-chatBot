import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables from the .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 

// Initialize the Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
    model: "gemini-3.1-flash-lite",
    systemInstruction: "Your name is Kobby. You are a helpful, friendly AI assistant. Keep your tone casual, smart, and engaging."
});

// The Chat API Endpoint
app.post('/api/chat', async (req, res) => {
  try {

    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Please Enter a Message" });
    }

    const result = await model.generateContent(message);
    const responseText = result.response.text();

    // Send back a response
    res.json({ text: responseText });

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});