import _session from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    user: number;
  }
}
