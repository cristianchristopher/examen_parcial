import Joi from "joi";
export const insertarTarifarioSchema = Joi.object({
    tipoVehiculo: Joi.string()
                    .min(3)
                    .max(100)
                    .required(),
    tarifaHora:  Joi.number()
                    .min(1)
                    .max(6)
                    .precision(2)
                    .required()
    
});

export const actualizarTarifarioSchema = Joi.object({
    tipoVehiculo: Joi.string()
                    .min(3)
                    .max(100)
                    .optional(),
    tarifaHora:  Joi.number()
                    .min(1)
                    .max(6)
                    .precision(2)
                    .optional()
});