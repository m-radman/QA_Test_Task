import homePage from "../pages/homePage"
import "@4tw/cypress-drag-drop"

describe("Filter and sort products", () => {
    const firstProductName = "Adjustable Wrench"
    const lastProductName = "Wood Saw"
    const highestPrice = "80.19"
    const lowestPrice = "4.92"

    beforeEach(() => {
        cy.visit(Cypress.env("baseUrl"))
    })

    it("Sort products by name", () => {
        homePage.elements.sortMenu().select("name,asc")
        homePage.elements.productNamesList().first().should("contain.text", firstProductName)
        homePage.elements.nextPage().click()
        homePage.elements.nextPage().click()
        homePage.elements.productNamesList().last().should("contain.text", lastProductName)

        homePage.elements.previousPage().click()
        homePage.elements.previousPage().click()

        homePage.elements.sortMenu().select("name,desc")
        homePage.elements.productNamesList().first().should("contain.text", lastProductName)
        homePage.elements.nextPage().click()
        homePage.elements.nextPage().click()
        homePage.elements.productNamesList().last().should("contain.text", firstProductName)
    })

    it("Sort products by price", () => {
        homePage.elements.sortMenu().select("price,desc")
        homePage.elements.productPricesList().first().should("contain.text", highestPrice)
        homePage.elements.nextPage().click()
        homePage.elements.nextPage().click()
        homePage.elements.productPricesList().last().should("contain.text", lowestPrice)

        homePage.elements.previousPage().click()
        homePage.elements.previousPage().click()

        homePage.elements.sortMenu().select("price,asc")
        homePage.elements.productPricesList().first().should("contain.text", lowestPrice)
        homePage.elements.nextPage().click()
        homePage.elements.nextPage().click()
        homePage.elements.productPricesList().last().should("contain.text", highestPrice)
    })

    it("Filter products using slider", () => {
        homePage.elements.sliderLeft().move({ deltaX: 35, deltaY: 0 })
        homePage.elements.sliderRight().move({ deltaX: -15, deltaY: 0 })

        cy.wait(500)

        homePage.elements.productPricesList().each((price) => {
            expect(parseFloat(price.text().replace("$",""))).to.be.within(21, 66)
        })
    })

    it("Filter products using search", () => {
        homePage.elements.searchBar().type("hammer")
        homePage.elements.searchSubmitBtn().click()

        cy.wait(1000)

        homePage.elements.productNamesList().each((name) => {
            expect(name.text().toLowerCase()).to.contain("hammer")
        })
    })

    it("Filter products by category", () => {
        homePage.elements.toolCategories().eq(2).check()
        cy.contains("Adjustable Wrench").should("be.visible")
        cy.contains("Belt Sander").should("not.exist")
        cy.contains("Phillips Screwdriver").should("not.exist")

        homePage.elements.toolCategories().eq(2).uncheck()
        homePage.elements.toolCategories().eq(7).check()
        cy.contains("Adjustable Wrench").should("not.exist")
        cy.contains("Belt Sander").should("be.visible")
        cy.contains("Phillips Screwdriver").should("not.exist")

        homePage.elements.toolCategories().eq(2).check()
        cy.contains("Adjustable Wrench").should("be.visible")
        cy.contains("Belt Sander").should("be.visible")
        cy.contains("Phillips Screwdriver").should("not.exist")
    })

    it("Filtering by multiple parameters", () => {
        homePage.elements.toolCategories().eq(0).check()
        homePage.elements.sliderLeft().move({ deltaX: 27, deltaY: 0 })
        homePage.elements.sortMenu().select("name,desc")

        homePage.elements.productNamesList().first().should("contain.text", "Sledgehammer")
        homePage.elements.productNamesList().last().should("contain.text", "Fiberglass")
    })
})