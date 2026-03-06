describe('Simulando mouse hover', () => {

    it('Deve mostrar o texto ao colocar o mouse em cima do texto', () => {

        cy.login()

        cy.contains('Isso é Mouseover!').should('not.exist')
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!').should('exist')

    })
})