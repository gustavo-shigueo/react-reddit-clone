import { User } from '../interfaces/userInterfaces'
import { sendRequest } from './sendRequest'

export const meRequest = async (): Promise<User | null> => {
	const response = await sendRequest({
		method: 'POST',
		path: '/me',
		auth: true,
	})

	const { user } = await response.json()

	return user
}
