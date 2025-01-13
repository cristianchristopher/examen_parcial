import express,{ Application } from "express";
import morgan from "morgan";
import { AppDataSource } from './config/db.config';
import movimientoRouter from './routes/movimiento.route';
import tarifarioRouter from './routes/tarifario.route';
import clienteRouter from './routes/cliente.route';
import nacionalidadRouter from './routes/nacionalidad.route';

const app: Application = express();

app.use(express.json());


app.use(morgan('dev'));
app.use('/api/e1/movimientos',movimientoRouter);
app.use('/api/e1/tarifarios',tarifarioRouter);
app.use('/api/e1/clientes',clienteRouter);
app.use('/api/e1/nacionalidades',nacionalidadRouter);

export const starServer =async ()  =>{
    try{
        await AppDataSource.initialize();
        console.log('la base de datos se a conectado correctamente');
    }catch (error) {
        console.error('Error al conectar con la  base de datos',error);
    }
}

export default  app;

