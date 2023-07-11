/// <reference types = "Cypress" />
/// <reference types = "cypress-iframe" />

describe('WeatherShopper Tests', () => {
	it('Should display the correct title', () => {
		cy.visit('https://weathershopper.pythonanywhere.com/');
		cy.title().should('eq', 'Current Temperature');
	});

	it('Should select the correct product based on the temperature', () => {
		cy.visit('https://weathershopper.pythonanywhere.com/');
		cy.get('#temperature').then(($temp) => {
			const temperature = parseInt($temp.text().trim());

			if (temperature < 20) {
				cy.contains('Buy moisturizers').click();
				cy.url().should('include', '/moisturizer');
			} else {
				cy.contains('Buy sunscreens').click();
				cy.url().should('include', '/sunscreen');
			}
		});
	});

	let leastPrice = Number.MAX_SAFE_INTEGER;
	let leastIndex = -1;
	it('Should add moisturizers to the cart', () => {
		cy.visit('https://weathershopper.pythonanywhere.com/moisturizer', { failOnStatusCode: false });
		cy.get('img + p + p')
			.each(($el, index, $list) => {
				let price = $el.text().replace(/\D/g, '');
				price = parseInt(price);
				const prodName = $el.prev().text();
				cy.log(prodName);
				if (price < leastPrice && prodName.toLocaleLowerCase().includes('aloe')) {
					leastPrice = price;
					leastIndex = index;
				}
			})
			.then(() => {
				cy.wrap({ leastPrice, leastIndex }).as('updatedValues');
			});
		cy.get('@updatedValues').then((values) => {
			const { leastPrice, leastIndex } = values;
			cy.get('img + p + p + button').eq(leastIndex).click();
		});
		cy.get('img + p + p')
			.each(($el, index, $list) => {
				let price = $el.text().replace(/\D/g, '');
				price = parseInt(price);
				const prodName = $el.prev().text();
				cy.log(prodName);
				if (price < leastPrice && prodName.toLocaleLowerCase().includes('almond')) {
					leastPrice = price;
					leastIndex = index;
				}
			})
			.then(() => {
				cy.wrap({ leastPrice, leastIndex }).as('updatedValues');
			});
		cy.get('@updatedValues').then((values) => {
			const { leastPrice, leastIndex } = values;
			cy.get('img + p + p + button').eq(leastIndex).click();
		});
		let total = 0;
		cy.get('#cart').click();
		cy.findByRole('heading', { name: 'Checkout' }).should('be.visible');
		cy.get('tbody tr td:nth-child(2)').then(($prices) => {
			cy.wrap($prices).should('have.length.greaterThan', 0);
			let totalPrice = 0;
			cy.wrap($prices)
				.each(($price, index, $list) => {
					totalPrice += parseInt($price.text());
				})
				.then(() => {
					cy.wrap({ totalPrice }).as('totalPrice');
				});
			cy.get('@totalPrice').then((value) => {
				cy.log(value);
				const { totalPrice } = value;
				cy.get('#total').should('contain.text', totalPrice);
			});
		});

		// cy.intercept('POST', 'https://m.stripe.com/*').as('stripe6');
		// cy.intercept('GET', 'https://checkout.stripe.com/v3/data/binRanges/ranges.json?crossDomain=true').as('checkoutApi');
		// cy.intercept('POST', 'https://r.stripe.com/*').as('stripe0');

		// cy.findByRole('button', { name: 'Pay with Card' }).click();
		// cy.wait('@stripe6').its('response.statusCode').should('eq', 200);
		// cy.wait('@checkoutApi').its('response.statusCode').should('eq', 200);
		// cy.wait('@stripe0').its('response.statusCode').should('eq', 200);
		// cy.origin('stripe.com', () => {
		// 	cy.get('#email');
		// });

		// cy.frameLoaded('[name="stripe_checkout_app"]');
		// cy.iframe().find('#email').type('test@test.com');
	});
	let leastPrice1 = Number.MAX_SAFE_INTEGER;
	let leastIndex1 = -1;
	it('Should add sunscreens to the cart', () => {
		cy.visit('https://weathershopper.pythonanywhere.com/sunscreen', { failOnStatusCode: false });
		// cy.pause();
		cy.get('img + p + p')
			.each(($el, index, $list) => {
				let price = $el.text().replace(/\D/g, '');
				price = parseInt(price);
				const prodName = $el.prev().text();
				cy.log(prodName);
				if (price < leastPrice1 && prodName.toLocaleLowerCase().includes('50')) {
					leastPrice1 = price;
					leastIndex1 = index;
				}
			})
			.then(() => {
				cy.wrap({ leastPrice1, leastIndex1 }).as('updatedValues1');
			});
		cy.get('@updatedValues1').then((values) => {
			const { leastPrice1, leastIndex1 } = values;
			cy.get('img + p + p + button').eq(leastIndex1).click();
		});
		cy.get('img + p + p')
			.each(($el, index, $list) => {
				let price = $el.text().replace(/\D/g, '');
				price = parseInt(price);
				const prodName = $el.prev().text();
				cy.log(prodName);
				if (price < leastPrice1 && prodName.toLocaleLowerCase().includes('30')) {
					leastPrice1 = price;
					leastIndex1 = index;
				}
			})
			.then(() => {
				cy.wrap({ leastPrice1, leastIndex1 }).as('updatedValues1');
			});
		cy.get('@updatedValues1').then((values) => {
			const { leastPrice1, leastIndex1 } = values;
			cy.get('img + p + p + button').eq(leastIndex1).click();
		});
		let total = 0;
		cy.get('#cart').click();
		cy.findByRole('heading', { name: 'Checkout' }).should('be.visible');
		cy.get('tbody tr td:nth-child(2)').then(($prices) => {
			cy.wrap($prices).should('have.length.greaterThan', 0);
			let totalPrice = 0;
			cy.wrap($prices)
				.each(($price, index, $list) => {
					totalPrice += parseInt($price.text());
				})
				.then(() => {
					cy.wrap({ totalPrice }).as('totalPrice');
				});
			cy.get('@totalPrice').then((value) => {
				cy.log(value);
				const { totalPrice } = value;
				cy.get('#total').should('contain.text', totalPrice);
			});
		});

		// cy.intercept('POST', 'https://m.stripe.com/*').as('stripe6');
		// cy.intercept('GET', 'https://checkout.stripe.com/v3/data/binRanges/ranges.json?crossDomain=true').as('checkoutApi');
		// cy.intercept('POST', 'https://r.stripe.com/*').as('stripe0');

		// cy.findByRole('button', { name: 'Pay with Card' }).click();
		// cy.wait('@stripe6').its('response.statusCode').should('eq', 200);
		// cy.wait('@checkoutApi').its('response.statusCode').should('eq', 200);
		// cy.wait('@stripe0').its('response.statusCode').should('eq', 200);
		// cy.origin('stripe.com', () => {
		// 	cy.get('#email');
		// });

		// cy.frameLoaded('[name="stripe_checkout_app"]');
		// cy.iframe().find('#email').type('test@test.com');
	});
});
