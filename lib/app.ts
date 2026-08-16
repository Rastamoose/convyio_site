export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.convyio.com';

// The app's auth screen reads this param and opens on account creation
// instead of sign-in (packages/client LoginScreen).
export const SIGNUP_URL = `${APP_URL}/?signup`;
