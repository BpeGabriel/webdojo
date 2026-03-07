describe('Simulando mouse hover', () => {

    beforeEach(()=>{
        cy.login()
    })

    it('Deve mostrar o texto ao colocar o mouse em cima do texto', () => {

        

        cy.contains('Isso é Mouseover!').should('not.exist')
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!').should('exist')

    })
})
