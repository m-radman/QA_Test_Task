class CartPage {
    elements = {
        cartItems: () => cy.get(".product-title"),
        itemQuantity: () => cy.get(".quantity"),
        removeItemBtns: () => cy.get(".fa-remove"),
        checkoutBtn: () => cy.get('[data-test="proceed-1"]')
    }
}