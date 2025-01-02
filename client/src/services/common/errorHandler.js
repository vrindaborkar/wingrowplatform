export const handleAPIError = error => {
  return {
    isError: true,
    error,
  }
}

export class APIError {
  constructor(error) {
    this.error = error
  }
}
