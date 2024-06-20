export const handleAPIError = (error) => {
  return {
    isError: true,
    error,
  };
};

export function APIError(error) {
  this.error = error;
}
