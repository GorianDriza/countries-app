describe('Navigation', () => {
    it('should navigate to the countries page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        // Find a button and click it
        cy.get('#goToCountries').click()

        // The new url should include "/countries"
        cy.url().should('include', '/countries')

        // The new page should contain an h1 with "Countries App"
        cy.get('h2').contains('Countries App')
    })
});

describe('Navigation', () => {
    it('should navigate to the country detail page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/countries/')

        // Find a button and click it
        cy.get('ul').children().each(($el, index) => {
            if (index === 1) $el.click();
        })

        // The new url should include "/contry"
        cy.url().should('include', '/country')

        // The new page should contain an h1 with "Countries App"
        cy.get('h2').contains('Countries App')
    })
});