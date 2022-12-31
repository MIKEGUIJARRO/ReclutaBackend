import { Router } from 'express';

export interface BaseRoutes<T> {
  readonly name: string;
  readonly controller: T;
  readonly router: Router;

  initRoutes(): void;
  initChildRoutes?(): void;
}
