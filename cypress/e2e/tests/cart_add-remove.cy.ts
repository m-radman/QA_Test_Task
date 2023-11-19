import homePage from "../pages/homePage"
import productPage from "../pages/productPage"
import cartPage from "../pages/cartPage"
import navBar from "../pages/common/navBar"
import rentalPage from "../pages/rentalPage"
import "@4tw/cypress-drag-drop"

describe("Add/Remove product to the cart", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("baseUrl"))
    })

    it("Add products to and remove products from the cart", () => {
        homePage.elements.toolCategories().first().check()
        cy.wait(500)
        homePage.elements.productList().eq(2).click()
        productPage.elements.addToCartBtn().click()
        navBar.elements.cartBadge().should("contain.text", "1")
        navBar.elements.homeLink().click()

        homePage.elements.toolCategories().eq(2).check()
        cy.wait(500)
        homePage.elements.productList().first().click()
        productPage.elements.addToCartBtn().click()
        navBar.elements.cartBadge().should("contain.text", "2")
        navBar.elements.homeLink().click()

        homePage.elements.toolCategories().eq(7).check()
        cy.wait(500)
        homePage.elements.productList().eq(1).click()
        productPage.elements.addToCartBtn().click()
        navBar.elements.cartBadge().should("contain.text", "3")
        navBar.elements.cartLink().click()

        cartPage.elements.cartItems().each((item) => {
            expect(item.text().toLowerCase().trim()).to.be.oneOf(["claw hammer", "adjustable wrench", "belt sander"])
        })

        cartPage.elements.removeItemBtns().eq(1).click()
        navBar.elements.cartBadge().should("contain.text", "2")
        cartPage.elements.cartItems().each((item) => {
            expect(item.text().toLowerCase().trim()).to.be.oneOf(["claw hammer", "belt sander"])
        })
    })

    it("Set product quatity then add to the cart", () => {
        homePage.elements.productList().eq(4).click()
        productPage.elements.quantityField().clear().type("3")
        productPage.elements.addToCartBtn().click()
        navBar.elements.cartLink().click()

        cartPage.elements.cartItems().should("have.length", "1")
        cartPage.elements.itemQuantity().should("have.value", "3")
    })

    it("Set product quantity from the cart page", () => {
        homePage.elements.productList().eq(4).click()
        productPage.elements.addToCartBtn().click()
        navBar.elements.cartLink().click()

        cartPage.elements.itemQuantity().clear().type("2{enter}")
        navBar.elements.cartBadge().should("have.text", "2")
    })

    it("Add rental category product to the cart", () => {
        navBar.elements.categoriesMenu().click()
        navBar.elements.rentalsLink().click()
        rentalPage.elements.products().first().click()
        productPage.elements.rentalSlider().move({ deltaX: 190, deltaY: 0 })
        cy.wait(1500)
        productPage.elements.addToCartBtn().click()
        navBar.elements.cartLink().click()

        cartPage.elements.cartItems().should("contain.text", "Excavator")
        cartPage.elements.itemQuantity().should("have.value", "5")
    })
})