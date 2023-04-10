describe('Sign up', () => {

    beforeEach(() => {
        cy.visit('/sign-up');
    })
    
    // Skipped to avoid creating a new user every time the test suite is run
    it.skip('allows a user to sign up successfully', () => {
        // Generate a random email address
        const randomEmail = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '@test.com';

        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type(randomEmail)
        cy.get('input[name="password"]').type('password');
        cy.get('input[name="city"]').type('New York');

        cy.get('button[type="submit"]').click();

        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('displays an error message when the user enters an email address that is already in use', () => {
        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type('test.user@fake.com');
        cy.get('input[name="password"]').type('password');
        cy.get('input[name="city"]').type('New York');

        cy.get('button[type="submit"]').click();

        cy.get('div[role="alert"]').should('be.visible');
    });

    it('allows a user to get to the sign in page successfully', () => {
        cy.get('a[href="/sign-in"]').click();

        cy.url().should('eq', Cypress.config().baseUrl + '/sign-in');
    });
});