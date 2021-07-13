import { Application } from 'express'
import { router as userRoutes } from './userRoutes'
import { router as postRoutes } from './postRoutes'

const routes = (app: Application) => {
	app.use(userRoutes, postRoutes)
}

export default routes
