# WebSocket Chat Application

This project is a simple WebSocket-based chat application built with React. It allows users to join a chat by setting a username, send messages, and view messages in real-time from other users. Each user is assigned a unique color to differentiate their messages in the chat.

## Features

- Real-time messaging via WebSocket

- Username-based user identification

- Random color assignment to differentiate users

- Auto-scroll chat window for the latest messages

## Getting Started

### Prerequisites

- Node.js and npm installed

- A WebSocket server running at ws://localhost:9080/ws-blog/chat

### Installation

1. Clone the repository:

    ```
    git clone git@github.com:sweettypdevassy/ws-blog-frontend.git
    cd ws-blog-frontend
    ```

2. Install dependencies:
    ```
    npm install
    ``` 
3. Run the application:
    ```
    npm start
    ```

    Open http://localhost:3000 in two browser to view the application.

### Usage

1. Enter a unique username to join the chat.

2. Type a message in the input field and press "Send" or hit "Enter" to send it.

3. Messages will appear in the chat box with a unique color for each user.

### Code Structure

- Chat.js: The main component for the chat application.

- WebSocket Setup: Establishes a WebSocket connection to listen for incoming messages and sends outgoing messages.

    - Username & Color Assignment: Sets the username and assigns a unique color based on the username.

    - Message Rendering: Displays messages in a chat box with color-coding.

    - Chat.css: Styles the chat components, including the chat box, message alignment, color-coding, and layout.

### Customization

You can customize the chat application by:

- Modifying the list of colors in the colors array for different user colors.

- Adjusting CSS styles in Chat.css for layout, colors, and message display.