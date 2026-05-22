describe('get/api/users', () => {


    const heroes = [
        {
            name: "Tony Stark",
            email: "tony.stark@starkindustries.com",
            password: "teste123"
        },
        {
            name: "Steve Rogers",
            email: "steve.rogers@avengers.com",
            password: "teste123"
        },
        {
            name: "Natasha Romanoff",
            email: "natasha.romanoff@shield.com",
            password: "teste123"
        },
        {
            name: "Thor Odinson",
            email: "thor@asgard.com",
            password: "teste123"
        },
        {
            name: "Peter Parker",
            email: "peter.parker@dailybugle.com",
            password: "teste123"
        }
    ];

    before(() => {
        heroes.forEach((hero) => {
            cy.postUser(hero)
        })
    })

    it('Deve retornar uma lista de usuários', () => {
        cy.getUsers().then(response => {
            expect(response.status).to.eq(200)

            heroes.forEach((hero) => {
                const found = response.body.find((user) => user.email === hero.email)
                expect(found.name).to.eq(hero.name)
                expect(found.email).to.eq(hero.email)
                expect(found).to.have.property('id')
            })
        })
    })



})