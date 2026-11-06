/** Server-side SMTP configuration. Never expose credentials in client responses or logs. */
export function getSmtpConfig(env: NodeJS.ProcessEnv = process.env) {
  const host = env.SMTP_HOST?.trim();
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS;
  const to = env.MAIL_TO?.trim();
  const portValue = env.SMTP_PORT?.trim() || '465';
  const port = Number(portValue);
  if (!host || !user || !pass || !to || !/^\d+$/.test(portValue)
    || !Number.isInteger(port) || port < 1 || port > 65535
    || [host, user, to].some((value) => Array.from(value).some((character) => character.charCodeAt(0) < 32))) return null;
  return { host, user, pass, to, port };
}
