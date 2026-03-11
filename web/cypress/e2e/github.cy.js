
describe('Pagina tabela', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })



    it('deve adicionar perfil do github e verificar se foi adicionado', () => {

        cy.insertGithubData()
        cy.submiteAddProfile()

        cy.contains('table tbody tr', 'BpeGabriel')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('Gabriel Barbosa')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('QA Enginer')
            .should('be.visible')

    })

    it('Deve poder remover um perfil do github', () => {

        cy.insertGithubData()
        cy.submiteAddProfile()

        cy.contains('table tbody tr', 'BpeGabriel')
            .should('be.visible')
            .find('button[title= "Remover perfil"]')
            .click()

        cy.contains('table tbody', 'BpeGabriel')
            .should('not.exist')
    })

    it('Deve abrir um link externo para o github', () => {
        cy.insertGithubData()
        cy.submiteAddProfile()

        cy.contains('table tbody tr', 'BpeGabriel')
            .should('be.visible')
            .as('trProfile')

            .get('@trProfile')
            .find('a[title="Abrir perfil no GitHub"]')
            .should('have.attr', 'href', 'https://github.com/BpeGabriel')
            .and('have.attr', 'target', '_blank')
    })

    it('Deve mostrar campos obrigatórios', () => {

        cy.submiteAddProfile()

        const requireFiedls = [
            { label: 'Nome *', message: 'Nome é obrigatório' },
            { label: 'Username do GitHub *', message: 'Username é obrigatório' },
            { label: 'Perfil *', message: 'Perfil é obrigatório' }
        ]

        requireFiedls.forEach(({ label, message }) => {
            cy.contains('label', label)
                .parent()
                .find('p')
                .should('be.visible')
                .should('have.text', message)
                .and('have.class', 'text-red-400')
                .and('have.css', 'color', 'rgb(248, 113, 113)')
        })

    })


})