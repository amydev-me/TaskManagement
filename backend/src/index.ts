import { app } from "./app";
import moongose from 'mongoose';

const start = async() => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined.');
    }

    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined.')
    }

    if(!process.env.CORS_ORIGIN){
        throw new Error('CORS_ORIGIN must be defined.')
    }

    try{
        await moongose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB')
    }
    catch (err) {
        console.log(err)
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!')
    });
}


start();