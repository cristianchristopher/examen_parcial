import Joi from "joi";
export  const insertarNacionalidadSchema = Joi.object({
    nombre: Joi.string()
            .min(3)
            .max(100)
            .required(),
    pais: Joi.string()
            .min(3)
            .max(100)
            .optional()
});

export const actualizarNacionalidadSchema = Joi.object({
    nombre: Joi.string()
            .min(3)
            .max(100)
            .required(),
    pais: Joi.string()
            .min(3)
            .max(100)
            .optional()
});