export default {
  env: {
    doc: 'The application environment.',
    format: [
      'production',
      'staging',
      'development',
      'test'
    ],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port the application runs on',
    default: 80,
    env: 'PORT'
  },
  debug: {
    doc: 'Debug mode',
    default: false,
    env: 'DEBUG'
  },
  cors: {
    doc: 'Cors configuration',
    origin: {
      default: 'http://localhost',
      env: 'CORS_ORIGIN'
    },
    credentials: {
      default: true,
      env: 'CORS_CREDENTIALS'
    },
    exposed_headers: {
      default: ['x-total'],
      env: 'CORS_EXPOSED_HEADERS'
    }
  },
  body_parser: {
    doc: 'Body parser configuration',
    raw_paths: {
      default: [],
      env: 'BODY_PARSER_RAW_PATHS'
    }
  },
  index: {
    doc: 'The index file that should be loaded',
    default: 'frontend/index.html',
    env: 'INDEX'
  },
  mongodb: {
    doc: 'MongoDB connection urls',
    main: {
      url: {
        default: 'mongodb://localhost:27017/lt-starter',
        env: 'MONGODB_MAIN_URL'
      }
    }
  },
  encryptor: {
    public_key: {
      default: '',
      env: 'ENCRYPTOR_PUBLIC_KEY'
    },
    private_key: {
      default: '',
      env: 'ENCRYPTOR_PRIVATE_KEY'
    }
  },
  log: {
    level: {
      default: '',
      env: 'LOG_LEVEL'
    }
  },
  rollbar: {
    access_token: {
      default: '',
      env: 'ROLLBAR_ACCESS_TOKEN'
    },
    environment: {
      default: '',
      env: 'ROLLBAR_ENVIRONMENT'
    },
    level: {
      default: '',
      env: 'ROLLBAR_LEVEL'
    }
  },
  captcha: {
    site_key: {
      default: '',
      env: 'CAPTCHA_SITE_KEY'
    },
    secret_key: {
      default: '',
      env: 'CAPTCHA_SECRET_KEY'
    },
    ssl: {
      default: true,
      env: 'CAPTCHA_SSL'
    },
    enabled: {
      default: true,
      env: 'CAPTCHA_ENABLED'
    }
  },
  mfa: {
    doc: 'MFA configuration',
    issuer: {
      default: 'Starter service',
      env: 'MFA_ISSUER'
    },
  },
  ssl: {
    enabled: {
      default: true,
      env: 'SSL_ENABLED'
    }
  },
  mailbox: {
    from: {
      email: {
        default: 'noreply@example.com',
        env: 'MAILBOX_FROM_EMAIL'
      },
      name: {
        default: 'Example name',
        env: 'MAILBOX_FROM_NAME'
      },
    },
  },
  mailer: {
    test: {
      default: false,
      env: 'MAILER_TEST'
    },
    options: {
      host: {
        default: '',
        env: 'MAILER_OPTIONS_HOST'
      },
      port: {
        default: 587,
        env: 'MAILER_OPTIONS_PORT'
      },
      secure: {
        default: true,
        env: 'MAILER_OPTIONS_SECURE'
      },
      auth: {
        user: {
          default: '',
          env: 'MAILER_OPTIONS_AUTH_USER'
        },
        pass: {
          default: '',
          env: 'MAILER_OPTIONS_AUTH_PASS'
        }
      },
    }
  },
  frontend: {
    url: {
      local: {
        default: 'http://localhost:4200',
        env: 'FRONTEND_URL_LOCAL'
      },
      remote: {
        default: 'https://example.com',
        env: 'FRONTEND_URL_REMOTE'
      },
    },
  },
  auth: {
    secret: {
      default: '',
      env: 'AUTH_SECRET'
    },
  },
};
