import { askGeminiWithMessages } from './llmService.js';
import { getUserInput } from './cli-io.js';


const messages = [
    {
        role: 'user',
        parts: [{ text: 'Always respond in valid JSON format like: { "text": "your response here"}' }]
    },
    {
        role: 'model',
        parts: [{ text: '{ "text": "Understood, I will always respond in JSON format."}' }]
    }
];

async function main() {
    while(true){
        const userInput = await getUserInput('you:');

       messages.push({
            role: 'user',
            parts: [{ text: userInput }]
        });
        const response = await askGeminiWithMessages(messages);
        console.log('Gemini:', response.text);

        messages.push({
            role: 'model',
            parts: [{ text: JSON.stringify(response) }]
        });

    }

}

main();
