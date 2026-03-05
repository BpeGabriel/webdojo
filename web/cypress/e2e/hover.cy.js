describe('Simulando mouse hover', () => {

    it('Deve mostrar o texto ao colocar o mouse em cima do texto', () => {

        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.contains('Isso é Mouseover!').should('not.exist')
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!').should('exist')

    })
})