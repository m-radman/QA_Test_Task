class RegistrationPage {
    elements = {
        firstNameField: () => cy.get("#first_name"),
        lastNameField: () => cy.get("#last_name"),
        dateOfBirthField: () => cy.get("#dob"),
        addressField: () => cy.get("#address"),
        postCodeField: () => cy.get("#postcode"),
        cityField: () => cy.get("#city"),
        stateField: () => cy.get("#state"),
        countryField: () => cy.get("#country"),
        phoneField: () => cy.get("#phone"),
        emailField: () => cy.get("#email"),
        passwordField: () => cy.get("#password"),
        registerBtn: () => cy.get('[data-test="register-submit"]')
    }
}