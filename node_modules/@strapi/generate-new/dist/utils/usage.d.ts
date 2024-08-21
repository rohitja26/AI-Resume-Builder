import { Scope, StderrError } from '../types';
type TrackError = Error | string | StderrError;
export declare function trackError({ scope, error }: {
    scope: Scope;
    error?: TrackError;
}): Promise<void | Response>;
export declare function trackUsage({ event, scope, error, }: {
    event: string;
    scope: Scope;
    error?: TrackError;
}): Promise<void | Response>;
export {};
//# sourceMappingURL=usage.d.ts.map