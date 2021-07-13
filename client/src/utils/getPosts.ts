import { PostResponse } from '../interfaces/postInterface'
import { sendRequest } from './sendRequest'

export const postsRequest = async (cursor?: any): Promise<PostResponse> => {
	const path = `/posts${cursor ? `?cursor=${cursor}` : ''}`
	const response = await sendRequest({ path })
	return await response.json()
}
