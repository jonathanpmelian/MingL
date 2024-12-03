# Authentication - "MingL"

This document describes the authentication functionality for MingL, which includes the registration and login pages. This feature allows users to create an account and log in to the platform to participate in events.

## Description of the Functionality

The authentication feature consists of two main parts:

1. **Registration**: Allows users to sign up by providing their name, email, and a secure password.
2. **Login**: Allows registered users to authenticate and access their account.

The authentication flow is implemented using a backend that issues JWT (JSON Web Tokens) and handles CORS to support cross-origin requests from the frontend.

## Requirements

- **Backend Running**: The API should be running at `http://localhost:5000`.
- **Database**: PostgreSQL must be running with the `User` tables created via Prisma migrations.
- **CORS Configuration**: Ensure that CORS is set up on the backend to allow requests from `http://localhost:3000`.

## Implementation

### 1. Registration

The registration page (`/register`) allows users to provide their information to create an account. Upon submitting the form, a POST request is made to the `/auth/register` endpoint of the backend, where the password is securely stored and a new user record is created.

**Relevant Code**:

- `pages/register.tsx` in the frontend.
- `routes/auth.ts` in the backend for registration logic.

### 2. Login

The login page (`/login`) asks for the user's email and password. Upon successful authentication, a JWT token is stored in the client-side browser, which is used for future authenticated requests.

**Relevant Code**:

- `pages/login.tsx` in the frontend.
- `routes/auth.ts` in the backend for login logic.

## Testing

Different levels of testing have been performed to ensure the quality of the authentication feature.

### 1. Unit Tests

Unit tests were conducted with **Jest** to validate individual components, such as the registration and login forms. To run the unit tests:

```bash
npm run test
```

### 2. Integration Tests

Integration tests were performed to validate the interaction between the pages and the backend, using Axios mocks.

### 3. End-to-End Tests

End-to-end tests were conducted with **Cypress** to validate the complete flow of registration and login:

```bash
npm run cy:open
```

These tests verify the flow of registering a new user and subsequently logging in, from the user’s perspective.

## Common Errors and Solutions

1. **CORS Error when making requests to the backend**:

   - Ensure that the backend has the `cors` middleware configured to accept requests from the frontend (`http://localhost:3000`).

2. **Database Connection Issues**:

   - Verify that the PostgreSQL container is running and that the URL in `.env` is correct.

3. **JWT Token not saved**:
   - Make sure `localStorage` is not being blocked by the browser’s privacy policies.

## Future Improvements

- **Redirect Authenticated Users**: Automatically redirect to the home page if the user is already authenticated.
- **Enhanced Error Messages**: Display more detailed error messages to improve user experience.
- **OAuth**: Add authentication with third-party services like Google or Facebook for easier sign-ups.
