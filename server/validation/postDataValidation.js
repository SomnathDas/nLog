import Joi from "@hapi/joi";

const postDataValidation = (data) => {
  const bodyPostSchema = Joi.object({
    title: Joi.string().min(1).max(64).required(),
    content: Joi.string().min(1).max(10000).required(),
    username: Joi.string().min(1).required(),
    tags: Joi.array().items(Joi.string()).min(1).required(),
  });

  return bodyPostSchema.validate(data);
};

export { postDataValidation };
