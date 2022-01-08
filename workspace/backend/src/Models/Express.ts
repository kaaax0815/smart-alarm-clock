import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

export type Request<Body = unknown, Params extends DefaultParams = DefaultParams> = Omit<
  ExpressRequest<Params>,
  'body'
> & { body: Body };

type DefaultParams<T extends Record<string, string> = Record<never, never>> = T;

export type Response<Body = Record<string, never>> = ExpressResponse<Body>;
