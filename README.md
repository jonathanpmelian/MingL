# MingL

Welcome to MingL, a platform for creating and joining events where people with similar interests can connect.

This README provides an overview of the project, setup instructions, and additional resources for contributing.

## Overview

MingL allows users to create online or offline events, explore events by category, and join them to meet others who share their interests.

The project aims to rival platforms like Meetup or Preply by providing a fresh, user-centric experience.

### Technologies

- Language: TypeScript + NodeJS
- Main libraries and frameworks: React v18, NextJS v14, Express
- Database: PostgreSQL and Prisma
- DevOps: Docker
- Testing: Jest, supertest, React Testing Library, Cypress

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed.
- **Docker** and **Docker Compose** (for database setup).

### Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/jonathanpmelian/MingL
   cd MingL
   ```

2. **Install dependencies** for both the frontend and backend (through turbo):

   ```bash
   npm install
   ```

### Run the application

- **_Option 1: Run with Docker (Frontend, Backend, Database, PGAdmin)_**

  ```bash
  npm run docker:dev
  ```

- **_Option 2: Run locally (Frontend and Backend only)_**

  ```bash
  npm run dev
  ```

### Directory Structure

- `apps/`
  - `web/`: Contains the Next.js frontend.
  - `api/`: Contains the Express backend.
- `docs/`
  - `Authentication.md`: Detailed information about the authentication functionality.
- `packages/`
  - Common configurations and shared components.

## Authentication

- **Authentication Overview**: For detailed information on how registration and login functionalities work, refer to [Authentication Documentation](docs/Authentication.md).

## Testing

The project includes various levels of tests to ensure functionality:

- **Unit Tests**: Validate individual components using Jest.
- **Integration Tests**: Validate interactions between components.
- **End-to-End Tests**: Verify the full user flow using Cypress.

## Running Tests

- **Unit and Integration Tests** (run both in parallel through turbo):

  ```bash
  npm run test
  ```

- **End-to-End Tests**:

  ```bash
  npm run cy:open
  ```

- **Run the tests environment** (Frontend, Backend, Database):

  The tests environment does not have data persistency. The information will be removed once the environment is closed down.

  ```bash
  npm run docker:test
  ```

## Contributing

Contributions are welcome! Please see our [Contributing.md](/docs/Contributing.md) for guidelines on how to contribute.

## Roadmap

- **Event creation and exploration**.
- **Event participation**.

Feel free to reach out if you have any questions or suggestions for improvement.
