describe('Iniciar o iframe', () => {


    beforeEach(() => {
        cy.login()
    })

    it('Deve dar play no iframe', () => {
   
        cy.goTo('Video', 'Video')

        cy.get('iframe[title="Video Player"]')
            .should('exist')
            .its('0.contentDocument.body')
            .then(cy.wrap)
            .as('iFramePlayer')

        cy.get('@iFramePlayer')
            .should('exist')
            .find('.play-button')
            .should('be.visible')
            .click()


        cy.get('@iFramePlayer')
            .find('.pause-button')
            .should('exist')
    })

})