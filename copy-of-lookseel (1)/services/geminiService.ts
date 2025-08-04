
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Note: API key is sourced from environment variables, which is a security best practice.
// Ensure the API_KEY environment variable is set in your deployment environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateContentIdea = async (prompt: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a creative assistant for content creators on a platform like OnlyFans. Generate 3 short, catchy, and engaging content ideas or photo captions based on the following theme: "${prompt}". Keep it creative and safe for work.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content idea:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
       return "The provided API key is not valid. Please check your environment configuration.";
    }
    return "Could not generate an idea at the moment. Please try again later.";
  }
};
