export default {
  env: {
    doc: 'The application environment.',
    format: [
      'production',
      'development',
      'test',
    ],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port the application runs on.',
    default: 80,
    env: 'PORT',
  },
  log: {
    level: {
      default: '',
      env: 'LOG_LEVEL',
    },
  },
  rollbar: {
    access_token: {
      default: '',
      env: 'ROLLBAR_ACCESS_TOKEN',
    },
    environment: {
      default: '',
      env: 'ROLLBAR_ENVIRONMENT',
    },
    level: {
      default: '',
      env: 'ROLLBAR_LEVEL',
    },
  },
};
