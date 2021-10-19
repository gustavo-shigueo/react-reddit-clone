import { RequestParams } from '../interfaces/requestInterface'
import { getAccessToken } from './acessToken'
import { refreshRequest } from './refreshRequest'

const request = (url: string, options: RequestInit): Promise<Response> => {
	const controller = new AbortController()
	setTimeout(() => controller.abort(), 5000)

	return fetch(url, { ...options, signal: controller.signal })
}

export const sendRequest = async ({
	method = 'GET',
	path = '/',
	body,
	auth = false,
}: RequestParams): Promise<Response> => {
	const headers: HeadersInit = { 'Content-Type': 'application/json' }
	if (auth) headers['Authorization'] = getAccessToken()

	const url = `http://localhost:3001${path}`

	const options: RequestInit = {
		credentials: 'include',
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	}

	const response = await request(url, options)

	if (auth && response.status === 401) {
		const user = await refreshRequest()

		if (!user) return response

		headers.Authorization = getAccessToken()
		options.headers = headers

		return request(url, options)
	}

	return response
}
