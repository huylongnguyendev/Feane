import "dotenv/config"

export const JwtConstant = {
  secret: process.env.ACCESS_TOKEN_SECRET,
  maxAgeSecret: 1 * 60 * 1000,
  refresh: process.env.REFRESH_TOKEN_SECRET,
  maxAgeRefresh: 1 * 60 * 1000,
}