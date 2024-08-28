import { insightsUser } from "../fixtures/users";

describe("Smoke test", () => {
  it("Test if Account dashboard is loading", () => {
    cy.login(insightsUser);
    cy.visitInsights();

    cy.contains("Account dashboard").should("be.visible");
  });

  it("Test if App dashboard is loading", () => {
    cy.login(insightsUser);
    cy.visitInsights();

    cy.get('button[aria-haspopup="menu"]').contains("Apps").click();
    cy.get("li").contains("Moderation Dashboard").click();

    cy.contains("App dashboard").should("be.visible");
  });

  it("Test if Keyset dashboard is loading", () => {
    cy.login(insightsUser);
    cy.visitInsights();

    cy.get('button[aria-haspopup="menu"]').contains("Apps").click();
    cy.get("li").contains("Moderation Dashboard").click();

    cy.get('button[aria-haspopup="menu"]').contains("Keysets").click();
    cy.get("li").contains("Moderation Dashboard Keyset").click();

    cy.get("h1").contains("Moderation Dashboard").should("be.visible");
  });
});
