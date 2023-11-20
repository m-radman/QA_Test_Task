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

    it("Fail to register with ommited address field", () => {
        navBar.elements.signInLink().click()
        loginPage.elements.registerLink().click()

        registrationPage.elements.firstNameField().type(registrationData.firstName)
        registrationPage.elements.lastNameField().type(registrationData.lastName)
        registrationPage.elements.dateOfBirthField().type(registrationData.dateOfBirth)
        registrationPage.elements.postCodeField().type(registrationData.postcode)
        registrationPage.elements.cityField().type(registrationData.city)
        registrationPage.elements.stateField().type(registrationData.state)
        registrationPage.elements.countryField().select(registrationData.country)
        registrationPage.elements.phoneField().type(registrationData.phone)
        registrationPage.elements.emailField().type(registrationData.email)
        registrationPage.elements.passwordField().type(registrationData.password)
        registrationPage.elements.registerBtn().click()

        registrationPage.elements.addressError().should("be.visible")
    })

    it("Register user with valid data", () => {
        navBar.elements.signInLink().click()
        loginPage.elements.registerLink().click()
        cy.registerUser(registrationData)

        cy.url().should("contain", "/login")
    })

    it("Fail to register with already taken email", () => {
        navBar.elements.signInLink().click()
        loginPage.elements.registerLink().click()
        cy.registerUser(registrationData)

        registrationPage.elements.registerError().should("be.visible")
    })

    it("Login user with valid credentials", () => {
        navBar.elements.signInLink().click()
        cy.loginUser(registrationData.email, registrationData.password)

        cy.url().should("contain", "/account")
        navBar.elements.userMenu().should("be.visible")
    })

    it("Fail to login with invalid password", () => {
        navBar.elements.signInLink().click()
        cy.loginUser(registrationData.email, "1234")

        loginPage.elements.loginError().should("be.visible")
        loginPage.elements.loginError().should("contain", "Invalid")
    })

    it("Account should lock after 4 unssuccesful attempts", () => {
        navBar.elements.signInLink().click()
        cy.loginUser(registrationData.email, "1234")
        cy.loginUser(registrationData.email, "12345")
        cy.loginUser(registrationData.email, "123456")
        cy.loginUser(registrationData.email, "1234567")

        loginPage.elements.loginError().should("contain", "Account locked")
    })
})