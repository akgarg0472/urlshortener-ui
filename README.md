# 🖥️ URL Shortener UI

![React Version](https://img.shields.io/badge/React-18-blue)
![version](https://img.shields.io/badge/version-1.10.0-blue)

This repository contains the front-end UI code for **URL Shortener** project, built with **React**, **TypeScript**, and **CSS**. The front-end communicates with a back-end API to shorten and manage URLs.

### 📦 Tech Stack:

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript, providing static types for better development experience.
- **CSS**: Styling for the application UI.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (Recommended version: 18.x)
- [npm](https://www.npmjs.com/) (Node Package Manager) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

### 🛠️ Development Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/akgarg0472/urlshortener-ui.git
   cd urlshortener-ui
   ```

2. **Install dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Start the development server**:

   Using npm:

   ```bash
   npm start
   ```

   Or using yarn:

   ```bash
   yarn start
   ```

   This will start the application on http://localhost:3000.

4. Access the app in your browser at `http://localhost:3000`.

## 🌱 Environment Variables

The following environment variables are used in this project to configure various aspects of the app:

- **`REACT_APP_PREFIX_URL_FOR_SHORT_URL`**:
  The base URL for the shortened URLs.
  Example: `localhost:8765`

- **`REACT_APP_BACKEND_BASE_URL`**:
  The base URL of the back-end API that the front-end communicates with.
  Example: `http://127.0.0.1:8765`

- **`REACT_APP_DEFAULT_PROFILE_PICTURE`**:
  The default profile picture URL used in the app when a user doesn't upload a custom image.
  Example: `https://res.cloudinary.com/dmdbqq7fp/profile-pictures/default.png`

Make sure to configure these variables in your `.env` file to ensure proper functionality of the application.

## 🛠️ Docker Setup (Optional)

For containerized deployment, this project comes with a Docker setup. The `Dockerfile` is already configured to build and run the application.

The `Dockerfile` defines the build and runtime configuration for the container. You can build and run the React app in a Docker container using the following steps.

1. **Build the Docker image**:

   In the root of the project directory, run the following command:

   ```bash
   docker build -t akgarg0472/urlshortener-ui:1.0.0 .
   ```

2. **Run the Docker container**:

   Once the image is built, you can run the container, mapping the app to port `3000` on your host:

   ```bash
   docker run -p 3000:80 akgarg0472/urlshortener-ui:1.0.0
   ```

   The React app will now be served through **Nginx** on port `3000` of your local machine.

3. **Access the app**:

   Open a browser and navigate to `http://localhost:3000` to see the app running.

## 🔧 Development Tools

This project uses the following tools and dependencies for development:

- **Node.js**: JavaScript runtime used for running the development server and building the app.
- **npm** or **yarn**: Package managers used to manage dependencies and run scripts.
- **React**: Front-end JavaScript library for building the user interface.
- **TypeScript**: Superset of JavaScript that adds static types for better development experience.
- **Docker**: Containerization platform for running the app in isolated environments.
- **Nginx**: Web server used to serve the production build of the React app in the Docker container.
- **VS Code** or other IDEs: Popular text editors for writing and editing code with extensions for React and TypeScript.

### Back-end

The UI communicates with a back-end service to shorten URLs and display results. The back-end API should be configured to handle requests for shortening and managing URLs.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### How to contribute:

- Fork the repository
- Create a new branch (`git checkout -b feature/your-feature-name`)
- Commit your changes (`git commit -am 'Add new feature'`)
- Push to the branch (`git push origin feature/your-feature-name`)
- Open a pull request

## 🔗 References

Here are some useful resources for understanding and working with the technologies used in this project:

- **React**: [https://reactjs.org/](https://reactjs.org/) - The JavaScript library used for building the user interface.
- **TypeScript**: [https://www.typescriptlang.org/](https://www.typescriptlang.org/) - The superset of JavaScript that adds static typing to your code.
- **Docker**: [https://www.docker.com/](https://www.docker.com/) - Platform for developing, shipping, and running applications inside containers.
- **Nginx**: [https://www.nginx.com/](https://www.nginx.com/) - Web server used to serve static files in this project.
- **Node.js**: [https://nodejs.org/en/](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine, used for the app's development environment.
- **Create React App**: [https://reactjs.org/docs/create-a-new-react-app.html](https://reactjs.org/docs/create-a-new-react-app.html) - The tool used for bootstrapping the React application.
