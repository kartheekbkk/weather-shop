const { defineConfig } = require('cypress');

module.exports = defineConfig({
	defaultCommandTimeout: 15000,
	viewportHeight: 1080,
	viewportWidth: 1920,
	chromeWebSecurity: false,

	e2e: {
		baseUrl: 'https://weathershopper.pythonanywhere.com',
		setupNodeEvents(on, config) {
			// implement node event listeners here
		}
	}
});
