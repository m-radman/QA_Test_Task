class CheckoutPage {
    elements = {
        proceedCheckoutBtn: () => cy.contains("Proceed"),
        paymentMethodSelect: () => cy.get("#payment-method"),
        accountNameField: () => cy.get("#account-name"),
        accountNumberField: () => cy.get("#account-number"),
        confirmBtn: () => cy.get('[data-test="finish"]'),
        successMsg: () => cy.contains("successful"),
        confirmationMsg: () => cy.get("#order-confirmation")
    }
}

export default new CheckoutPage()