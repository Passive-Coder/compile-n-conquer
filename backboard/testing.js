// Install: npm install backboard-sdk
import { BackboardClient } from 'backboard-sdk';

async function main() {
  // Initialize the Backboard client
  const client = new BackboardClient({
    apiKey: 'YOUR_API_KEY'
  });

  // Create an assistant
  const assistant = await client.createAssistant({
    name: 'My First Assistant',
    system_prompt: 'A helpful assistant'
  });

  // Create a thread
  const thread = await client.createThread(assistant.assistantId);

  // Send a message and get the complete response
  const response = await client.addMessage(thread.threadId, {
    content: 'Hello! Tell me a fun fact about space.',
    llm_provider: 'openai',
    model_name: 'gpt-4o',
    stream: false
  });

  // Print the AI's response
  console.log(response.content);
}

main().catch(console.error);