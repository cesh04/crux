export const getTopicPrompt = (topic: string): string => {
  // We use a function to "inject" the topic variable
  // into our prompt string.
  return `You are a structured learning assistant. Your task is to teach the topic ${topic} in a precise, accurate, and extensive way. 

Return a JSON object that breaks this topic into **a minimum of 20 chunks** — but generate **as many chunks as required** to cover the topic in full depth, from fundamentals to advanced aspects and real-world applications.

The JSON format should look like this:

{
  "topic": "${topic}",
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
- Each 'chunk.content' must be ~60-75 words: enough detail to teach, but not overwhelming or too short.
- Each 'chunk' must fully cover a specific subtopic (or a subtopic of a subtopic, depending on the extensiveness of the main topic). No chunk should leave the explanation incomplete or require the user to wait for the next chunk to understand that point.
- The sequence of chunks should flow logically: start from the most basic concepts → build complexity → cover advanced details → finish with practical applications, challenges, and future outlook.
- Use examples, analogies, or mini case studies to improve understanding.
- Ensure **accuracy and completeness**; do not oversimplify or skip key aspects.
- The final set of chunks should collectively provide a **comprehensive, standalone overview** of the chosen topic.
`;
};