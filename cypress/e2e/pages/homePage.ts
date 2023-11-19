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
}

export default new HomePage()