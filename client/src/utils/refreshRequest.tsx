import { User } from '../interfaces/userInterfaces'
import { setAccessToken } from './acessToken'
import { getResponseHeaders } from './getResponseHeaders'
import { sendRequest } from './sendRequest'

export const refreshRequest = async (): Promise<User | null> => {
	const response = await sendRequest({ method: 'POST', path: '/refresh' })
	const { authorization: token } = getResponseHeaders(response)
	setAccessToken(token)
	return await response.json().catch(() => null)
}
