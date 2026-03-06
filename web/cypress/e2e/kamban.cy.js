describe('Kanban board', () => {

    it('Deve mover uma tarefa de to do para done e atualizar o board', () => {

        cy.login()

        cy.wait(1000)

        cy.goTo('Kanban', 'Kanban Board')


        const dataTransfer = new DataTransfer()

        cy.contains('div[draggable="true"]', 'Criar testes E2E')
            .trigger('dragstart', { dataTransfer })

        cy.wait(2000)

        cy.get('.column-done')
            .trigger('drop', { dataTransfer })
            .find('h3')
            .should('have.text', 'Done (4)')

        cy.get('.column-done')
            .should('include.text', 'Criar testes E2E')



        cy.contains('div[draggable="true"]', 'Documentar API')
            .trigger('dragstart', { dataTransfer })

        cy.wait(2000)

        cy.get('.column-done')
            .trigger('drop', { dataTransfer })
            .find('h3')
            .should('have.text', 'Done (5)')

        cy.get('.column-done')
            .should('include.text', 'Documentar API')

        cy.contains('div[draggable="true"]', 'Otimizar performance')
            .trigger('dragstart', { dataTransfer })

        cy.wait(2000)

        cy.get('.column-todo')
            .trigger('drop', { dataTransfer })
            .find('h3')
            .should('have.text', 'To Do (3)')

        cy.get('.column-todo')
            .should('include.text', 'Otimizar performance')

    })



})