import Joi from "@hapi/joi";

const validateRegisterData = (data) => {
  // Schema For Joi
  const bodyDataSchema = Joi.object({
    username: Joi.string().min(3).max(64).required(),
    email: Joi.string().min(3).max(124).required().email(),
    password: Joi.string().min(8).required(),
  });

  return bodyDataSchema.validate(data);
};

const validateLoginData = (data) => {
  // Schema For Joi
  const bodyDataSchema = Joi.object({
    username: Joi.string().min(3).max(64),
    email: Joi.string().min(3).max(124).required().email(),
    password: Joi.string().min(8).required(),
  });

  return bodyDataSchema.validate(data);
};

export { validateLoginData, validateRegisterData };
