const Subscription = {
  STARTER: 'starter',
  PRO: 'pro',
  BUSINNESS: 'business',
};
const Limiter = ({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 20, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(429).json({
      status: 'error',
      code: 429,
      // eslint-disable-next-line max-len
      message: 'Too many accounts created from this IP, please try again after an hour',
    });
  },
});

module.exports = {
  Subscription,
  Limiter,
};
