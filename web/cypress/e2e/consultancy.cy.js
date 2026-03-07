import {personal , company} from '../fixtures/consultancy.json'

describe('Formulário de Consultoria', () => {

    //Esse ('beforeEach()=> {}) serve para colocar uma ação antes de qualquer it, auxilia quando tem muitos teste em uma só página
    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
    })

    it('Deve solicitar consultoria In Company', ()=> {


        cy.get('#name').type(company.name)

        cy.get('input[placeholder="Digite seu email"]').type(company.email)

        cy.get('input[placeholder= "(00) 00000-0000"')
            .type(company.phone)
            .should('have.value', '(81) 99886-3511')

        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(company.consultancytype)

        if (company.persontype === 'Pessoa Jurídica') {

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .check()

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')

        }
        if (company.persontype === 'Pessoa Física') {
            cy.contains('label', 'Pessoa Física')
                .find('input')
                .check()

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }


        cy.contains('label', 'CNPJ')
            .should('be.visible')
            .parent()
            .find('input')
            .type(company.document)
            .should('have.value', '11.222.333/4444-00')


        company.DiscoveryChannels.forEach((chanel) => {
            cy.contains('label', chanel)
                .find('input')
                .check()
                .should('be.checked')
        })


        cy.get('input[type="file"]')
            .selectFile(company.file, { force: true })

        cy.get('textarea[placeholder = "Descreva mais detalhes sobre sua necessidade"]')
            .type(company.description)


        company.Techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        if (company.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }


        cy.contains('button', 'Enviar formulário').click()

        cy.get('.modal', { timeout: 7000 })
            .should('be.visible')
            .find('.modal-header')
            .should('be.visible')
            .and('have.text', 'Sucesso!')


        cy.contains('button', 'Fechar').click()

        cy.contains('h1', 'Consultoria').should('be.visible')

    })


    it('Deve solicitar consultoria individual', ()=>{

        cy.get('#name').type(personal.name)

        cy.get('input[placeholder="Digite seu email"]').type(personal.email)

        cy.get('input[placeholder= "(00) 00000-0000"')
            .type(personal.phone)
            .should('have.value', '(81) 99886-3511')

        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(personal.consultancytype)

        if (personal.persontype === 'Pessoa Jurídica') {

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .check()

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')

        }
        if (personal.persontype === 'Pessoa Física') {
            cy.contains('label', 'Pessoa Física')
                .find('input')
                .check()

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }


        cy.contains('label', 'CPF')
            .should('be.visible')
            .parent()
            .find('input')
            .type(personal.document)
            .should('have.value', '036.077.194-70')


        personal.DiscoveryChannels.forEach((chanel) => {
            cy.contains('label', chanel)
                .find('input')
                .check()
                .should('be.checked')
        })


        cy.get('input[type="file"]')
            .selectFile(personal.file, { force: true })

        cy.get('textarea[placeholder = "Descreva mais detalhes sobre sua necessidade"]')
            .type(personal.description)


        personal.Techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        if (personal.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }


        cy.contains('button', 'Enviar formulário').click()

        cy.get('.modal', { timeout: 7000 })
            .should('be.visible')
            .find('.modal-header')
            .should('be.visible')
            .and('have.text', 'Sucesso!')


        cy.contains('button', 'Fechar').click()

        cy.contains('h1', 'Consultoria').should('be.visible')

    })

    it('Deve mostrar campos obrigatórios', () => {

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
