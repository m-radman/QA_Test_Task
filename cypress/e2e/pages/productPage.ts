class ProductPage {
    elements = {
        quantityPlus: () => cy.get(".fa-plus"),
        addToCartBtn: () => cy.get("#btn-add-to-cart"),
        quantityField: () => cy.get('[data-test="quantity"]'),
        rentalSlider: () => cy.get("ngx-slider>span:nth-child(5)")
    }

    setRentalSlider(sliderOffset: number) {
        this.elements.rentalSlider().move({ deltaX: sliderOffset, deltaY: 0 })
        cy.wait(1500)
    }
}

export default new ProductPage()