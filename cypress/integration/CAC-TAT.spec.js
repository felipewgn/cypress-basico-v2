/// <reference types="Cypress"/>

///AULA 01 - EXERC 01
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    });

    it('Verifica o título da aplicação', function() {
        cy.title().should('eq','Central de Atendimento ao Cliente TAT')
    })

    ///AULA 02 - EXERC 01
    it('Preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('input[id=firstName]').type('Felipe')
        cy.get('input[id=lastName]').type('Wagner')
        cy.get('input[id=email]').type('felipe.wagner@gft.com')
        cy.get('textarea[id=open-text-area]').type('Exercicio Aula 02 de Cypress',{delay: 20}) ///AULA 02 - Exerc Extra 01 - DELAY
        cy.contains('button', 'Enviar').click()
        cy.get('span[class=success]').should('be.visible')        
    });

    ///AULA 02 - Exerc Extra 02 - Msg de Erro
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('input[id=firstName]').type('Felipe')
        cy.get('input[id=lastName]').type('Wagner')
        cy.get('input[id=email]').type('felipe.wagner#gft.com')
        cy.get('textarea[id=open-text-area]').type('Exercicio Aula 02 de Cypress')
        cy.contains('button', 'Enviar').click()
        cy.get('span[class=error]').should('be.visible')
    });

    ///AULA 02 - Exerc Extra 03
    it('Campo telefone não aceita caracteres não numericos', function() {
        cy.get('input[id=phone]')
            .type('teste')
            .should('have.value','')        
    });

    ///AULA 02 - Exerc Extra 04
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('input[id=firstName]').type('Felipe')
        cy.get('input[id=lastName]').type('Wagner')
        cy.get('input[id=email]').type('felipe.wagner#gft.com')       
        cy.get('textarea[id=open-text-area]').type('Exercicio Aula 02 de Cypress')
        cy.get('input[id=phone-checkbox]').check()
        cy.contains('button', 'Enviar').click()
        cy.get('span[class=error]').should('be.visible')        
    });

    ///AULA 02 - Exerc Extra 05
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('input[id=firstName]')
            .type('Felipe')
            .should('have.value', 'Felipe')
            .clear()
            .should('have.value','')
        cy.get('input[id=lastName]')
            .type('Wagner')
            .should('have.value', 'Wagner')
            .clear()
            .should('have.value','')
        cy.get('input[id=email]')
            .type('felipe.wagner#gft.com')
            .should('have.value', 'felipe.wagner#gft.com')
            .clear()
            .should('have.value','')
        cy.get('input[id=phone]')
            .type('997690107')
            .should('have.value', '997690107')
            .clear()
            .should('have.value','')
    });

    ///AULA 02 - Exerc Extra 06
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {        
        cy.contains('button', 'Enviar').click()
        cy.get('span[class=error]').should('be.visible')
    });

    ///AULA 02 - Exerc Extra 07
    it('Envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()        
        cy.get('span[class=success]').should('be.visible')        
    });

    ///AULA 03 - Exerc 01
    it('Seleciona um produto (YouTube) por seu texto', () => {
        cy.get('select[id=product]')
            .select('YouTube')
            .should('have.value', 'youtube')        
    });

    ///AULA 03 - Exerc extra 01
    it('Seleciona um produto (Mentoria) por seu valor (value)', () => {        
        cy.get('select[id=product]')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });

    ///AULA 03 - Exerc extra 02
    it('Seleciona um produto (Blog) por seu índice', () => {
        cy.get('select[id=product]')
            .select(1)
            .should('have.value', 'blog')        
    });

    ///AULA 04 - Exerc 01
    it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type=radio]').check('feedback')
            .should('be.checked')
            .and('have.value','feedback')
        
        ///resolução
        cy.get('input[type=radio][value=feedback]')
            .check()
            .should('have.value','feedback')
    });

    ///AULA 04 Exerc extra
    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type=radio]')
            .should('have.length',3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            
          

        })        
    });

    ///AULA 05
    it('Marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type=checkbox')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        
    });

    ///AULA 06
    it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
        
    });

    ///AULA 06 - Exerc Extra 01
    it('Seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
        
    });

    ///AULA 06 - Exerc Extra 02
    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json', { encoding: null },).as('exampleFile')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@exampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
        
    });

    ///AULA 07 Exerc
    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    });

    ///AULA 07 - Exerc Extra 01
    it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()
        cy.url().should('include', 'privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    });

})

