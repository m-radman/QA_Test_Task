import homePage from "../pages/homePage"
import { SortOptions, ToolCategories } from "../helpers/models"
import "@4tw/cypress-drag-drop"

describe("Filter and Sort tests", () => {

    beforeEach(() => {
        cy.visit(Cypress.env("baseUrl"))
    })

    it("Sort products by name", () => {
        const firstProductName = "Adjustable Wrench"
        const lastProductName = "Wood Saw"

        homePage.sortProductNames(SortOptions.AtoZ, firstProductName, lastProductName)

        homePage.elements.previousPage().click()
        homePage.elements.previousPage().click()

        homePage.sortProductNames(SortOptions.ZtoA, lastProductName, firstProductName)
    })

    it("Sort products by price", () => {
        const highestPrice = "80.19"
        const lowestPrice = "4.92"

        homePage.sortProductPrices(SortOptions.HighToLow, highestPrice, lowestPrice)

        homePage.elements.previousPage().click()
        homePage.elements.previousPage().click()

        homePage.sortProductPrices(SortOptions.LowToHigh, lowestPrice, highestPrice)
    })

    it("Filter products using slider", () => {
        const minimumRangeOffset = 35
        const maximumRangeOffset = -15

        const expectedMinValue = 21
        const expectedMaxValue = 66

        homePage.setPriceRange(minimumRangeOffset, maximumRangeOffset)

        homePage.elements.productPricesList().each((price) => {
            expect(parseFloat(price.text().replace("$",""))).to.be.within(expectedMinValue, expectedMaxValue)
        })
    })

    it("Filter products using search", () => {
        homePage.searchForProduct("hammer")

        homePage.elements.productNamesList().each((name) => {
            expect(name.text().toLowerCase()).to.contain("hammer")
        })
    })

    it("Filter products by category", () => {
        cy.contains("Bolt Cutters").should("be.visible")
        cy.contains("Adjustable Wrench").should("not.exist")
        cy.contains("Belt Sander").should("not.exist")

        homePage.checkCategory(ToolCategories.wrench)
        cy.contains("Adjustable Wrench").should("be.visible")
        cy.contains("Belt Sander").should("not.exist")
        cy.contains("Bolt Cutters").should("not.exist")

        homePage.checkCategory(ToolCategories.sander)
        cy.contains("Adjustable Wrench").should("be.visible")
        cy.contains("Belt Sander").should("be.visible")
        cy.contains("Bolt Cutters").should("not.exist")
    })

    it("Filter products by multiple parameters", () => {
        homePage.checkCategory(ToolCategories.hammer)
        homePage.elements.sliderLeft().move({ deltaX: 27, deltaY: 0 })
        homePage.sortProductNames(SortOptions.ZtoA, "Sledgehammer", "Fiberglass", 1)
    })
})