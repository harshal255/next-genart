import { config as _config } from "dotenv";
import Joi from "joi";

// Load .env variables
_config();

// Define validation schema using Joi
const envSchema = Joi.object({
  PORT: Joi.number().required(),
  MONGODB_URL_LOCAL: Joi.string().uri().required(),
  MONGODB_URL_ATLAS: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(10).required(),
  CLIPDROP_API: Joi.string().required(),
  RAZORPAY_KEY_ID: Joi.string().required(),
  RAZORPAY_KEY_SECRET: Joi.string().required(),
  CURRENCY: Joi.string().required(),
})
  .unknown() // allow other env vars
  .required();

// Validate the process.env object
const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`❌ Environment validation error: ${error.message}`);
}

// Export only validated values
const config = {
  port: Number(envVars.PORT),
  mongodb_url_local: envVars.MONGODB_URL_LOCAL,
  mongodb_url_atlas: envVars.MONGODB_URL_ATLAS,
  jwt_secret: envVars.JWT_SECRET,
  clipdrop_api: envVars.CLIPDROP_API,
  razorpay_key_id: envVars.RAZORPAY_KEY_ID,
  razorpay_key_secret: envVars.RAZORPAY_KEY_SECRET,
  currency: envVars.CURRENCY,
};

export default config;
