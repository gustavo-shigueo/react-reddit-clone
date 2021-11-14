export default class NotFoundError extends Error {
	constructor(item: string) {
		super()
		this.name = 'NotFoundError'
		this.message = `${item} not found`
	}
}
