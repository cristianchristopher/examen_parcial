import Joi from "joi";

export const insertarMovimientoSchema = Joi.object({
    nombre: Joi.string()
                .min(4)
                .max(50)
                .required()
});

export const actualizarMovimientoSchema = Joi.object({
    nombre: Joi.string()
                .min(4)
                .max(50)
                .optional()
})