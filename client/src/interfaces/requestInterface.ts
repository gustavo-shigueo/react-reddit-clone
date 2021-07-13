export interface RequestParams {
	method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
	path: string
	body?: Object
	auth?: boolean
}
