import { Request as ExpressRequest } from 'express';

export type Request<Body = unknown> = Omit<ExpressRequest, 'body'> & { body: Body };
