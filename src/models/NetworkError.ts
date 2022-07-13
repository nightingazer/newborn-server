export class NetworkError implements Error {
  readonly message: string
  readonly statusCode: number
  readonly name: string
  readonly statusText: string

  constructor(message: string, statusCode = 500, statusText = 'Internal Error') {
    this.message = message
    this.statusCode = statusCode
    this.name = `NetworkError(${statusCode})`
    this.statusText = statusText
  }
}

export class UnauthorizedError extends NetworkError {
  constructor(message: string) {
    super(message, 401, 'Unauthorized')
  }
}

export class BadRequestError extends NetworkError {
  constructor(message: string) {
    super(message, 400, 'Bad Request')
  }
}

export class NotFoundError extends NetworkError {
  constructor(message: string) {
    super(message, 404, 'Not Found')
  }
}

export class ForbiddenError extends NetworkError {
  constructor(message: string) {
    super(message, 403, 'Forbidden')
  }
}
