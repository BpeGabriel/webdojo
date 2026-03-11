const infoGithubProfile ={
    nome: 'Gabriel Barbosa',
    username: 'BpeGabriel',
    profile: 'QA Enginer'
}

Cypress.Commands.add('insertGithubData', ()=>{
            cy.get('#name')
            .type(infoGithubProfile.nome)

        cy.get('#username')
            .type(infoGithubProfile.username)
        
        cy.get('#profile')
            .type(infoGithubProfile.profile)
})

Cypress.Commands.add('submiteAddProfile' , ()=> {
            cy.contains('button', 'Adicionar Perfil')
            .click()
})