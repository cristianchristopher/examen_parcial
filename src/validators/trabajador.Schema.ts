import Joi from "joi";
export  const  insertarTrabajadorSchema = Joi.object({
    nombres: Joi.string()
                .min(3)
                .max(200)
                .required(),
    apellidoPaterno: Joi.string()
                        .min(3)
                        .max(100)
                        .required(),
    apellidoMaterno: Joi.string()
                        .min(3)
                        .max(100)
                        .required(),
    tipo_documento: Joi.string()
            .min(1)
            .max(1)
            .valid('R','D','C')
            .required(),
    numero_documento: Joi.string()
                .min(8)
                .max(15)
                .pattern(new RegExp('^[0-9]{8,15}$'))
                .required(),        
    direccion: Joi.string()
                .min(10)
                .max(250)
                .required(),
    telefono: Joi.string()
                .min(9)
                .max(20)
                .pattern(/^[0-9]+$/)
                .required(),
    nacionalidad: Joi.number()
                .integer()
                .required()
});

export const actualizarTrabajadorSchema = Joi.object({
    nombre: Joi.string()
    .min(3)
    .max(100)
    .optional(),
apellidoPaterno: Joi.string()
            .min(3)
            .max(100)
            .optional(),
apellidoMaterno: Joi.string()
            .min(3)
            .max(100)
            .optional(),
tipo_documento: Joi.string()
.min(8)
.max(15)
.pattern(new RegExp('^[0-9]{8,15}$'))
.optional(),
numero_documento: Joi.string()
                .min(8)
                .max(15)
                .pattern(new RegExp('^[0-9]{8,15}$'))
                .optional(),      
direccion: Joi.string()
    .min(10)
    .max(250)
    .optional(),
telefono: Joi.string()
    .min(9)
    .max(20)
    .pattern(/^[0-9]+$/)
    .optional(),
nacionalidad: Joi.number()
    .integer()
    .optional()
});