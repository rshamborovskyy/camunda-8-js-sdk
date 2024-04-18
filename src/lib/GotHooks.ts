import { HTTPError } from 'got'

export const gotErrorHandler = (options, next) => {
	if (Object.isFrozen(options.context)) {
		options.context = { ...options.context }
	}
	Error.captureStackTrace(options.context)

	return next(options)
}

export const gotBeforeErrorHook = (error) => {
	const { request } = error
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	;(error as any).source = (error as any).options.context.stack.split('\n')
	error.message += ` (request to ${request?.options.url.href})`
	if (error instanceof HTTPError) {
		try {
			const details = JSON.parse((error.response?.body as string) || '{}')
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			;(error as any).statusCode = details.status
		} catch {
			return error
		}
	}
	return error
}
