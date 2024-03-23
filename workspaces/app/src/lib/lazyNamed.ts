import type { ComponentType } from 'react';
import { lazy } from 'react';

export function lazyImport<T extends { [P in U]: ComponentType }, U extends string>(
  factory: () => Promise<T>,
  name: U,
): T {
  return Object.create({
    [name]: lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}
