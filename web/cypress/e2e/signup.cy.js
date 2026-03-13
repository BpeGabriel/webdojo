describe('Cadastrar usuário', () => {

    beforeEach(() => {
        cy.start()
           
           cy.intercept('POST', 'http://localhost:3333/api/users/register', {
             statusCode:201 ,
            body: {
                message: 'Usuário cadastrado com Sucesso'
            }
        }).as('postSignup')

        
    })

    it('deve cadastrar um novo usuário', () => {
        cy.get('a[href="/register"]').click()

        cy.contains('h2', 'Crie sua conta')
            .should('be.visible')

        cy.get('#name')
            .type('Barbosa Pereira')
        
        cy.get('#email')
            .type('bpegabriel611@gmail.com')

        cy.get('#password')
            .type('Espiao00!')

        cy.contains('button', 'Criar conta')
            .click()

        cy.wait('@postSignup')

        cy.contains('Conta criada com sucesso!')
            .should('be.visible')
    })

})