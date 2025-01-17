import { restoreZeebeLogging, suppressZeebeLogging } from '../../../lib'
import { ZeebeGrpcClient } from '../../../zeebe'

jest.setTimeout(30000)

beforeAll(() => suppressZeebeLogging())
afterAll(() => restoreZeebeLogging())

test('Does not call the onReady handler if there is no broker', (done) => {
	let called = false
	const zbc2 = new ZeebeGrpcClient({
		config: { ZEEBE_ADDRESS: 'localtoast: 267890' },
	}).on('ready', () => {
		called = true
	}) // Broker doesn't exist!!!
	setTimeout(async () => {
		expect(called).toBe(false)
		await zbc2.close()
		done(null)
	}, 4000)
})

test('Does call the onReady handler if there is a broker and eagerConnection is true', (done) => {
	let called = 0
	const zbc2 = new ZeebeGrpcClient({
		config: { zeebeGrpcSettings: { ZEEBE_GRPC_CLIENT_EAGER_CONNECT: true } },
	}).on('ready', () => {
		called++
	})

	setTimeout(async () => {
		expect(called).toBe(1)
		await zbc2.close()
		done()
	}, 6000)
})

test('Does set connected to true if there is a broker', (done) => {
	const zbc2 = new ZeebeGrpcClient({
		config: { zeebeGrpcSettings: { ZEEBE_GRPC_CLIENT_EAGER_CONNECT: true } },
	})

	setTimeout(async () => {
		expect(zbc2.connected).toBe(true)
		await zbc2.close()
		done()
	}, 6000)
})

test('Does emit the ready event if there is a broker and eagerConnection: true', (done) => {
	let called = 0
	const zbc2 = new ZeebeGrpcClient({
		config: { zeebeGrpcSettings: { ZEEBE_GRPC_CLIENT_EAGER_CONNECT: true } },
	}).on('ready', () => {
		called++
	})

	setTimeout(async () => {
		expect(called).toBe(1)
		expect(zbc2.connected).toBe(true)
		await zbc2.close()
		done()
	}, 6000)
})
