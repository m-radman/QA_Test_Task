import navBar from "../pages/common/navBar"
import loginPage from "../pages/loginPage"
import registrationPage from "../pages/registrationPage"

import { RegistrationForm } from "../helpers/models"

describe("User registration and login tests", () => {
    let registrationData:  RegistrationForm
    
    beforeEach(() => {
        cy.visit(Cypress.env("baseUrl"))
        cy.fixture("registrationData").then((data) => {
            registrationData = data
        })
    })

    it("Try to register with ommited address field", () => {
        navBar.elements.signInLink().click()
        loginPage.elements.registerLink().click()

        registrationPage.elements.firstNameField().type(registrationData.firstName)
        registrationPage.elements.lastNameField().type(registrationData.lastName)
        registrationPage.elements.dateOfBirthField().type(registrationData.dateOfBirth)
        registrationPage.elements.postCodeField().type(registrationData.postcode)
        registrationPage.elements.cityField().type(registrationData.city)
        registrationPage.elements.stateField().type(registrationData.state)
        registrationPage.elements.countryField().select("AX")
        registrationPage.elements.phoneField().type(registrationData.phone)
        registrationPage.elements.emailField().type(registrationData.email)
        registrationPage.elements.passwordField().type(registrationData.password)
        registrationPage.elements.registerBtn().click()

        registrationPage.elements.addressError().should("be.visible")
    })

    it("Register user successfully", () => {
        navBar.elements.signInLink().click()
        loginPage.elements.registerLink().click()

        registrationPage.elements.firstNameField().type(registrationData.firstName)
        registrationPage.elements.lastNameField().type(registrationData.lastName)
        registrationPage.elements.dateOfBirthField().type(registrationData.dateOfBirth)
        registrationPage.elements.addressField().type(registrationData.address)
        registrationPage.elements.postCodeField().type(registrationData.postcode)
        registrationPage.elements.cityField().type(registrationData.city)
        registrationPage.elements.stateField().type(registrationData.state)
        registrationPage.elements.countryField().select("AX")
        registrationPage.elements.phoneField().type(registrationData.phone)
        registrationPage.elements.emailField().type(registrationData.email)
        registrationPage.elements.passwordField().type(registrationData.password)
        registrationPage.elements.registerBtn().click()

        cy.url().should("contain", "/login")
    })

    it("Try to register with already taken email", () => {
        navBar.elements.signInLink().click()
        loginPage.elements.registerLink().click()

        registrationPage.elements.firstNameField().type(registrationData.firstName)
        registrationPage.elements.lastNameField().type(registrationData.lastName)
        registrationPage.elements.dateOfBirthField().type(registrationData.dateOfBirth)
        registrationPage.elements.addressField().type(registrationData.address)
        registrationPage.elements.postCodeField().type(registrationData.postcode)
        registrationPage.elements.cityField().type(registrationData.city)
        registrationPage.elements.stateField().type(registrationData.state)
        registrationPage.elements.countryField().select("AX")
        registrationPage.elements.phoneField().type(registrationData.phone)
        registrationPage.elements.emailField().type(registrationData.email)
        registrationPage.elements.passwordField().type(registrationData.password)
        registrationPage.elements.registerBtn().click()

        registrationPage.elements.registerError().should("be.visible")
    })

    it("Login user successfully", () => {
        navBar.elements.signInLink().click()
        loginPage.elements.emailField().type(registrationData.email)
        loginPage.elements.passwordField().type(registrationData.password)
        loginPage.elements.loginBtn().click()

        cy.url().should("contain", "/account")
        navBar.elements.userMenu().should("be.visible")
    })

    it("Try to login with invalid password", () => {
        navBar.elements.signInLink().click()
        loginPage.elements.emailField().type(registrationData.email)
        loginPage.elements.passwordField().type("12345")
        loginPage.elements.loginBtn().click()

        loginPage.elements.loginError().should("be.visible")
        loginPage.elements.loginError().should("contain", "Invalid")
    })

    it("Account should lock after 4 unssuccesful attempts", () => {
        navBar.elements.signInLink().click()
        loginPage.elements.emailField().type(registrationData.email)
        loginPage.elements.passwordField().type("1111")
        loginPage.elements.loginBtn().click()

        loginPage.elements.passwordField().clear()
        loginPage.elements.passwordField().type("123")
        loginPage.elements.loginBtn().click()

        loginPage.elements.passwordField().clear()
        loginPage.elements.passwordField().type("1234")
        loginPage.elements.loginBtn().click()

        loginPage.elements.passwordField().clear()
        loginPage.elements.passwordField().type("12345")
        loginPage.elements.loginBtn().click()

        loginPage.elements.loginError().should("contain", "Account locked")
    })
})