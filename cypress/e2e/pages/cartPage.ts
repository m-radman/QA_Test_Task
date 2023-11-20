class CartPage {
    elements = {
        cartItems: () => cy.get(".product-title"),
        itemQuantity: () => cy.get(".quantity"),
        removeItemBtns: () => cy.get(".fa-remove"),
        checkoutBtn: () => cy.get('[data-test="proceed-1"]')
    }

    removeProductFromCart(productIndex: number) {
        this.elements.removeItemBtns().eq(productIndex).click()
    }

    setQuantity(quantity: number) {
        this.elements.itemQuantity().clear().type(`${quantity}{enter}`)
    }
}

export default new CartPage()