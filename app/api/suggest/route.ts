import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  const { lastMessage } = await req.json();
  
  const { text } = await generateText({
    model: google('gemini-2.0-flash'), // Flash is fast and cheap for this
    prompt: `Based on this assistant response: "${lastMessage}",
          suggest one specific, natural follow-up question a fan would ask.
          Include the name of the league or team mentioned so the context is clear.
          Example: "What are the upcoming matches for Arsenal?"
          Constraint: 5-8 words, no quotes, no conversational filler.`,
  });
  
  return Response.json({ suggestion: text });
}