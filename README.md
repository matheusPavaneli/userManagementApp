# UserManagementAPP

User Management APP is a user management system with multiple manipulation functionalities, in short, it facilitates the creation of users in your application. visit [userManagementAPI](https://github.com/matheusPavaneli/userManagementAPI).

## Getting Started

### Prerequisites

Ensure you have Git installed on your machine to clone the repository. For installation instructions, visit [Git's official site](https://git-scm.com/downloads).

### Clone the Repository

To obtain a local copy of the project, execute:

```bash
git clone https://github.com/matheusPavaneli/userManagementApp.git
```

Then, navigate to the project directory:

```bash
cd userManagementApp
```

### Setting Up Environment Variables

You need to configure the `BASE_URL` in the `config` folder, in the `global` file.

```
const globalConfig = {
  BASE_URL: 'http://localhost:3001',
};
```

### Installing Dependencies

Install the required dependencies with:

```bash
npm install
```

### Running the Application

Launch the application using:

```bash
npm run dev
```

## Features

- **User manipulation:** allows user registration, updating and deleting.
- **Authentication:** it has an authentication system with field validation.
- **Forget e Reset Password:** allows the user to recover their password.
- **Upload image:** the user can upload a profile photo to their account.
- **2Step Factor (2FA):** allows the user to implement additional security by verifying codes with Google Authenticator.

## Technologies Used

- **@reduxjs/toolkit:** Toolkit for efficient Redux development, providing utilities to simplify store setup, reducers, and actions.
- **Axios:** Promise-based HTTP client for making requests to external services.
- **Bcryptjs:** Library for hashing and salting user passwords for security.
- **Js-cookie:** A simple, lightweight JavaScript API for handling browser cookies.
- **Jwt-decode:** Library for decoding JWTs (JSON Web Tokens) to extract the payload and header.
- **React:** A JavaScript library for building user interfaces, primarily for single-page applications.
- **React-dom:** React package for working with the DOM (Document Object Model).
- **React-icons:** An extensive library of popular icons for React applications.
- **React-redux:** Official React bindings for Redux, enabling React components to read data from a Redux store, and dispatch actions to the store to update data.
- **React-router-dom:** DOM bindings for React Router, a collection of navigational components for web applications.
- **React-toastify:** Library for adding customizable toast notifications to React applications.
- **Redux-persist:** Library to persist and rehydrate a redux store between page reloads.
- **Redux-saga:** Middleware library to handle side effects in Redux applications using sagas.

## Final Observations

Finally, it is important to highlight that this application requires the backend informed at the top of the documentation, thus making it possible to take advantage of all possible features.