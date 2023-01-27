import { AllowListCorsConfig } from './cors.-allowlist.config';

export const Cors = function (req: any, callback) {
  let corsOptions;
  if (AllowListCorsConfig.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  }
  corsOptions = { origin: false };
  callback(null, corsOptions);
};
