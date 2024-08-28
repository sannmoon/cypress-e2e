import { insightsUser } from "../fixtures/users";

describe("Expanded data download", () => {
  beforeEach(() => {
    cy.login(insightsUser);
    cy.visit(
      `/#/user/${Cypress.env("sharedUserId")}/account/${Cypress.env(
        "sharedAccountId"
      )}/app/${Cypress.env("app1")}/key/${Cypress.env(
        "keysetId1"
      )}/bi-dashboard/8fef8977-12ff-4c5e-9f32-4ab2565a1308/expanded`
    );
  });
  it("Should show table preview for channels", () => {
    cy.contains("Expanded Data Download").should("be.visible");
    selectFormFields("Channels", "Top Channels", "All", "Daily");

    cy.contains("button", "PREVIEW").click();
    cy.contains("Channel name", { timeout: 20000 })
      .scrollIntoView()
      .should("be.visible");
  });

  it("Should show table preview for users", () => {
    cy.contains("Expanded Data Download").should("be.visible");
    selectFormFields("Users", null, "By # of Messages", "Hourly");

    cy.contains("button", "PREVIEW").click();
    cy.contains("Count messages", { timeout: 20000 })
      .scrollIntoView()
      .should("be.visible");
  });

  it("Should show download notification when click on download csv", () => {
    cy.contains("Expanded Data Download").should("be.visible");
    selectFormFields("Channels", "Top Channels", "All", "Daily");

    cy.contains("button", "DOWNLOAD CSV").click();
    cy.contains("Your download will begin shortly!", { timeout: 50000 }).should(
      "be.visible"
    );
  });
});

function getDateTwoDaysEarlier(currentDate) {
  const [dayOfWeek, day, month, year] = currentDate.split(" ");
  const date = new Date(`${month} ${day}, ${year}`);
  date.setDate(date.getDate() - 2);

  const newDay = date.getDate();
  return newDay;
}

function selectFormFields(filter, type, category, period) {
  cy.get("p").contains(filter).click();

  if (type !== null) {
    cy.get('[data-testid="channel-type-select"]')
      .contains("Select option")
      .click();
    cy.get("li").contains(type).click();
  }

  cy.get('[data-testid="category-select"]').contains("Select option").click();
  cy.get('ul[role="listbox"] li').contains(category).click();

  cy.get('[data-testid="period-select"]').contains("Select option").click();
  cy.get('ul[role="listbox"] li').contains(period).click();

  cy.get('[data-testid="date-range-picker"]').click();
  cy.get(".rdrDayNumber").should("be.visible");
  cy.get("#date-picker").then(($el) => {
    const currentDateText = $el.text();
    const targetDateText = getDateTwoDaysEarlier(currentDateText);

    cy.get(`span.rdrDayNumber:contains("${targetDateText}")`).click();
    cy.get('[data-testid="date-range-submit"]').contains("Save").click();
  });
}
