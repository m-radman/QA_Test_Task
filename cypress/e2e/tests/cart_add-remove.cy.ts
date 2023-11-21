import homePage from "../pages/homePage"
import productPage from "../pages/productPage"
import cartPage from "../pages/cartPage"
import navBar from "../pages/common/navBar"
import rentalPage from "../pages/rentalPage"
import { ToolCategories } from "../helpers/models"
import "@4tw/cypress-drag-drop"

describe("Add to Cart & Remove from Cart tests", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("baseUrl"))
    })

    it("Add products then remove products from the cart", () => {
        homePage.checkCategory(ToolCategories.hammer)
        homePage.addProductToCart(2)
        navBar.elements.cartBadge().should("contain.text", "1")
        navBar.elements.homeLink().click()

        homePage.checkCategory(ToolCategories.wrench)
        homePage.addProductToCart(0)
        navBar.elements.cartBadge().should("contain.text", "2")
        navBar.elements.homeLink().click()

        homePage.checkCategory(ToolCategories.sander)
        homePage.addProductToCart(1)
        navBar.elements.cartBadge().should("contain.text", "3")
        navBar.elements.cartLink().click()

        cartPage.elements.cartItems().each((item) => {
            expect(item.text().toLowerCase().trim()).to.be.oneOf(["claw hammer", "adjustable wrench", "belt sander"])
        })

        cartPage.removeProductFromCart(1)
        navBar.elements.cartBadge().should("contain.text", "2")
        cartPage.elements.cartItems().each((item) => {
            expect(item.text().toLowerCase().trim()).to.be.oneOf(["claw hammer", "belt sander"])
        })
    })

    it("Set product quatity then add to the cart", () => {
        homePage.addProductToCart(4, 3)
        navBar.elements.cartLink().click()

        cartPage.elements.cartItems().should("have.length", "1")
        cartPage.elements.itemQuantity().should("have.value", "3")
    })

    it("Set product quantity from the cart page", () => {
        homePage.addProductToCart(4)
        navBar.elements.cartLink().click()

        cartPage.setQuantity(2)
        navBar.elements.cartBadge().should("have.text", "2")
    })

    it("Add rental category product to the cart", () => {
        navBar.elements.categoriesMenu().click()
        navBar.elements.rentalsLink().click()
        rentalPage.elements.products().first().click()
        productPage.setRentalSlider(190)
        productPage.elements.addToCartBtn().click()
        navBar.elements.cartLink().click()

        cartPage.elements.cartItems().should("contain.text", "Excavator")
        cartPage.elements.itemQuantity().should("have.value", "5")
    })
})