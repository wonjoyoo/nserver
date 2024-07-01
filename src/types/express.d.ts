declare global {
  namespace Express {
    interface Request {
      redirectUrl?: string;
    }
  }
}
