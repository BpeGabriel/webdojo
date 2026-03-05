describe('Formulário de Consultoria', () => {

    it('Deve solicitar consultoria individual', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')

        cy.get('#name').type('Gabriel Barbosa')

        cy.get('input[placeholder="Digite seu email"]').type('teste@gmail.com')

        cy.get('input[placeholder= "(00) 00000-0000"')
            .type('81998863511')
            .should('have.value', '(81) 99886-3511')

        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .check()

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CNPJ')
            .should('be.visible')
            .parent()
            .find('input')
            .type('11222333444400')
            .should('have.value', '11.222.333/4444-00')

        const DiscoveryChannels = [
            'Udemy',
            'YouTube',
            'LinkedIn',
            'Instagram',
            'Indicação de Amigo'
        ]

        DiscoveryChannels.forEach((chanel) => {
            cy.contains('label', chanel)
                .find('input')
                .check()
                .should('be.checked')
        })


        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/Download.jpg', { force: true })

        cy.get('textarea[placeholder = "Descreva mais detalhes sobre sua necessidade"]')
            .type('Necessito de uma ajuda para embarcar no ramo da automação de QA, pois estou gostando muito de estudar sobre esse assunto e irei me dedicar a aprender cada vez mais sobre , melhorando a cada dia!')

        const Techs = [
            'Cypress',
            'Html5',
            'Java Script',
            'Scrum'
        ]

        Techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()

        cy.contains('button', 'Enviar formulário').click()

       cy.get('.modal' , {timeout : 7000})
            .should('be.visible')
            .find('.modal-header')
            .should('be.visible')
            .and('have.text','Sucesso!')
       
       
            cy.contains('button', 'Fechar').click()

        cy.contains('h1', 'Consultoria').should('be.visible')

    })


    it('Deve mostrar campos obrigatórios', () => {

        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.goTo('Formulários', 'Consultoria')
        cy.contains('button', 'Enviar formulário').click()


        cy.contains('label', 'Nome Completo *')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')


        cy.contains('label', 'Email')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'termos de uso')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Você precisa aceitar os termos de uso')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

    })
})

    //it('Deve solicitar Integração', () => {
    //    cy.start()
    //  cy.submitLoginForm('papito@webdojo.com', 'katana123')
    //  cy.goTo('Integração', 'Consulta de CEP')
    //
