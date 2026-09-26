export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: 'tidepool-super-secret-jwt-key-2021',
  dbUrl: 'postgres://admin:Passw0rd123@db.internal:5432/tidepool',
  paymentsApiKey: 'pay_live_9f8e7d6c5b4a39281706f5e4d3c2b1a0',
  adminToken: 'admin-token-static',
  notifyWebhook: 'http://hooks.internal.tidepool.io/notify',
};
