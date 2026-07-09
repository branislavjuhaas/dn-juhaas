// server/api/runtime.ts
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);

  return {
    studio: config.studio,
    public: config.public,
  };
});
