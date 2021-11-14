export default class TokenError extends Error {
	constructor() {
		super()
		this.message = 'Token is expired or invalid'
		this.name = 'TokenErrors'
	}
}
