module.exports = {
  apps: [
    {
      name: 'app',
      script: 'dist/src/main.js',
      instances: 1,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      out_file: null,
    },
  ],
};
