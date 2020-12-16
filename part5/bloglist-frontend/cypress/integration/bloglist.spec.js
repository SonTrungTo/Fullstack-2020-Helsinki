describe('Bloglist app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user = {
            username: 'tos1',
            name: 'Son To',
            password: 'darkness'
        };
        cy.request('POST', 'http://localhost:3003/api/users', user);
        cy.visit('http://localhost:3000');
    });

    it('Login form is shown', function () {
        cy.contains('log in to application');
        cy.contains('username');
        cy.contains('password');
        cy.contains('login');
    });

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('tos1');
            cy.get('#password').type('darkness');
            cy.get('#submit').click();

            cy.get('#notification').should('have.class', 'success')
              .and('have.css', 'color', 'rgb(0, 128, 0)')
              .and('contain', 'Son To logged in');
        });

        it('fails with wrong credentials', function () {
            cy.get('#username').type('tos1');
            cy.get('#password').type('secret');
            cy.get('#submit').click();

            cy.get('#notification').should('have.class', 'error')
              .and('have.css', 'color', 'rgb(255, 0, 0)')
              .and('contain', 'Wrong username/password');
        });
    });

    describe('When user logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'tos1', password: 'darkness' });
        });

        it('a blog can be created', function () {
            cy.contains('create new blog').click();
            cy.get('#title').type('Wake the fuck up, Samurai! We got a city to burn!');
            cy.get('#author').type('Keanu Reeves');
            cy.get('#url').type('https://cyperpunk2077.com');
            cy.get('#createButton').click();

            cy.get('#notification').should('have.class', 'success')
              .and('have.css', 'color', 'rgb(0, 128, 0)')
              .and('contain', 'a new blog Wake the fuck up, Samurai! We got a city to burn! by Keanu Reeves added');
            
            cy.get('#blogList')
              .should('contain', 'Wake the fuck up, Samurai! We got a city to burn! Keanu Reeves');
        });
    });
});