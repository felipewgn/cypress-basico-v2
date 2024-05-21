// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

///AULA 02 - Exerc Extra 7
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('input[id=firstName]').type('Felipe')
    cy.get('input[id=lastName]').type('Wagner')
    cy.get('input[id=email]').type('felipe.wagner@gft.com')
    cy.get('textarea[id=open-text-area]').type('Exercicio Aula 02 de Cypress')

    ///Exerc Extra 8 - trocar get por contains
    cy.contains('button', 'Enviar')
        .click()
})
