import { YSweetError, YSweetErrorPayload } from '@y-sweet/sdk'

function expectRoundTrip(payload: YSweetErrorPayload) {
  const message = YSweetError.getMessage(payload)
  const error = YSweetError.fromMessage(message)
  expect(error.cause).toEqual(payload)
}

test('server refused', () => {
  const payload: YSweetErrorPayload = {
    code: 'ServerRefused',
    address: '127.0.0.1',
    port: 1234,
  }

  expectRoundTrip(payload)
})

test('server error', () => {
  const payload: YSweetErrorPayload = {
    code: 'ServerError',
    status: 404,
    message: 'Not found',
  }

  expectRoundTrip(payload)
})

test('no auth provided', () => {
  const payload: YSweetErrorPayload = {
    code: 'NoAuthProvided',
  }

  expectRoundTrip(payload)
})

test('invalid auth provided', () => {
  const payload: YSweetErrorPayload = {
    code: 'InvalidAuthProvided',
  }

  expectRoundTrip(payload)
})

test('unknown', () => {
  const payload: YSweetErrorPayload = {
    code: 'Unknown',
    message: 'Something went wrong',
  }

  expectRoundTrip(payload)
})
