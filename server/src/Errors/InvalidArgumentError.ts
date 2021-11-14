export default class InvalidArgumentError extends Error {
	constructor(message: string) {
		super()
		this.name = 'InvalidArgumentError'
		this.message = message
	}
}
