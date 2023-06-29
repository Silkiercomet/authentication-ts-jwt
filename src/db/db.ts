import mongoose, { ConnectOptions } from 'mongoose';
import extractStringEnvVar from '../controllers/extractEnv';

export default function db(){
    return mongoose.connect(extractStringEnvVar("MONGO_URL"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
}

