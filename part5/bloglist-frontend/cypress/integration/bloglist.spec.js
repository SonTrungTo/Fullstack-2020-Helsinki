describe('Bloglist app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user1 = {
            username: 'tos1',
            name: 'Son To',
            password: 'darkness'
        };
        const user2 = {
            username: 'samurai',
            name: 'Jin Sakai',
            password: 'kickass'
        };
        cy.request('POST', 'http://localhost:3003/api/users', user1);
        cy.request('POST', 'http://localhost:3003/api/users', user2);
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

        describe('When additional blogs are created', function () {
           beforeEach(function () {
               cy.createBlog({ title: 'Blog1', url: 'url1' });
               cy.createBlog({ title: 'Blog2', url: 'url2' });
               cy.createBlog({ title: 'Blog3', url: 'url3' });
           });

           it('a user can like a blog', function () {
               cy.contains('Blog1').as('Blog1');
               cy.get('@Blog1').contains('show').click();
               cy.get('@Blog1').contains('likes 0');
               cy.get('@Blog1').get('#likeButton').click();
               cy.get('@Blog1').contains('likes 1');
           });

           it('a user can delete his blog', function () {
              cy.contains('Blog1').as('Blog1');
              cy.get('@Blog1').contains('show').click();
              cy.get('@Blog1').contains('remove').click();
              cy.get('#blogList').should('not.contain', 'Blog1');

              cy.get('#notification').should('have.class', 'success')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
                .and('contain', 'Blog1 by undefined removed');
           });

           it('another user cannot delete his blog', function () {
              cy.login({ username: 'samurai', password: 'kickass' });
              cy.contains('Blog1').as('Blog1');
              cy.get('@Blog1').contains('show').click();
              cy.get('@Blog1').should('not.contain', 'remove');
           });

           it('likes are sorted in descending order', function () {
               cy.get('.blogContent').then(blogs => {
                    cy.wrap(blogs[0]).contains('show').click();
                    cy.wrap(blogs[1]).contains('show').click();
                    cy.wrap(blogs[2]).contains('show').click();

                    cy.wrap(blogs[0]).contains('like').click();
                    cy.wrap(blogs[1]).contains('like').click();
                    cy.wrap(blogs[1]).contains('like').click();
                    cy.wrap(blogs[1]).contains('like').click();
                    cy.wrap(blogs[2]).contains('like').click();
                    cy.wrap(blogs[2]).contains('like').click();
               });
               cy.visit('http://localhost:3000');
               cy.get('.blogContent').then(blogs => {
                    cy.wrap(blogs[0]).should('contain', 'Blog2');
                    cy.wrap(blogs[1]).should('contain', 'Blog3');
                    cy.wrap(blogs[2]).should('contain', 'Blog1');
               });
           });
        });
    });
});