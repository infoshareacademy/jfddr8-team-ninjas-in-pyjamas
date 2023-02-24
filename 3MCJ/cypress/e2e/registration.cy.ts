///   <reference types="cypress" />

describe("Registration component", () => {
  beforeEach(() => {
    cy.visit(
      "https://infoshareacademy.github.io/jfddr8-team-ninjas-in-pyjamas/#/registration"
    );
  });

  it("displays registration form", () => {
    cy.get("form[name=registration_form]").should("exist");
  });

  it("submits the form with valid data", () => {
    const user = {
      email: "test@example.com",
      password: "password",
      confirmPassword: "password",
      name: "Jan",
      surname: "Kowal",
      city: "New York",
      userType: "customer",
    };

    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[name="confirmPassword"]').type(user.confirmPassword);
    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="surname"]').type(user.surname);
    cy.get('input[name="city"]').type(user.city);
    cy.get('select[name="userType"]').select(user.userType);

    cy.get("form[name=registration_form]").submit();

    cy.url().should(
      "include",
      "https://infoshareacademy.github.io/jfddr8-team-ninjas-in-pyjamas/"
    );
  });

  it("displays error message when password confirmation does not match", () => {
    const user = {
      email: "test@example.com",
      password: "password",
      confirmPassword: "wrong_password",
      name: "Jan",
      surname: "Kowal",
      city: "New York",
      userType: "customer",
    };

    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[name="confirmPassword"]').type(user.confirmPassword);
    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="surname"]').type(user.surname);
    cy.get('input[name="city"]').type(user.city);
    cy.get('select[name="userType"]').select(user.userType);

    cy.get("form[name=registration_form]").submit();

    cy.get(".error-message").should("exist");
  });
});
