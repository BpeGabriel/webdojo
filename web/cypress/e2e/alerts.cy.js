describe('Validações de alertas JS ', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })


    it('Deve mostrar alert box', () => {

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou uma Alert Box!')
        })

        cy.contains('button', 'Mostrar Alert')
            .click()
    })

    it('Deve Confirmar um diálogo e validar a resposta positiva ', () => {

        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperta um botão!')
            return true
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm')
            .click()

    })

    it('Deve cancelar um diálogo e validar a resposta negativa ', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperta um botão!')
            return false
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm')
            .click()

    })

    it('Deve interagir com um prompt, inserir um texto e validar uma mensagem ', () => {

        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Gabriel')
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá Gabriel! Boas vindas ao WebDojo!')
        })

        cy.contains('button', 'Mostrar Prompt')
            .click()
    })

    it('Deve interagir com um prompt, mas cancelar', () => {

       cy.window().then((win) => {
            cy.stub(win, 'prompt').returns(null)
        })

        
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Ação Cancelada.')
        })

        
        cy.contains('button', 'Mostrar Prompt')
            .click()
    })
})