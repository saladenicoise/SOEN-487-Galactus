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
        
        cy.get('input[name="language"]').check('fr');

        cy.get('input[name="language"]').should('be.checked');
    });

    it('allows a user to change the temperature unit', () => {
        cy.get('input[name="temperatureUnit"]').check('fahrenheit');
        cy.get('button[type="submit"]').click();

        cy.get('input[name="temperatureUnit"]').should('be.checked');
    });

    it('allows a user to change the time format', () => {
        cy.get('input[name="timeFormat"]').check('24');
        cy.get('button[type="submit"]').click();

        cy.get('input[name="timeFormat"]').should('be.checked');
    });

    it('allows a user to change the location', () => {
        cy.get('input[name="location"]').check('manual');
        cy.get('button[type="submit"]').click();

        cy.get('input[name="location"]').should('be.checked');
    });

    it('allows a user to change the weather alerts', () => {
        cy.get('input[name="weatherAlerts"]').check();
        cy.get('button[type="submit"]').click();

        cy.get('input[name="weatherAlerts"]').should('be.checked');
    });

    it('allows a user to change the notifications', () => {
        cy.get('input[name="notifications"]').check();
        cy.get('input[name="time"]').type('12:00');
        cy.get('button[type="submit"]').click();

        cy.get('input[name="notifications"]').should('be.checked');
    });

});
