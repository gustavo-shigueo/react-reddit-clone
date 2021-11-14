export default class ArgumentNotProvidedError extends Error {
	constructor(argument: string) {
		super()
		this.name = 'ArgumentNotProvidedError'
		this.message = `${argument} not provided`
	}
}
