export const getResponseHeaders = (response: Response) => {
	const headersObj: any = {}
	response.headers.forEach((v, k) => (headersObj[k] = v))
	return headersObj
}
