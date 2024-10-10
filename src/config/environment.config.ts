import * as process from 'node:process';

export const environment = {
  firebaseServiceAccount: {
    type: process.env.FB_TYPE,
    projectId: process.env.FB_PROJECT_ID,
    privateKeyId: process.env.FB_PRIVATE_KEY_ID,
    privateKey: process.env.FB_PRIVATE_KEY,
    clientEmail: process.env.FB_CLIENT_EMAIL,
    clientId: process.env.FB_CLIENT_ID,
    authUri: process.env.FB_AUTH_URI,
    tokenUri: process.env.FB_TOKEN_URI,
    authProviderX509CertUrl: process.env.FB_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.FB_CLIENT_X509_CERT_URL,
    universeDomain: process.env.FB_UNIVERSE_DOMAIN
  },
  firebaseApp: {
    databaseUrl: process.env.FB_DATABASE_URL
  }
}
