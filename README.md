# Chat Application

This is a chat application built with React, TypeScript, tRPC and Websockets.
Its a monorepo built with Turborepo.
Styled with TailwindCSS and Shadcn/UI components.

Main features:

- Nickname
- Input commands:
  - /nick <nickname> - changes browser tab title
  - /oops - deletes your last message
  - /think - makes you appear as if you are thinking
  - /light - toggles light theme
  - /dark - toggles dark theme
- Message deleting

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or later)
- npm (usually comes with Node.js)

## Getting Started

Follow these steps to run the application locally:

1. Clone the repository:

   ```
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   turbo run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port specified in the console output).

## Environment Variables

If your application requires any environment variables, create a `.env` file in the root directory and add them there. For example:
