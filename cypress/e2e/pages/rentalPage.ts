class RentalPage {
    elements = {
        products: () => cy.get("div.card")
    }
}

export default new RentalPage()