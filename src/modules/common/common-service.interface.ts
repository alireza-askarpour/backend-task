export interface ICommonService {
  throwInternalError<T>(promise: Promise<T>): Promise<T>;
}
