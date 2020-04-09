class AppError extends Error {
  constructor(errorCode, message) {
    super(message);
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.code = errorCode;
  }
}

module.exports = AppError;