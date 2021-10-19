import { useEffect, useState } from 'react'
import { meRequest } from '../utils/meRequest'
import { refreshRequest } from '../utils/refreshRequest'

export const useAuth = (user: any, setUser: any) => {
	const [fetching, setFetching] = useState(true)

	useEffect(() => {
		if (!user?.id) {
			refreshRequest()
				.then(u => setUser(u || null))
				.catch(() => setUser(null))
				.finally(() => setFetching(false))
		} else {
			meRequest()
				.then(u => {
					if (!u) {
						return refreshRequest()
							.then(me => setUser(me || null))
							.catch(() => setUser(null))
					}

					if (user?.id !== u.id) return setUser(null)
					setUser(u)
				})
				.finally(() => setFetching(false))
		}
	}, [setUser, user?.id])

	return fetching
}
