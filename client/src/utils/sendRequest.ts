import { RequestParams } from '../interfaces/requestInterface'
import { getAccessToken } from './acessToken'
import { refreshRequest } from './refreshRequest'

export const sendRequest = async ({
	method = 'GET',
	path = '/',
	body,
	auth = false,
}: RequestParams) => {
	// Ensures the user's request isn't blocked due to expired session
	if (auth) await refreshRequest()

	const headers: HeadersInit = { 'Content-Type': 'application/json' }
	if (auth) headers['Authorization'] = getAccessToken()

	const url = `http://localhost:3001${path}`

	const options: RequestInit = {
		credentials: 'include',
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	}

	return fetch(url, options)
}
