Cypress.Commands.add('fillConsultancyForm', (form) => {
    cy.get('#name').type(form.name)

    cy.get('input[placeholder="Digite seu email"]').type(form.email)

    cy.get('input[placeholder= "(00) 00000-0000"')
        .type(form.phone)
        .should('have.value', '(81) 99886-3511')

    cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select(form.consultancytype)

    if (form.persontype === 'Pessoa Jurídica') {

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
            .type(form.document)
            .should('have.value', '11.222.333/4444-00')

    }
    if (form.persontype === 'Pessoa Física') {
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .check()

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF')
            .should('be.visible')
            .parent()
            .find('input')
            .type(form.document)
            .should('have.value', '036.077.194-70')
    }



    form.DiscoveryChannels.forEach((chanel) => {
        cy.contains('label', chanel)
            .find('input')
            .check()
            .should('be.checked')
    })


    cy.get('input[type="file"]')
        .selectFile(form.file, { force: true })

    cy.get('textarea[placeholder = "Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)


    form.Techs.forEach((tech) => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech)
            .type('{enter}')

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')
    })

    if (form.terms === true) {
        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
    }
})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains('button', 'Enviar formulário').click()
})

Cypress.Commands.add('validateConsultancyModal', () => {
    cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-header')
        .should('be.visible')
        .and('have.text', 'Sucesso!')
    cy.contains('button', 'Fechar').click()
    cy.contains('h1', 'Consultoria').should('be.visible')
})
