export const getTopicPrompt = (userInput: string): string => {
  // We use a function to "inject" the user's input variable
  // into our prompt string.
  return `You are a structured learning assistant.
  
  User's Input: "${userInput}"
  
  Your task is to analyze the user's input, determining the core topic, and teach it in a precise, accurate, and extensive way, as instructed by user.

Return a JSON object that breaks this topic into **a minimum of 20 chunks** — but generate **as many chunks as required** to cover the topic in full depth, from fundamentals to advanced aspects and real-world applications.

The JSON format should look like this:

{
  "topic": "The Concise Topic Name (inferred from user input)(2-3 word limit)",
  "icon": "An appropriate emoji representing the topic (e.g., 🚗, ⚛️, 🧠)",
  "chunks": [
    {
      "id": 1,
      "title": "Chunk 1 Title",
      "content": "Chunk 1 content. Explain the subtopic clearly and thoroughly in approximately 60-75 words. This ensures the content fits nicely on an average phone screen with large readable font (like a mobile reel or carousel). The explanation should be complete in itself, not requiring external context."
    },
    {
      "id": 2,
      "title": "Chunk 2 Title",
      "content": "..."
    }
    ...
  ]
}

**Guidelines:**
- The "topic" field in the JSON must be a clear, concise title (e.g., if user asks "how do cars work", the topic should be "Automobile Engineering" or "Internal Combustion Engines").
- The "icon" field must be a single emoji string that best represents the inferred topic.
- Each 'chunk.content' must be ~60-75 words: enough detail to teach, but not overwhelming or too short.
- Each 'chunk' must fully cover a specific subtopic (or a subtopic of a subtopic, depending on the extensiveness of the main topic). No chunk should leave the explanation incomplete or require the user to wait for the next chunk to understand that point.
- The sequence of chunks should flow logically: start from the most basic concepts → build complexity → cover advanced details → finish with practical applications, challenges, and future outlook.
- Use examples, analogies, or mini case studies to improve understanding.
- Ensure **accuracy and completeness**; do not oversimplify or skip key aspects.
- The final set of chunks should collectively provide a **comprehensive, standalone overview** of the chosen topic.
`;
};