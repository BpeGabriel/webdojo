describe('Login', () => {

function getTodayDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}


  it('Deve logar com sucesso', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.getCookie('login_date')
      .should('exist')

    cy.getCookie('login_date')
      .should((cookie)=> {
        expect(cookie.value).to.eq(getTodayDate())
      })

      cy.window().then((win)=>{

        const token = win.localStorage.getItem('token')
        
        expect(token).to.match(/^[a-fA-F0-9]{32}$/)
      })
  })

  it('Nao deve logar com senha errada', () => {

    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana1233')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

  it('Nao deve logar com email não cadastrado', () => {
    cy.start()
    cy.submitLoginForm('papito@webdosjo.com', 'katana123')
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

})