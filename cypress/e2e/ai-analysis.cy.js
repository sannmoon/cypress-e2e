import { insightsUser } from "../fixtures/users";

describe("Analyze with AI", () => {
  beforeEach(() => {
    cy.login(insightsUser);
    cy.visit(
      `#/user/${Cypress.env("sharedUserId")}/account/${Cypress.env(
        "sharedAccountId"
      )}/app/${Cypress.env("appId1")}/key/${Cypress.env(
        "keysetId1"
      )}/bi-dashboard/8fef8977-12ff-4c5e-9f32-4ab2565a1308`
    );
  });
  it("Check if all dashboard sections are visible in 'Analyze with AI'", () => {
    cy.get('[data-tracking-id="bi:analyze-btn"]').should("be.visible").click();
    cy.get('[data-testid="query-select-bigNumbersSnapshot"]', {
      timeout: 3000,
    }).should("be.visible");
    cy.get(
      '[data-testid="query-select-messageActivityByCountrySnapshot"]'
    ).should("be.visible");
    cy.get('[data-testid="query-select-uniqueUsersByCountrySnapshot"]').should(
      "be.visible"
    );

    changeTab("channels");
    cy.get('[data-testid="query-select-uniqueByHourChannels"]').should(
      "be.visible"
    );
    cy.get('[data-testid="query-select-uniqueByDayChannels"]').should(
      "be.visible"
    );
    cy.get('[data-testid="query-select-uniqueByWeekChannels"]').should(
      "be.visible"
    );
    cy.get('[data-testid="query-select-top20Channels"]').should("be.visible");

    changeTab("users");
    cy.get('[data-testid="query-select-uniqueByHourUsers"]').should(
      "be.visible"
    );
    cy.get('[data-testid="query-select-uniqueByDayUsers"]').should(
      "be.visible"
    );
    cy.get('[data-testid="query-select-uniqueByWeekUsers"]').should(
      "be.visible"
    );
    cy.get('[data-testid="query-select-top20Users"]').should("be.visible");

    changeTab("user-behavior-&-devices");
    cy.get('[data-testid="query-select-avgUserDurationByHour"]').should(
      "be.visible"
    );
    cy.get(
      '[data-testid="query-select-uniqueUsersByDurationTimeframeByHour"]'
    ).should("be.visible");
    cy.get(
      '[data-testid="query-select-top20ChannelsWithUserDurationByHour"]'
    ).should("be.visible");
    cy.get('[data-testid="query-select-publishes_by_device_type"]').should(
      "be.visible"
    );
    cy.get('[data-testid="query-select-subscribers_by_device_type"]').should(
      "be.visible"
    );
    cy.get('[data-testid="query-select-unique_users_by_device_type"]')
      .scrollIntoView()
      .should("be.visible");

    changeTab("messages");
    cy.get('[data-testid="query-select-byHourMessages"]').should("be.visible");
    cy.get('[data-testid="query-select-byDayMessages"]').should("be.visible");
    cy.get('[data-testid="query-select-byWeekMessages"]').should("be.visible");
    cy.get('[data-testid="query-select-top10MessageTypes"]').should(
      "be.visible"
    );
    cy.get('[data-testid="query-select-activityByCountryMessages"]').should(
      "be.visible"
    );
  });

  it("Snapshot - Analyze with AI", () => {
    cy.get('[data-tracking-id="bi:analyze-btn"]').click();
    cy.get('[data-testid="query-select-bigNumbersSnapshot"]').click();
    cy.get(
      '[data-testid="query-select-messageActivityByCountrySnapshot"]'
    ).click();
    cy.get('[data-testid="query-select-uniqueUsersByCountrySnapshot"]').click();
    cy.get('input[name="industry"]').clear().type("Gaming");
    cy.get('input[name="companyType"]').clear().type("Game Test LLC");
    cy.get('input[name="channelsDescription"]').clear().type("Message B");
    cy.get('button[aria-haspopup="listbox"]').eq(1).click();
    cy.get("li").contains("Give me the top 3 insights").click();

    cy.get('textarea[name="userPrompt"]').type("Summarize the data");

    cy.get('button[data-tracking-id="bi:submit-ai"]').click();

    cy.get('[data-testid="ai-message-content-assistant"]', {
      timeout: 50000,
    }).should("exist");
    cy.get('[data-testid="ai-request-properties"]').should("exist");

    cy.contains("Give me the top 3 insights").should("be.visible");
    cy.contains("Analyze with AI").should("be.visible");
    cy.get("button").contains("Regenerate").should("exist");
  });

  it("Allows user to see analyze with AI history", () => {
    cy.get('[data-tracking-id="bi:users-tab"]', { timeout: 50000 }).click();
    cy.get('[data-tracking-id="bi:analyze-btn"]').should("be.visible").click();
    cy.get('svg[data-slot="icon"].cursor-pointer').click();
    //may need better selector cause this is also similar button for ai-new-chat-message
    cy.get('[data-testid="ai-result-view"]', { timeout: 30000 })
      .should("be.visible")
      .eq(1)
      .click();
    cy.get("p.text-xs")
      .should("contain.text", "Industry: Gaming")
      .and("be.visible");
    cy.get('input[data-test-id="ai-new-message-input"]')
      .scrollIntoView()
      .should("be.visible")
      .type("Elaborate more");
    cy.get('button[data-test-id="ai-new-chat-message"]')
      .should("be.visible")
      .click();

    cy.contains("Elaborate more").should("be.visible");
  });
});

function changeTab(tab) {
  cy.get('[data-testid="CloseIcon"]').scrollIntoView().click();

  cy.get(`[data-tracking-id="bi:${tab}-tab"]`).click();
  cy.get('[data-tracking-id="bi:analyze-btn"]').scrollIntoView().click();
}
