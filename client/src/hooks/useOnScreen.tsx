import { MutableRefObject, useEffect, useState } from 'react'

export const useOnScreen = (
	ref: MutableRefObject<Element | null | undefined>,
	rootMargin = '0px'
): boolean => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		if (ref.current == null) return

		const element = ref.current

		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(entry.isIntersecting),
			{ rootMargin }
		)

		observer.observe(element)

		return () => {
			if (element == null) return
			observer.unobserve(element)
		}
	}, [ref, rootMargin])

	return isVisible
}
