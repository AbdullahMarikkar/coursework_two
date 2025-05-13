function createResponse(success, data = null, error = null) {
  return {
    success,
    data,
    error,
  };
}

export default createResponse;
