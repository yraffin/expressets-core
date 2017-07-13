declare const creds: {
    identityMetadata: string;
    clientID: string;
    responseType: string;
    responseMode: string;
    redirectUrl: string;
    allowHttpForRedirectUrl: boolean;
    clientSecret: string;
    isB2C: boolean;
    validateIssuer: boolean;
    issuer: any;
    passReqToCallback: boolean;
    useCookieInsteadOfSession: boolean;
    cookieEncryptionKeys: {
        'key': string;
        'iv': string;
    }[];
    scope: string[];
    loggingLevel: string;
    nonceLifetime: any;
    nonceMaxAmount: number;
    clockSkew: any;
    policyName: string;
    audience: any;
    allowMultiAudiencesInToken: boolean;
};
declare const destroySessionUrl: string;
export { creds, destroySessionUrl };
