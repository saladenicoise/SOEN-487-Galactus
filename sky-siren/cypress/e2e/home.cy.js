describe('Home', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('allows a user to search weather by city = Tokyo', () => {
        cy.get('input[name="city"]').type('Tokyo');
        cy.get('button[class="btn"]').click();

        cy.get('h2').should('contain', 'Tokyo');
    });

    it('allows a user to search weather by city = Montreal', () => {
        cy.get('input[name="city"]').type('Montreal');
        cy.get('button[class="btn"]').click();

        cy.get('h2').should('contain', 'Montreal');
    });
});
