import { NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY
const FOOTBALL_API_KEY = process.env.FOOTBALL_DATA_API_KEY

// List of models to try in order
const MODELS = [
  "gemini-2.5-flash", // User requested
  "gemini-3-flash-preview", // User requested
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-pro"
]

async function generateGeminiResponse(prompt: string): Promise<{ text: string, model: string }> {
  if (!GEMINI_API_KEY) {
    throw new Error("GOOGLE_API_KEY is not set")
  }

  const errors = []

  for (const model of MODELS) {
    try {
      // Try v1beta first
      let response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      )

      if (!response.ok && response.status === 404) {
         // Try v1 if v1beta fails with 404
         response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
              }),
            }
          )
      }

      if (!response.ok) {
        const errorText = await response.text()
        errors.push(`${model}: ${response.status} - ${errorText}`)
        continue
      }

      const data = await response.json()
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
         errors.push(`${model}: Invalid response format`)
         continue
      }
      return {
        text: data.candidates[0].content.parts[0].text,
        model: model
      }
    } catch (error: any) {
      errors.push(`${model}: ${error.message}`)
    }
  }

  console.error("All Gemini models failed:", errors)
  throw new Error("Service temporarily unavailable. Please try again later.")
}

async function fetchFootballData(endpoint: string) {
  if (!FOOTBALL_API_KEY) {
    throw new Error("FOOTBALL_DATA_API_KEY is not set")
  }

  // Ensure endpoint starts with /
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`

  const response = await fetch(`https://api.football-data.org/v4${cleanEndpoint}`, {
    headers: {
      "X-Auth-Token": FOOTBALL_API_KEY,
    },
  })

  if (!response.ok) {
    console.error(`Football API Error: ${response.status} ${response.statusText}`)
    return null
  }

  return response.json()
}

export async function POST(req: Request) {
  if (!GEMINI_API_KEY || !FOOTBALL_API_KEY) {
    console.error("Missing API Keys")
    return NextResponse.json(
      { response: "Service configuration error. Please contact the administrator." },
      { status: 500 }
    )
  }

  try {
    const body = await req.json()
    const { message, history, useWebSearch } = body

    if (!message) {
        return NextResponse.json(
            { response: "Please provide a message." },
            { status: 400 }
        )
    }

    // Format history for context
    const historyContext = history 
      ? history.map((msg: any) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n')
      : ""

    // Step 1: Determine Intent and API Endpoint
    const intentPrompt = `
      You are a football assistant powered by the football-data.org API.
      Your goal is to translate the user's natural language query into a specific API endpoint path.

      Conversation History:
      ${historyContext}

      Available Competitions (Codes):
      - Premier League: PL
      - La Liga: PD
      - Serie A: SA
      - Bundesliga: BL1
      - Ligue 1: FL1
      - Champions League: CL
      - European Championship: EC
      - World Cup: WC

      API Endpoint Patterns:
      1. Standings: /competitions/{CODE}/standings
      2. Upcoming Matches for a League: /competitions/{CODE}/matches?status=SCHEDULED
      3. Recent Matches for a League: /competitions/{CODE}/matches?status=FINISHED
      4. Top Scorers: /competitions/{CODE}/scorers
      
      Instructions:
      - Analyze the user's latest query: "${message}"
      - Consider the conversation history for context.
      - If the user is asking for football data, output ONLY the relative API endpoint path.
      - If the user is asking for a specific team's matches, try to map it to the league they play in and fetch the league matches.
      - If the user is just saying hello or asking a general question not related to fetching data, output "NO_API".
      - Do not output any other text, just the endpoint or "NO_API".
    `

    const intentResult = await generateGeminiResponse(intentPrompt)
    const endpoint = intentResult.text.trim()
    
    let contextData = "No external data fetched."
    let apiSuccess = false

    if (endpoint !== "NO_API") {
      // Basic validation to prevent arbitrary URL fetching
      if (endpoint.startsWith("/competitions/") || endpoint.startsWith("/matches")) {
        const data = await fetchFootballData(endpoint)
        if (data) {
          // Limit the data size to avoid token limits
          if (data.matches && Array.isArray(data.matches)) {
             // Take a subset of matches
             data.matches = data.matches.slice(0, 20)
          }
          contextData = JSON.stringify(data)
          apiSuccess = true
        } else {
          contextData = "Error: Could not fetch data from the API. The endpoint might be invalid or the resource unavailable."
        }
      } else {
         contextData = "Error: Invalid API endpoint generated."
      }
    }

    // Step 2: Generate Final Response
    let finalPrompt = ""
    
    if (useWebSearch) {
        // Web Search Enabled: Allow internal knowledge even if API succeeded
        finalPrompt = `
          You are a helpful football assistant.
          
          Conversation History:
          ${historyContext}
          
          User Query: "${message}"
          
          Context Data (from football-data.org):
          ${contextData}
          
          Instructions:
          - The user has enabled "Web Search" (which means you can use your internal knowledge base).
          - First, check if the provided Context Data contains the answer.
          - If the Context Data is sufficient, answer using it.
          - If the Context Data is insufficient, irrelevant, or missing (or if API failed), use your internal knowledge to answer.
          - If you use your internal knowledge, start your response with: "I couldn't find this in the official football database, so I'm searching the web for you..." (unless it's a general greeting).
          - Be helpful and provide accurate information.
        `
    } else {
        // Web Search Disabled: Strict API usage
        if (apiSuccess) {
            finalPrompt = `
              You are a helpful football assistant.
              
              Conversation History:
              ${historyContext}
              
              User Query: "${message}"
              
              Context Data (from football-data.org):
              ${contextData}
              
              Instructions:
              - Answer the user's query using ONLY the provided Context Data.
              - Do NOT use your internal knowledge base to answer facts about current matches or standings.
              - If the Context Data does not contain the answer, politely explain that you can only provide data available in the official API (European leagues, standings, matches).
              - Format the response nicely.
            `
        } else {
            // API Failed or NO_API
            if (endpoint === "NO_API") {
                 finalPrompt = `
                  You are a helpful football assistant.
                  
                  Conversation History:
                  ${historyContext}
                  
                  User Query: "${message}"
                  
                  Instructions:
                  - The user has NOT enabled web search.
                  - Respond politely.
                  - Explain that your Knowledge Base is currently limited to European football (Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League).
                  - Suggest they enable "Web Search" on the top right if they want you to answer broader questions.
                `
            } else {
                 // API Failed
                 finalPrompt = `
                  You are a helpful football assistant.
                  
                  Conversation History:
                  ${historyContext}
                  
                  User Query: "${message}"
                  
                  Instructions:
                  - The official API failed to return data.
                  - The user has NOT enabled web search.
                  - Apologize and explain that your Knowledge Base is currently limited to European football and the API might not have the requested data.
                  - Explicitly suggest: "My current Knowledge Base is limited to European football. However, if you want me to search the web for this answer, please switch on the Web Search toggle on the upper right."
                `
            }
        }
    }

    const finalResponse = await generateGeminiResponse(finalPrompt)

    return NextResponse.json({ 
      response: finalResponse.text,
      model: finalResponse.model
    })
  } catch (error: any) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      { response: "I'm sorry, I'm having trouble connecting right now. Please try again later." },
      { status: 500 }
    )
  }
}
