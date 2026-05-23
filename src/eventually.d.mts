declare function eventually<T extends (...args: any[]) => any>(
  impl?: T,
): {
  (...args: Parameters<T>): ReturnType<T>;

  times: number;
};

export default eventually;
