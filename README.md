# Learning Guru

This project is a React application built using Vite. It includes essential tools like Redux Toolkit, React Router, Firebase Realtime Database and more for a modern development environment.

**Live site: https://learning-guru.web.app/**
**Github repo: https://github.com/nusrat-git/learning_guru**

## Getting Started

To run this project locally, you'll need to have Node.js installed on your machine. If you don't have it installed, you can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/learning-guru.git
   cd learning-guru
   npm i
   npm run dev
   ```

#### Firebase Realtime Database Setup

This project uses Firebase Realtime Database to manage and store data. Follow these steps to set up Firebase Realtime Database:

#### 1. Create a Firebase Project

- Go to the [Firebase Console](https://console.firebase.google.com/).
- Click on "Add Project" and follow the instructions to create a new Firebase project.

#### 2. Enable Realtime Database

- In your Firebase project dashboard, navigate to "Build" > "Realtime Database".
- Click on "Create Database" and choose your preferred location.
- Set the database rules according to your needs. For development, you can set the rules to allow read/write access to all users:

  ```json
  {
    "rules": {
      ".read": true,
      ".write": true
    }
  }
  ```

- In the Firebase Console, go to "Project Overview" > "Add App" and select "Web".
- Register your app and copy the Firebase configuration object provided.

- Create a `.env` file in the root of your project and add your Firebase configuration:

  ````
  VITE_FIREBASE_API_KEY=your-api-key
  VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
  VITE_FIREBASE_PROJECT_ID=your-project-id
  VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
  VITE_FIREBASE_APP_ID=your-app-id
  VITE_FIREBASE_DATABASE_URL=your-database-url

  ```
  ````

##### Dependencies

**The project includes the following key dependencies:**

    ```
    React: UI library for building user interfaces.
    React DOM: The entry point for working with the DOM in React.
    React Router DOM: Routing library for React applications.
    Redux Toolkit: Official, opinionated, and powerful toolset for Redux.
    Firebase: Backend platform for building web and mobile applications.
    React Hook Form: Performant, flexible, and extensible forms with easy-to-use validation.
    Tailwind CSS: Utility-first CSS framework for rapidly building custom designs.
    React Hot Toast: Toast notifications for React.
    React Icons: Popular icons as React components.
    ```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

This `README.md` provides instructions on how to install, run, and develop your React project using Vite. It also includes a brief overview of the project structure and dependencies.
