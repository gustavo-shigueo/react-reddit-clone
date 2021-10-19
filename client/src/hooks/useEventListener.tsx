import { useEffect, useRef } from 'react'

export const useEventListener = (
	eventType: string,
	callback: (e?: any) => any,
	element: any
): void => {
	const callbackRef = useRef(callback)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	useEffect(() => {
		const handler: EventListenerOrEventListenerObject = (e: any) =>
			callbackRef.current(e)
		element?.addEventListener(eventType, handler)

		return () => element?.removeEventListener(eventType, handler)
	}, [eventType, element])
}
