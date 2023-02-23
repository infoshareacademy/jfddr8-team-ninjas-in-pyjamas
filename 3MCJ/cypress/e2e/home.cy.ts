///   <reference types="cypress" />

describe('Home component', () => {
  beforeEach(() => {
    cy.visit('https://infoshareacademy.github.io/jfddr8-team-ninjas-in-pyjamas/');
  });

  it('displays the search section', () => {
    cy.get('.search-section').should('be.visible');
  });

  it('displays the logo', () => {
    cy.get('.shop-logo').should('be.visible');
  });

  it('allows the user to select a location', () => {
    cy.get('#location').select('Gdynia');
    cy.get('#location').should('have.value', 'Gdynia');
  });

  it('allows the user to select a category', () => {
    cy.get('#products').select('Wyroby Mięsne');
    cy.get('#products').should('have.value', 'Wyroby Mięsne');
  });

  // it('displays the seller list', () => {
  //   cy.get('.sellers-list').should('be.visible');
  // });
});