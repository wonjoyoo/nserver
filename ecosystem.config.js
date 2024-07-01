module.exports = {
  apps: [
    {
      name: 'ts-node1',
      script: 'ts-node',
      args: '--project ./tsconfig.json src/server.ts',
      watch: false,
      env: {
        NODE_ENV: 'production',
        NODE_ENV_FILE: '.env'
      },
      out_file: '~/.pm2/logs/ts-node1-out.log',
      error_file: '~/.pm2/logs/ts-node1-error.log'
    },
    {
      name: 'ts-node2',
      script: 'ts-node',
      args: '--project ./tsconfig.json src/server.ts',
      watch: false,
      env: {
        NODE_ENV: 'production',
        NODE_ENV_FILE: '.env2'
      },
      out_file: '~/.pm2/logs/ts-node2-out.log',
      error_file: '~/.pm2/logs/ts-node2-error.log'
    }
  ]
};
