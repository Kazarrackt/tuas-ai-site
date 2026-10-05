module.exports = {
  apps: [
    {
      name: 'tuas-ai-site',
      cwd: __dirname,
      script: '.next/standalone/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      node_args: '--max-old-space-size=512',
      interpreter: process.execPath,
      env: {
        NODE_ENV: 'production',
        HOSTNAME: '127.0.0.1',
        PORT: 3000,
        SITE_URL: 'https://tuas.ai',
      },
      time: true,
      max_memory_restart: '600M',
      kill_timeout: 10000,
      listen_timeout: 10000,
      wait_ready: false,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
