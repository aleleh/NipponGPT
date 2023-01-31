function typeGreeting() {
    const greeting = document.createElement("div");
    greeting.id = "greeting";
    greeting.className = "chatbot-message";

    const textNode = document.createTextNode("");
    greeting.appendChild(textNode);

    const chatbotConversation = document.getElementById("chatbot-conversation");
    chatbotConversation.appendChild(greeting);

    let i = 0;
    let message = "Hello, I am NipponGPT. What can I help you with?";
    const typeInterval = setInterval(() => {
        textNode.textContent += message[i];
        i++;
        if (i >= message.length) {
            clearInterval(typeInterval);
        }
    }, 50);
}
window.onload = typeGreeting;
