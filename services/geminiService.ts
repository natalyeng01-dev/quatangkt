
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const findGifts = async (request: string, products: Product[]): Promise<number[]> => {
  const simplifiedProducts = products.map(({ id, name, description, category }) => ({
    id,
    name,
    description,
    category
  }));

  const prompt = `You are an expert gift recommender for an online gift shop. A user is looking for a gift with the following request: "${request}". 
  
  Based on this request, analyze the following list of available products and select the 3 most suitable gifts.
  
  Available products:
  ${JSON.stringify(simplifiedProducts, null, 2)}
  
  Respond with a JSON object that contains a single key "recommended_ids" which is an array of the product IDs for your top 3 recommendations. For example: {"recommended_ids": [1, 5, 12]}. Do not provide any other text or explanation.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommended_ids: {
              type: Type.ARRAY,
              items: { type: Type.NUMBER },
            },
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    if (result && Array.isArray(result.recommended_ids)) {
      return result.recommended_ids;
    } else {
      console.error("Unexpected JSON structure from Gemini:", result);
      return [];
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get recommendations from AI. The model may be busy. Please try again later.");
  }
};
