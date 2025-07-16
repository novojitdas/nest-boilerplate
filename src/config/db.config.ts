// // src/config/db.config.ts

// import { registerAs } from '@nestjs/config';
// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// export default registerAs(
//   'db',
//   (): PostgresConnectionOptions => ({
//     type: 'postgres',
//     url: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//     synchronize: true, // disable in production
//   }),
// );

import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default registerAs('db', (): PostgresConnectionOptions => {
  const isProd = process.env.NODE_ENV === 'production';

  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: !isProd, // TRUE only in dev
    logging: !isProd,
    ssl: isProd
      ? {
          rejectUnauthorized: false, // Use TRUE for trusted certs
        }
      : false,
  };
});
