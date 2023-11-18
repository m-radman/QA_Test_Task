class ProductPage {
    elements = {
        quantityPlus: () => cy.get(".fa-plus"),
        addToCartBtn: () => cy.get("#btn-add-to-cart"),
        quantityField: () => cy.get('data-test="quantity"')
    }
}