interface CustomError extends Error {
  status?: number;
}

const createError = (status: number, message: string): CustomError => {
  const err: CustomError = new Error(message);
  err.status = status;
  return err;
};

export default createError;
