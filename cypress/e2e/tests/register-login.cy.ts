import navBar from "../pages/common/navBar"
import loginPage from "../pages/loginPage"
import registrationPage from "../pages/registrationPage"

import { faker } from "@faker-js/faker"
import { RegistrationForm } from "../helpers/models"

describe("User registration and Login tests", () => {
    let registrationData:  RegistrationForm
    let randomEmail: string

    beforeEach(() => {
        randomEmail = faker.internet.exampleEmail()

        cy.visit(Cypress.env("baseUrl"))
        cy.fixture("registrationData").then((data) => {
            registrationData = data
        })
    })

    it("Fail to register user with ommited address field", () => {
        navBar.elements.signInLink().click()
        loginPage.elements.registerLink().click()
        cy.registerUser({...registrationData, address: undefined})

        registrationPage.elements.addressError().should("be.visible")
    })

    it("Successfully register user with valid registration data", () => {
        navBar.elements.signInLink().click()
        loginPage.elements.registerLink().click()
        cy.registerUser({...registrationData, email: randomEmail})

        cy.url().should("contain", "/login")
    })

    it("Fail to register user with already taken email", () => {
        navBar.elements.signInLink().click()
        loginPage.elements.registerLink().click()
        cy.registerUser({...registrationData, email: Cypress.env("userEmail")})

        registrationPage.elements.registerError().should("be.visible")
    })

    it("Successfully login user with valid credentials", () => {
        navBar.elements.signInLink().click()
        cy.loginUser(Cypress.env("userEmail"), Cypress.env("userPassword"))

        cy.url().should("contain", "/account")
        navBar.elements.userMenu().should("be.visible")
    })

    it("Fail to login user with invalid password", () => {   
        navBar.elements.signInLink().click()
        loginPage.elements.registerLink().click()
        cy.registerUser({...registrationData, email: randomEmail})
        cy.wait(1000)
        
        cy.loginUser(randomEmail, "1234")

        loginPage.elements.loginError().should("be.visible")
        loginPage.elements.loginError().should("contain", "Invalid")
    })

    it("Lock the account after 4 unssuccesful attempts", () => {
        navBar.elements.signInLink().click()
        loginPage.elements.registerLink().click()
        cy.registerUser({...registrationData, email: randomEmail})
        cy.wait(1000)
        
        cy.loginUser(randomEmail, "1234")
        cy.loginUser(randomEmail, "12345")
        cy.loginUser(randomEmail, "123456")
        cy.loginUser(randomEmail, "1234567")

        loginPage.elements.loginError().should("contain", "Account locked")
    })
})