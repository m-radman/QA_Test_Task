class LoginPage {
    elements = {
        emailField: () => cy.get("#email"),
        passwordField: () => cy.get("#password"),
        loginBtn: () => cy.get('[data-test="login-submit"]'),
        registerLink: () => cy.get('[data-test="register-link"]'),
        loginError: () => cy.get('[data-test="login-error"]')
    }
}

export default new LoginPage()