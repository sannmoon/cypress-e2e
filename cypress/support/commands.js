Cypress.Commands.add("login", ({ email, password }) => {
  cy.session(
    { email, password },
    () => {
      cy.visit("/login");
      cy.get('input[placeholder="Email address"]').type(email);
      cy.get('input[placeholder="Password"]').type(password);

      cy.get('button[type="submit"]').click();

      cy.url().should("contain", "/home");
    },
    {
      cacheAcrossSpecs: true,
      validate() {
        cy.request({
          method: "GET",
          url: "/api/me",
          headers: { referer: window.origin },
        })
          .its("status")
          .should("eq", 200);
      },
    }
  );
});

Cypress.Commands.add(
  "switchAccount",
  (email = Cypress.env("sharedAccountEmail")) => {
    cy.get('button[aria-haspopup="listbox"]').click();
    cy.get(`a[title="Switch to ${email}"]`).click();
    cy.url().should("contain", `account/${Cypress.env("sharedAccountId")}`);
  }
);

Cypress.Commands.add(
  "visitInsights",
  (email = Cypress.env("sharedAccountEmail")) => {
    cy.visit("/");
    cy.switchAccount(email);
    cy.get('a[id="bi-dashboard-menu"]').click();
  }
);

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
