# Contributing to MingL

Thank you for considering contributing to MingL! Your help is highly appreciated, whether you are fixing a bug, suggesting new features, or improving documentation.

## How to Contribute

### Fork the Repository

Fork the repository on GitHub to your own account.
Clone your fork to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/mingl.git
```

### Set Up the Environment

Install dependencies:

```bash
npm install
```

Make sure that both the backend and frontend are set up and running.

Refer to the [README.md](/README.md) and [docs/Authentication.md](/docs/Authentication.md) for detailed setup instructions.

### Create a Branch

Always work on a new branch:

```bash
git checkout -b feature/your-feature-name
```

Use a descriptive branch name.

For instance, **_feature/add-event-page_** or **_bugfix/fix-login-issue._**

### Make Your Changes

Write clear, concise code.

Follow the project's coding standards (refer to eslint-config and tsconfig for reference).

Ensure your changes do not break the build by running the tests:

```bash
npm run test
npm run cy:open
```

### Commit Your Changes

Use Conventional Commits:

feat(auth): add login page
fix(auth): resolve CORS issue

Make your commit messages clear and descriptive.

### Push to Your Fork

Push your changes to your fork on GitHub:

```bash
git push origin feature/your-feature-name
```

### Submit a Pull Request

Go to the original repository in GitHub.

Click on New Pull Request and follow the instructions.

Provide a detailed description of what changes you made and why they are needed.

Make sure your pull request passes all CI checks before requesting a review.

### Respond to Feedback

Your pull request may receive comments or feedback.

Be open to suggestions and be ready to make changes to ensure your code meets the project standards.

### Coding Standards

Use TypeScript for both the backend and frontend.

Make sure your code passes ESLint and Prettier checks.

Keep components modular and reusable.

### Running Tests

Run unit tests with:

```bash
npm run test
```

Run end-to-end tests with Cypress:

```bash
npm run cy:open
```

Ensure all tests pass before submitting your pull request.

### Reporting Issues

If you find a bug or have an idea for an enhancement:

Search the issues page to see if it's already reported.

If not, create a new issue, providing as much detail as possible.

### Style Guide

Write descriptive comments where needed.

Keep functions small and focused.

Follow the DRY (Don't Repeat Yourself) principle.

## Thank You!

Thank you for your interest in contributing! We are thrilled to have you help us make MingL even better.
