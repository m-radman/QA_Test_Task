import homePage from "../pages/homePage"
import navBar from "../pages/common/navBar"
import cartPage from "../pages/cartPage"
import checkoutPage from "../pages/checkoutPage"

describe("Complete an Order tests", () => {
    before(() => {
        cy.visit(Cypress.env("baseUrl"))
    })

    it("Make an order successfully", () => {
        homePage.addProductToCart(0)
        navBar.elements.cartLink().click()
        cartPage.elements.checkoutBtn().click()

        cy.loginUser(Cypress.env("userEmail"), Cypress.env("userPassword"))

        checkoutPage.elements.proceedCheckoutBtn().click({ force: true })
        cy.wait(1500)
        
        checkoutPage.elements.stateField().type("State")
        checkoutPage.elements.postcodeField().type("123E009")
        checkoutPage.elements.proceedCheckoutBtn().click({ force: true })

        checkoutPage.elements.paymentMethodSelect().select("3: Credit Card")
        checkoutPage.elements.accountNameField().type("Jane Doe")
        checkoutPage.elements.accountNumberField().type("111222333555")
        checkoutPage.elements.confirmBtn().click()
        checkoutPage.elements.successMsg().should("be.visible")

        checkoutPage.elements.confirmBtn().click()
        checkoutPage.elements.confirmationMsg().should("be.visible")
    })
})