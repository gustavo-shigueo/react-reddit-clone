import express, { Application } from 'express'
import dotenv from 'dotenv'
import { join } from 'path'
import routes from './routes'
import { sequelize } from './models'
import cors from 'cors'
import InvalidArgumentError from './Errors/InvalidArgumentError'
import ArgumentNotProvidedError from './Errors/ArgumentNotProvidedError'
import NotFoundError from './Errors/NotFoundError'
import TokenError from './Errors/TokenError'
import NotAuthorizedError from './Errors/NotAuthorized'
import InvalidCredentialsError from './Errors/InvalidCredentialsError'
import { UniqueConstraintError } from 'sequelize'

dotenv.config({
	path: join(__dirname, '../.env'),
})

const app: Application = express()
app.use(express.json())

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
		methods: 'POST, GET, PUT, PATCH, DELETE, OPTIONS',
		allowedHeaders: 'Content-Type, Authorization',
		maxAge: 1000 * 60 * 60 * 24 * 7,
		exposedHeaders: 'Authorization',
	})
)

// sequelize
// 	.sync({ force: true })
// 	.then((_: any) => _)
// 	.catch(console.log)

routes(app)

app.use((err: Error, _req: any, res: any, _next: any) => {
	let status = 500
	let { message } = err

	if (err instanceof UniqueConstraintError) {
		message = err.errors[0].message.replace(
			'must be unique',
			'is already taken'
		)
		status = 400
	}
	if (err instanceof InvalidArgumentError) status = 400
	if (err instanceof ArgumentNotProvidedError) status = 400
	if (err instanceof NotAuthorizedError) status = 401
	if (err instanceof InvalidCredentialsError) status = 401
	if (err instanceof TokenError) status = 401
	if (err instanceof NotFoundError) status = 404

	res.status(status).send({ message })
})

app.listen(process.env.PORT, () =>
	console.log('API iniciada', process.env.PORT)
)

export { app, sequelize }
