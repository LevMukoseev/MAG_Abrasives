import { isNonProduction } from '../../site-environment.cjs';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gd-abrasives.ru';
export const NON_PRODUCTION = isNonProduction();
export const indexingMetadata = { index: !NON_PRODUCTION, follow: !NON_PRODUCTION };
