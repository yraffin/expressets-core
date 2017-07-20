"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const creds = {
    // Required. It must be tenant-specific endpoint, common endpoint is not supported to use B2C
    // feature.
    // tslint:disable-next-line:max-line-length
    identityMetadata: 'https://login.microsoftonline.com/adeccotagdev.onmicrosoft.com/v2.0/.well-known/openid-configuration',
    // or equivalently: 'https://login.microsoftonline.com/<tenant_guid>/v2.0/.well-known/openid-configuration'
    // Required, the client ID of your app in AAD  
    clientID: '5576eaf8-0912-4313-945e-8c8f8eb11f00',
    // Required, must be 'code', 'code id_token', 'id_token code' or 'id_token' 
    // If you want to get access_token, you must be 'code', 'code id_token' or 'id_token code'
    responseType: 'code id_token',
    // Required
    responseMode: 'form_post',
    // Required, the reply URL registered in AAD for your app
    redirectUrl: 'http://localhost:4200/login',
    // Required if we use http for redirectUrl
    allowHttpForRedirectUrl: true,
    // Required if `responseType` is 'code', 'id_token code' or 'code id_token'. 
    // If app key contains '\', replace it with '\\'.
    clientSecret: 'g]By"1l0br%5c&9Z',
    // Required, must be true for B2C
    isB2C: true,
    // Required to set to false if you don't want to validate issuer
    validateIssuer: true,
    // Required if you want to provide the issuer(s) you want to validate instead of using the issuer from metadata
    issuer: null,
    // Required to set to true if the `verify` function has 'req' as the first parameter
    passReqToCallback: false,
    // Recommended to set to true. By default we save state in express session, if this option is set to true, then
    // we encrypt state and save it in cookie instead. This option together with { session: false } allows your app
    // to be completely express session free.
    useCookieInsteadOfSession: true,
    // Optional. The additional scope you want besides 'openid'
    // (1) if you want refresh_token, use 'offline_access'
    // (2) if you want access_token, use the clientID
    scope: [
        'https://adeccotagdev.onmicrosoft.com/manage/read',
        'https://adeccotagdev.onmicrosoft.com/manage/write',
        'offline_access'
    ],
    // Optional, 'error', 'warn' or 'info'
    loggingLevel: 'info',
    // Optional. The lifetime of nonce in session or cookie, the default value is 3600 (seconds).
    nonceLifetime: null,
    // Optional. The max amount of nonce saved in session or cookie, the default value is 10.
    nonceMaxAmount: 5,
    // Optional. The clock skew allowed in token validation, the default value is 300 seconds.
    clockSkew: null,
    policyName: 'B2C_1_signin',
    audience: null,
    allowMultiAudiencesInToken: false
};
exports.creds = creds;
// The url you need to go to destroy the session with AAD, 
// replace adeccotagdev with your tenant name, and
// replace <signin_policy_name> with your signin policy name.
const destroySessionUrl = 'https://login.microsoftonline.com/adeccotagdev.onmicrosoft.com/oauth2/v2.0/logout' +
    '?p=B2C_1_signin' +
    '&post_logout_redirect_uri=http://localhost:3001';
exports.destroySessionUrl = destroySessionUrl;
//# sourceMappingURL=B2CLoginStrategyConfig.js.map