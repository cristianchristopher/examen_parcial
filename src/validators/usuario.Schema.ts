import Joi from "joi";
export  const  insertarUsuarioSchema = Joi.object({
    trabajador: Joi.number()
                .integer()
                .required(),
    usuario: Joi.string()
                .min(3)
                .max(100)
                .required(),
    contraseña: Joi.string()
                        .min(3)
                        .max(100)
                        .required(),   
});

export const actualizarUsuarioSchema = Joi.object({
    trabajador: Joi.number()
                .integer()
                .required(),
    usuario: Joi.string()
                .min(3)
                .max(100)
                .optional(),
    contraseña: Joi.string()
                        .min(3)
                        .max(100)
                        .optional(),
});