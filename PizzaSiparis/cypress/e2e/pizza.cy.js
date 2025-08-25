describe('Pizza Sipariş - IT1 akışları', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173/')
	})

	it('inputa bir metin girer (isim)', () => {
		cy.contains('ACIKTIM').click()
		cy.get('input#name').type('Emina')
		cy.get('input#name').should('have.value', 'Emina')
	})

	it('birden fazla malzeme seçilebilir', () => {
		cy.contains('ACIKTIM').click()
		cy.contains('Ek Malzemeler').parent().find('input[type="checkbox"]').as('checks')
		cy.get('@checks').eq(0).check().should('be.checked')
		cy.get('@checks').eq(1).check().should('be.checked')
		cy.get('@checks').eq(2).check().should('be.checked')
		cy.get('@checks').eq(3).check().should('be.checked')
	})

	it('formu gönderir', () => {
		cy.contains('ACIKTIM').click()
		cy.get('input#name').type('Emina')
		cy.get('input[type="radio"][value="M"]').check()
		cy.contains('Ek Malzemeler').parent().find('input[type="checkbox"]').then(($checks) => {
			for (let i = 0; i < 4; i++) {
				cy.wrap($checks[i]).check()
			}
		})
		cy.contains('button', 'Siparişi Ver').should('not.be.disabled').click()
		cy.url().should('include', '/success')
		cy.contains('Sipariş Onayı')
	})
}) 