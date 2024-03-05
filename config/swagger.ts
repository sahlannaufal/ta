import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'

export default {
	uiEnabled: true, //disable or enable swaggerUi route
	uiUrl: 'api-docs', // url path to swaggerUI
	specEnabled: true, //disable or enable swagger.json route
	specUrl: '/swagger.json',

	middleware: [], // middlewares array, for protect your swagger docs and spec endpoints

	options: {
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'Application with swagger docs',
				version: '1.0.0',
				description: 'My application with swagger docs',
		},
		paths: {},
		components: {
			securitySchemes: {
				bearerAuth: {
					type:'apiKey',
					name: 'Authorization',
					in: 'header',
					description: 'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345"',
				},
			},
		},
		 tags:[],
	},

		apis: ['docs/**/*.yaml'],
		basePath: '/',
	},
	mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  specFilePath: 'docs/swagger.json'
} as SwaggerConfig
