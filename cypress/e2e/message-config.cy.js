import { insightsUser } from "../fixtures/users";

describe("Messages configuration", () => {
  beforeEach(() => {
    cy.login(insightsUser);
    cy.visit(
      `/#/user/${Cypress.env("sharedUserId")}/account/${Cypress.env(
        "sharedAccountId"
      )}/app/${Cypress.env("appId2")}/key/${Cypress.env(
        "keysetId2"
      )}/bi-dashboard/2b1d0768-886d-49ee-93f6-277d246eabe3/settings?tab=messages`
    );
  });
  it("Search JSON path by key", () => {
    testJsonPath("key", "sensor_uuid");
  });

  it("Search JSON path by value", () => {
    testJsonPath("value", "probe-");
  });
});

function testJsonPath(searchBy, searchFor) {
  cy.get('span[data-testid="jp-add-path"]')
    .first()
    .scrollIntoView()
    .should("be.visible")
    .click();
  cy.get('[data-testid="creation-type-dontKnow"] > label').click();
  cy.get('[data-testid="jp-search-by-select"]').select(searchBy);
  cy.get('[data-testid="jp-search-for-input"]').type(searchFor);
  cy.contains("button", "Search").click();
  cy.contains("$.message.sensor_uuid", { timeout: 20000 })
    .scrollIntoView()
    .should("be.visible");
  cy.get('[data-testid="jp-result-row"] > div').first().click(); //only first row clicked though

  cy.get('input[name="jsonPath"]').should(
    "have.value",
    "$.message.sensor_uuid"
  );
  cy.contains("button", "Cancel").click();
}
