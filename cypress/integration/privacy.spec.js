
    ///AULA 07 - Exerc Extra 02 Desafio
    it('Testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    });
