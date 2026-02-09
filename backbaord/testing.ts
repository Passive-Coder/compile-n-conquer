// Install: npm install backboard-sdk
import { BackboardClient } from 'backboard-sdk';

async function main() {
  const apiKey = process.env.BACKBOARD_API_KEY;
  if (!apiKey) throw new Error('Missing BACKBOARD_API_KEY');

  // Initialize the Backboard client (types are bundled with the package)
  const client = new BackboardClient({ apiKey });

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
    llm_provider: 'google',
    model_name: 'gemini-2.5-flash',
    stream: false
  });

  if ('content' in response) {
    console.log(response.content);
  } else {
    let fullContent = '';
    for await (const chunk of response) {
      fullContent += chunk;
    }
    console.log(fullContent);
  }
}

main().catch(console.error);