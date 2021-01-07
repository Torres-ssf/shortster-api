export const auth = {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: 3600,
  },
};
