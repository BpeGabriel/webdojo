describe('Login',()=>{
  
  it('Deve logar com sucesso',()=> {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com','katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

  })

      it('Nao deve logar com senha errada',()=> {

    cy.start()
    cy.submitLoginForm('papito@webdojo.com','katana1233')

      cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

  it('Nao deve logar com email não cadastrado',()=> {
    cy.start()
    cy.submitLoginForm('papito@webdosjo.com','katana123')
      cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

})