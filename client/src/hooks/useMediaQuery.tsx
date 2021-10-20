import { useEffect, useState } from 'react'
import { useEventListener } from './useEventListener'

export const useMediaQuery = (mediaQuery: string) => {
	const [isMatch, setIsMatch] = useState(false)
	const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(
		null
	)

	useEffect(() => {
		const list = window.matchMedia(mediaQuery)
		setMediaQueryList(list)
		setIsMatch(list.matches)
	}, [mediaQuery])

	useEventListener('change', e => setIsMatch(e.matches), mediaQueryList)

	return isMatch
}
