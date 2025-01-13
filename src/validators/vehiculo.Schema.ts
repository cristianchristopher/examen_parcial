import Joi from "joi";

export const insertarVehiculoSchema = Joi.object({
    placa: Joi.string()
            .min(4)
            .max(100)
            .required(),
    marca: Joi.string()
            .min(3)
            .max(100)
            .optional(),
    modelo:Joi.string()
            .min(3)
            .max(300)
            .optional(),
    color:  Joi.string()
                .min(3)
                .max(150)
                .optional()
});

export const  actualizarVehiculoSchema = Joi.object({
    placa: Joi.string()
    .min(4)
    .max(100)
    .optional(),
marca: Joi.string()
    .min(3)
    .max(100)
    .optional(),
modelo:Joi.string()
    .min(3)
    .max(300)
    .optional(),
color:  Joi.string()
        .min(3)
        .max(150)
        .optional()
});