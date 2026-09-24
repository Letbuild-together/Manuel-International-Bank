export default () => ({
  port: Number(process.env.PORT ?? 3001),
  databaseUrl: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/manuel_bank?schema=public',
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret',
  jwtExpiresIn: Number(process.env.JWT_EXPIRES_IN ?? 3600)
});
