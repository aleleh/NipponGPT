

let inputs = [];

// Select the input and submit button elements
const input = document.getElementById("chatbot-text-input");
const submitButton = document.getElementById("chatbot-submit-button");
const conversation = document.getElementById("chatbot-conversation");

// Add a click event listener to the submit button
submitButton.addEventListener("click", async function() {
    sendMessage();
});

// Add event listener for 'enter' key press
input.addEventListener("keyup", event => {
    if (event.keyCode === 13) {
        sendMessage();
    }
});

async function sendMessage() {
  // Create a new message element with the user's input
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("chatbot-message-container");
  const message = document.createElement("div");
  message.classList.add("chatbot-message", "user-message");
  message.textContent = input.value;
  messageContainer.appendChild(message);
  conversation.appendChild(messageContainer);
  // Store user input in array
  inputs.push(input.value);

  let response;
  // Check if the user's input includes a question about the person's height
  if (input.value.includes("height")) {
      response = `The person's height is ${personInfo.height}.`;
  }
  // Check if the user's input includes a question about the person's weight
  else if (input.value.includes("weight")) {
      response = `The person's weight is ${personInfo.weight}.`;
  } 
  // If the user's input does not include a question about the person's height or weight, send the input to the OpenAI API
  else {
      response = await getResponseFromAPI(inputs[inputs.length - 1]);
  }

  // Create a new message element with the response
  const responseContainer = document.createElement("div");
  responseContainer.classList.add("chatbot-message-container");
  const responseMessage = document.createElement("div");
  responseMessage.classList.add("chatbot-message");
  responseMessage.textContent = response;
  responseContainer.appendChild(responseMessage);
  conversation.appendChild(responseContainer);
  input.value = "";
}




// Function to send the request to the OpenAI API
async function getResponseFromAPI(input) {
  // Replace "YOUR_API_KEY" with your actual API key
  const apiKey = "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";
  try {
    const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        "prompt": input,
        "temperature": 0.1,
        "max_tokens": 400,
        "top_p": 0.75,
        "frequency_penalty": 0.5,
        "presence_penalty": 0.9
      })
    

    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    if (!json.choices || !Array.isArray(json.choices) || !json.choices[0] || !json.choices[0].text) {
      throw new Error("Unexpected response format");
      }
      return json.choices[0].text;
      } catch (err) {
      console.error(err);
      return "Sorry, I couldn't understand you. Can you try";
      }
      }
