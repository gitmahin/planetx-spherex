export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

declare global {
  namespace Express {
    interface Request {}
  }
}
