import { insightsUser } from "../fixtures/users";

describe("Dashboard setting update", () => {
  beforeEach(() => {
    cy.login(insightsUser);
    cy.visit(
      `/#/user/${Cypress.env("sharedUserId")}/account/${Cypress.env(
        "sharedAccountId"
      )}/app/${Cypress.env("appId1")}/key/${Cypress.env(
        "keysetId1"
      )}/bi-dashboard/8fef8977-12ff-4c5e-9f32-4ab2565a1308/settings?tab=info`
    );
  });
  it("Update dashboard name", () => {
    const time = new Date().getTime();
    cy.contains("Dashboard Info").should("be.visible").click();
    cy.get('[data-testid="dashboard-name-input"]')
      .clear()
      .type(`Moderation Dashboard ${time}`);

    const clickItems = [
      "in-app-chat",
      "virtual-events",
      "geolocation",
      "iot",
      "alerts-&-push",
      "other",
    ];

    const clickItem = (text) => {
      cy.get(`[data-testid="use-case-${text}"]`).then(($item) => {
        const isSelected = $item.hasClass("jss69 jss66");
        if (!isSelected) {
          cy.wrap($item).click();
        }
      });
    };

    clickItems.forEach((text) => {
      clickItem(text);
    });

    cy.get('[data-testid="dialog-submit-button"]', { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.contains(`Dashboard info updated`, { timeout: 10000 }).should(
      "be.visible"
    );
  });
});
