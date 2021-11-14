export default class NotAuthorizedError extends Error {
	constructor() {
		super()
		this.name = 'NotAuthorizedError'
		this.message = 'Not authorized'
	}
}
