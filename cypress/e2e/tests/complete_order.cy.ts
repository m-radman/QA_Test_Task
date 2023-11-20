import homePage from "../pages/homePage"
import navBar from "../pages/common/navBar"
import cartPage from "../pages/cartPage"
import checkoutPage from "../pages/checkoutPage"

describe("Complete an order", () => {
    before(() => {
        cy.visit(Cypress.env("baseUrl"))
        cy.log("Test fail may be caused by missing user registration, in that case run 'register-login.cy.ts' tests first")
    })

    it("Make an order successfully", () => {

        homePage.addProductToCart(0)
        navBar.elements.cartLink().click()
        cartPage.elements.checkoutBtn().click()

        cy.loginUser(Cypress.env("userEmail"), Cypress.env("userPassword"))

        checkoutPage.elements.proceedCheckoutBtn().click({ force: true })
        cy.wait(1500)
        checkoutPage.elements.proceedCheckoutBtn().click({ force: true })

        checkoutPage.elements.paymentMethodSelect().select("3: Credit Card")
        checkoutPage.elements.accountNameField().type("Milogled")
        checkoutPage.elements.accountNumberField().type("111222333555")
        checkoutPage.elements.confirmBtn().click()
        checkoutPage.elements.successMsg().should("be.visible")

        checkoutPage.elements.confirmBtn().click()
        checkoutPage.elements.confirmationMsg().should("be.visible")
    })
})