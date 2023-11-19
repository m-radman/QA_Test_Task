class NavBar {
    elements = {
        homeLink: () => cy.get('[data-test="nav-home"]'),
        categoriesMenu: () => cy.get('[data-test="nav-categories"]'),
        handToolsLink: () => cy.get('[data-test="nav-hand-tools"]'),
        powerToolsLink: () => cy.get('[data-test="nav-power-tools"]'),
        rentalsLink: () => cy.get('[data-test="nav-rentals"]'),
        signInLink: () => cy.get('[data-test="nav-sign-in"]'),
        cartLink: () => cy.get('[data-test="nav-cart"]'),
        cartBadge: () => cy.get('[data-test="cart-quantity"]'),
        userMenu: () => cy.get("#user-menu"),
        logoutUser: () => cy.get('[data-test="nav-sign-out"]')
    }
}

export default new NavBar()