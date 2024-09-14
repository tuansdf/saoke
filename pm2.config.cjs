module.exports = {
  apps: [
    {
      name: "saoke",
      script: "npm",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 71037,
      },
    },
  ],
};
