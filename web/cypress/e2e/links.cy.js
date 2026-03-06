describe('Links abrindo nova guia/janela', () => {

    it('Validando o atributo link no navegador', () => {

        cy.login()

        cy.get('[data-cy="instagram-link"]')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
            .and('have.attr', 'target', '_blank')
    })

    it('Validando link termos de uso , removendo o target', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.goTo('Formulários', 'Consultoria')

        cy.contains('a', 'termos de uso')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('h1', 'Termos de Uso')
            .should('have.text', 'Termos de Uso', 'be.visible')


    })
})