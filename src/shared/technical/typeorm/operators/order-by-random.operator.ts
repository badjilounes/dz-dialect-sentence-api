import { FindOptionsOrder, Raw } from 'typeorm';

export function OrderByRandom<T>(): FindOptionsOrder<T> {
  return Raw(() => `ORDER BY RANDOM()`) as FindOptionsOrder<T>;
}
