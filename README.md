This project includes end-to-end (E2E) tests for PubNub Insights using Cypress. These tests are designed to ensure the reliability and accuracy of PubNub Insights, providing thorough coverage of critical functionalities.

1. Create Environment Variables File
   Start by creating a cypress.env.json file. You can do this by copying the cypress.env.example.json file:

```
cp cypress.env.example.json cypress.env.json
```

Fill in the required environment variables in cypress.env.json with the appropriate values for your environment, such as API keys, user credentials, and other sensitive information.

2. Install Dependencies and Run Cypress
   Once your environment variables are set, install the project dependencies:

```
npm install
```

After the dependencies are installed, launch Cypress:

```
npx cypress open
```

This command will open the Cypress Test Runner, allowing you to select and run the tests for PubNub Insights.
