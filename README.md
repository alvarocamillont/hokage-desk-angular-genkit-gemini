# Hokage Desk

Hokage Desk is an Angular application that uses Genkit to provide AI-powered features. This project serves as a demonstration of how to integrate Angular with Genkit to create a smart and interactive user experience.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:

*   [Node.js](https://nodejs.org/) (v20.x or later)
*   [Angular CLI](https://angular.io/cli) (v20.3.4 or later)
*   [Genkit CLI](https://firebase.google.com/docs/genkit/get-started)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/hokage-desk-angular-genkit-gemini.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd hokage-desk-angular-genkit-gemini/hokage-desk
    ```

3.  Install the dependencies:

    ```bash
    npm install
    ```

### Environment Variables

This project requires the following environment variables to be set. You can create a `.env` file in the `hokage-desk` directory to store these variables.

*   `GEMINI_API_KEY`: Your Google AI API key.
*   `PORT`: The port to run the server on. Defaults to `4000`.

## Development Server

To start the development server, run the following command:

```bash
ng serve
```

This will start the Angular development server. Open your browser and navigate to `http://localhost:4200/` to see the application.

## Genkit Integration

This project uses Genkit to provide AI-powered features. To start the Genkit server, run the following command in a separate terminal:

```bash
genkit start
```

This will start the Genkit development UI, where you can run and inspect the flows.

## Building

To build the project, run the following command:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

To run the unit tests, run the following command:

```bash
ng test
```

## Project Structure

The project is organized as follows:

*   `hokage-desk/`: The main Angular application.
    *   `src/`: The source code of the application.
        *   `app/`: The Angular components, services, and routes.
        *   `flows.ts`: The Genkit flows.
        *   `server.ts`: The Express server that hosts the Genkit flows.
    *   `angular.json`: The Angular CLI configuration.
    *   `package.json`: The project dependencies and scripts.
    *   `GEMINI.md`: The contribution guidelines.

## Dependencies

This project uses the following key dependencies:

*   [Angular](https://angular.io/): A platform for building mobile and desktop web applications.
*   [Genkit](https://firebase.google.com/docs/genkit): An open-source framework for building AI-powered applications.
*   [Express](https://expressjs.com/): A fast, unopinionated, minimalist web framework for Node.js.
*   [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.

## Contributing

Please read the [GEMINI.md](hokage-desk/GEMINI.md) file for contribution guidelines.