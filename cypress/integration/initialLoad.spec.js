/// <reference types="cypress" />

describe('ESO Craft Request', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Displays the Demo notice on initial load', () => {
    cy.get('div#terms-of-use').should('exist');
  });

  describe('When the terms are accepted', () => {
    beforeEach(() => {
      cy.get('button#accept').click();
    });

    it('closes the terms of use dialog', () => {
      cy.get('div#terms-of-use').should('not.exist');
    });

    it('enables the application', () => {
      cy.get('div.makeStyles-disabled-2').should('not.exist');
    });
  });

  describe('when the terns are declined', () => {
    beforeEach(() => {
      cy.get('button#decline').click();
    });

    it('closes the terms of use dialog', () => {
      cy.get('div#terms-of-use').should('not.exist');
    });

    it('disables the application', () => {
      cy.get('div.makeStyles-disabled-2').should('exist');
    });
  });
});
