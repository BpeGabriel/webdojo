import address from '../fixtures/cep.json'

describe('Validações de CEP ', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Integração', 'Consulta de CEP')
    })

    it('Deve inserir e consultar as informações do cep', () => {

        cy.get('#cep')
            .type(address.cep)

        cy.contains('button', 'Buscar')
            .click()

        cy.get('#street')
            .should('have.value', address.street)

        cy.get('#neighborhood')
            .should('have.value', address.neighborhood)

        cy.get('#city')
            .should('have.value', address.city)

        cy.get('#state')
            .should('have.value', address.state)
    })


    it('Deve aparecer um alert informando cep invalido', () => {
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('CEP inválido')
        })

        cy.contains('button', 'Buscar')
            .click()

    })

    it('Deve aparecer um alert para cep não encontrado', () =>{
              cy.get('#cep')
            .type('00000000')

            cy.on('window:alert', (msg) => {
            expect(msg).to.equal('CEP não encontrado')
        })

         cy.contains('button', 'Buscar')
            .click()
    })

})