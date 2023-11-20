import productPage from "./productPage"
import { SortOptions, ToolCategories } from "../helpers/models"
import "@4tw/cypress-drag-drop"

class HomePage {
    elements = {
        productList: () => cy.get("a.card"),
        sortMenu: () => cy.get("[data-test='sort']"),
        sliderLeft: () => cy.get("ngx-slider>span:nth-child(5)"),
        sliderRight: () => cy.get("ngx-slider>span:nth-child(6)"),
        searchBar: () => cy.get('[data-test="search-query"]'),
        searchSubmitBtn: () => cy.get('[data-test="search-submit"]'),
        toolCategories: () => cy.get("ul input"),
        productNamesList: () => cy.get('[data-test="product-name"]'),
        productPricesList: () => cy.get('[data-test="product-price"]'),
        nextPage: () => cy.get(".pagination-next"),
        previousPage: () => cy.get(".pagination-previous")
    }

    sortProductNames(option: SortOptions, firstValue: string, lastValue: string, numOfPages: number = 3) {
        this.elements.sortMenu().select(option)
        this.elements.productNamesList().first().should("contain.text", firstValue)
        for(let i = 1; i < numOfPages; i++) {
            this.elements.nextPage().click()
        }
        this.elements.productNamesList().last().should("contain.text", lastValue)
    }

    sortProductPrices(option: SortOptions, firstValue: string, lastValue: string, numOfPages: number = 3) {
        this.elements.sortMenu().select(option)
        this.elements.productPricesList().first().should("contain.text", firstValue)
        for(let i = 1; i < numOfPages; i++) {
            this.elements.nextPage().click()
        }
        this.elements.productPricesList().last().should("contain.text", lastValue)
    }

    setPriceRange(moveLeftEnd: number, moveRightEnd: number) {
        this.elements.sliderLeft().move({ deltaX: moveLeftEnd, deltaY: 0 })
        this.elements.sliderRight().move({ deltaX: moveRightEnd, deltaY: 0 })
        cy.wait(500)
    }

    searchForProduct(searchQuery: string) {
        this.elements.searchBar().type(searchQuery)
        this.elements.searchSubmitBtn().click()
        cy.wait(1000)
    }

    checkCategory(category: ToolCategories) {
        this.elements.toolCategories().eq(category).check()
        cy.wait(500)
    }

    addProductToCart(productIndex: number, quantity: number = 1) {
        this.elements.productList().eq(productIndex).click()
        productPage.elements.quantityField().clear().type(`${quantity}`)
        productPage.elements.addToCartBtn().click()
    }
}

export default new HomePage()