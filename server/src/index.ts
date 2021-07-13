import express, { Application } from 'express'
import dotenv from 'dotenv'
import { join } from 'path'
import routes from './routes'
import { sequelize } from './models'
import cors from 'cors'

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

app.use((_err: any, _req: any, res: any, _next: any) => res.end())

app.listen(process.env.PORT, () =>
	console.log('API iniciada', process.env.PORT)
)

export { app, sequelize }
