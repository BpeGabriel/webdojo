describe('POST /api/users/register', () => {
  
  
  it('Deve cadastrar um novo usuário', () => {

    const user = {
      name : 'teste',
      email : 'testeemail@gmail.com',
      password : 'senhatest'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response)=>{
      expect(response.status).to.eq(201)
      expect(response.body.message).to.equal('User successfully registered.')
      expect(response.body.user.id).to.match(/^[-]?\d+$/)
      expect(response.body.user.name).to.eql(user.name)
      expect(response.body.user.email).to.eql(user.email)
    })
  })

    it('não deve cadastrar com email duplicado', () => {

    const user = {
      name : 'Teste2',
      email :'teste2@gmail.com',
      password : 'senhatest'
    }

     cy.task('deleteUser', user.email)
     
    cy.postUser(user).then((response)=>{
      expect(response.status).to.eq(201)
    })

      cy.postUser(user).then((response)=>{
      expect(response.status).to.eq(409)
      expect(response.body.error).to.eq('Email address already exists.')
    })

  })

  it('O campo name deve ser obrigatorio', ()=>{

    const user = {
      email: 'testando@gmail.com',
      password: 'testepassw'
    }

    cy.postUser(user).then((response)=>{
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('The "name" field is required.')
    })

  })

    it('O campo email deve ser obrigatorio', ()=>{

    const user = {
      name: 'nome teste',
      password: 'testepassw'
    }

    cy.postUser(user).then((response)=>{
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('The "email" field is required.')
    })

  })

  it('O campo password deve ser obrigatorio', ()=>{

    const user = {
      name: 'nome teste',
      email:'emailteste@gmail.com'
    }

    cy.postUser(user).then((response)=>{
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('The "password" field is required.')
    })

  })

    it('Não deve passar quando o JSON estiver mal formatado', ()=>{

    const user = `{
      name: 'nome teste',
      email:'emailteste@gmail.com'
      password: '123'
    }`

    cy.postUser(user).then((response)=>{
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eql('Invalid Json Format')
    })

  })
})

