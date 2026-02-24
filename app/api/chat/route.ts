// app/api/chat/route.ts
import { google } from '@ai-sdk/google';
import { streamText, tool, convertToCoreMessages } from 'ai';
import { tavily } from '@tavily/core';
import { z } from 'zod';

// Initialize Tavily with your existing package
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const result = streamText({
      model: google('gemini-2.0-flash'),
      system: `You are an Agentic Soccer Bot.

                RESPONSE STYLE RULES:
                - Never provide one-sentence answers.
                - For every query, provide a detailed breakdown (at least 2-3 paragraphs).
                - Include tactical context, historical significance, or player form analysis where relevant.
                - Use Markdown headers (###) and bullet points to organize statistics clearly.
                - If you find data via 'getFootballStats', don't just list numbers; explain what they mean for the season.
                - ALWAYS use Markdown Tables for statistics like league standings, top scorers, or match results.
                - For Top Scorers, include columns for: Rank, Player, Team, Goals (Penalties), Assists, and Matches Played.
                - Use bold text for headers and clear alignment.
                - If the data is too large, show the top 10 rows.
                
                CONTEXT & MEMORY RULES:
                - If the user asks a follow-up (e.g., "What about injuries?"), look at history to identify the league/team.
                - Never ask "Which league?" if it was mentioned in the last 3 messages. Infer it automatically.
                - Default to Premier League (PL) if no context exists.
                
                TOOL PRIORITY RULES:
                1. PRIMARY: Use 'getFootballStats' for all standings, fixtures, and official scores.
                2. FALLBACK: Use 'webSearch' for rumors, injury news, or specific tactical deep-dives not in the API.
                3. AUTONOMY: Never ask for league codes. Map "La Liga" to PD, "EPL" to PL, etc., internally.
                
                TOOL EXECUTION RULES:
                - NEVER write out the code for a tool call (e.g., "print(tool())").
                - If you need data, call the tool silently using the provided tool mechanism.
                - Do not explain that you are calling a tool; just provide the results once the tool returns data.
                - If a tool fails, explain the error or use 'webSearch' as a fallback`,
      messages: convertToCoreMessages(messages),
      maxSteps: 5,
      tools: {
        webSearch: tool({
          description: 'Search the live web for football news and rumors.',
          parameters: z.object({
            query: z.string().describe('The search query for the live web')
          }),
          execute: async ({ query }) => {
            console.log("🌐 Searching Tavily:", query);
            const response = await tvly.search(query, {
              searchDepth: "basic",
              maxResults: 5
            });
            // Tavily returns an object with a 'results' array
            return response.results;
          },
        }),
        
        getFootballStats: tool({
          description: `Access all data from football-data.org.
            You can fetch:
            - /competitions/[CODE]/standings (League tables)
            - /competitions/[CODE]/matches (Fixtures and results)
            - /competitions/[CODE]/teams (List of clubs)
            - /competitions/[CODE]/scorers (Top goalscorers)
            - /teams/[ID]/matches (Specific team schedule)
            Example codes: PL, PD, BL1, SA, FL1.`,
          parameters: z.object({
            endpoint: z.string().describe('The relative API path starting with a slash, e.g., /competitions/PL/scorers')
          }),
          execute: async ({ endpoint }) => {
            const cleanPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
            const url = `https://api.football-data.org/v4${cleanPath}`;
            
            console.log("📡 Calling Football API:", url);
            
            const res = await fetch(url, {
              headers: {
                'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY || '',
                'Accept': 'application/json'
              }
            });
            
            if (!res.ok) {
              const errorText = await res.text();
              console.error(`❌ API Error ${res.status}:`, errorText.slice(0, 100));
              return { error: `API error ${res.status}. Use webSearch instead.` };
            }
            
            return await res.json();
          },
        }),
      },
      onError: ({ error }) => {
        console.error("🔥 Stream Error:", error);
      }
    });
    
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("🚨 Route Crash:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}