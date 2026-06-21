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
    model: "gemini-1.5-flash",
    systemInstruction: "Your name is Kobby. You are a helpful, friendly AI assistant built by a brilliant developer. Keep your tone casual, smart, and engaging."
});

// The Chat API Endpoint
app.post('/api/chat', async (req, res) => {
  try {

    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Please Enter a Message" });
    }

    // Use the simpler string form so the SDK formats the content correctly
    // (passing a `contents` array with raw strings bypasses internal formatting
    // and causes the API to reject the request)
    console.log('Sending generateContent call for model:', model?.model, 'message:', message);

    const result = await model.generateContent(message);
    console.log('Gemini raw response candidates:', result?.candidates);

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