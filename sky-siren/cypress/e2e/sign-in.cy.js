describe('Sign in', () => {
  beforeEach(() => {
    cy.visit('/sign-in')
  })

  it('allows a user to sign in successfully', () => {
    cy.get('input[name="email"]').type('test.user@fake.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();
  
    cy.url().should('eq', 'http://localhost:5173/preferences');
  })

  it('displays an error message when the user enters incorrect credentials', () => {
    cy.get('input[name="email"]').type('test.user@fake.com');
    cy.get('input[name="password"]').type('wrongPassword');
    cy.get('button[type="submit"]').click();

    cy.get('div[role="alert"]').should('be.visible');
  })

  it('allows a user to sign out successfully', () => {
    cy.get('input[name="email"]').type('test.user@fake.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:5173/preferences');
    cy.get('[href="/sign-out"] > .material-icons').click({ force: true});

    cy.url().should('eq', 'http://localhost:5173/sign-in');
  });

  it('allows a user to get to the sign up page successfully', () => {
    cy.get('a.sign-up-link').click();

    cy.url().should('eq', 'http://localhost:5173/sign-up');
  });

});