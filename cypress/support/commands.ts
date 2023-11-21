/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
declare global {
    namespace Cypress {
        interface Chainable {
            loginUser(email: string, password: string): Chainable<void>
            registerUser(registrationData: RegistrationForm): Chainable<void>
        }
    }
}

import registrationPage from "../e2e/pages/registrationPage"
import loginPage from "../e2e/pages/loginPage"
import { RegistrationForm } from "../e2e/helpers/models"

Cypress.Commands.add("loginUser", (email: string, password: string) => {
    loginPage.elements.emailField().clear().type(email)
    loginPage.elements.passwordField().clear().type(password)
    loginPage.elements.loginBtn().click()
})

Cypress.Commands.add("registerUser", (registrationData: RegistrationForm) => {
    registrationPage.elements.firstNameField().type(registrationData.firstName)
    registrationPage.elements.lastNameField().type(registrationData.lastName)
    registrationPage.elements.dateOfBirthField().type(registrationData.dateOfBirth)
    if (registrationData.address != undefined) {
        registrationPage.elements.addressField().type(registrationData.address)
    }
    registrationPage.elements.postCodeField().type(registrationData.postcode)
    registrationPage.elements.cityField().type(registrationData.city)
    registrationPage.elements.stateField().type(registrationData.state)
    registrationPage.elements.countryField().select(registrationData.country)
    registrationPage.elements.phoneField().type(registrationData.phone)
    registrationPage.elements.emailField().type(registrationData.email)
    registrationPage.elements.passwordField().type(registrationData.password)
    registrationPage.elements.registerBtn().click()
})