# Todo-List App - Client

This is the frontend application for the Todo-List App built with **Next.js**. It integrates with the backend to provide task management functionality.

## Features

*   Create, edit, delete, and view tasks
*   Responsive and accessible UI using Tailwind CSS and shadcn components
*   Integration with the backend server for seamless task management

## Prerequisites

*   Node.js (v16 or above)
*   npm or yarn package manager

## Setup Instructions

### 1\. Clone the Repository

```

git clone https://github.com/JagroopBagri/todo-list-client.git
cd <client-directory>
  
```

### 2\. Install Dependencies

```

npm install
# or
yarn install
  
```

### 3\. Configure Environment Variables

Create a `.env.local` file in the root directory with the following content:

```

NEXT_PUBLIC_API_URL=http://localhost:3001
  
```

### 4\. Start the Development Server

```

npm run dev
# or
yarn dev
  
```

The client will run on `http://localhost:3000`.

## Scripts

*   `npm run dev`: Start the development server
*   `npm run build`: Build the app for production
*   `npm start`: Start the production server

## Development Notes

Ensure the backend server is running on `http://localhost:3001` before starting the client. All API calls depend on the server being accessible.

## Available Pages

| Page | Description |
| --- | --- |
| `/` | Home page to view tasks |
| `/create` | Page to add a new task |
| `/edit/:id` | Page to edit a specific task |

## Styling

The app uses **Tailwind CSS** and **shadcn components** for a modern and accessible UI.
