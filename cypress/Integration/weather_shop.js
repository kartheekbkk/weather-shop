describe('WeatherShopper Tests', () => {
    beforeEach(() => {
      cy.visit('https://weathershopper.pythonanywhere.com/')
    })
  
    it('Should display the correct title', () => {
      cy.title().should('eq', 'Current Temperature')
    })
  
    it('Should select the correct product based on the temperature', () => {
      cy.get('#temperature').then(($temp) => {
        const temperature = parseInt($temp.text().trim())
  
        if (temperature < 20) {
          cy.contains('Buy Moisturizers').click()
          cy.url().should('include', '/moisturizer')
        } else {
          cy.contains('Buy Sunscreens').click()
          cy.url().should('include', '/sunscreen')
        }
      })
    })
  
    it('Should add items to the cart', () => {
      cy.get('.container').each(($el) => {
        cy.wrap($el).within(() => {
          cy.get('.text-center .btn.btn-primary').click()
        })
      })
  
      cy.contains('Cart').click()
      cy.url().should('include', '/cart')
      cy.get('.success').should('be.visible')
    })
  })
  