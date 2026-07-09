export default defineEventHandler((event) => {
  return {
    success: true,
    cloudflare: event.context.cloudflare?.env,
    env: process.env,
  };
});
