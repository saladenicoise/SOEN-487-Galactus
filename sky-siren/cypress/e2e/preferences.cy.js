describe('Preferences', () => {
    beforeEach(() => {
        // TODO: make it work with the store
        cy.signIn('test.user@fake.com', 'password');
        cy.visit('/preferences');
        // cy.window().should('have.property', '__store__');
        // cy.window().then( win => {
        //     console.log(win.__store__.getters['user/userId'])
        // });
        
    });

    it('allows a user to change the language', () => {
        cy.visit('/preferences');
        
        cy.get('#languageFr').check('fr');

        cy.get('#languageFr').should('be.checked');
    });

    it('allows a user to change the temperature unit', () => {
        cy.get('#temperatureUnitFahrenheit').check('fahrenheit');
        cy.get('.btn').click();

        cy.get('#temperatureUnitFahrenheit').should('be.checked');
    });

    it('allows a user to change the time format', () => {
        cy.get('#timeFormat24').check('24');
        cy.get('.btn').click();

        cy.get('#timeFormat24').should('be.checked');
    });

    it('allows a user to change the location', () => {
        cy.get('#locationManualInput').check('manualInput');
        cy.get('.btn').click();

        cy.get('#locationManualInput').should('be.checked');
    });

    it('allows a user to change the weather alerts', () => {
        cy.get('#weatherAlerts').check();
        cy.get('.btn').click();

        cy.get('#weatherAlerts').should('be.checked');
    });

    it('allows a user to change the notifications', () => {
        cy.get('#notification').check();
        cy.get('.form-control').type('12:00');
        cy.get('.btn').click();

        cy.get('#notification').should('be.checked');
    });

});
