import { Given, When } from 'cypress-cucumber-preprocessor/steps';

Given('I go to the home page', () => {
  cy.visit('/');
});

When('I click on {string}', element => {
  cy.get(element).click();
});

Then('I am navigated to {string} page', location => {
  cy.url().should('eq', 'http://localhost:4200/' + location);
});
