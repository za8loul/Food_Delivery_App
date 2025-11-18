import { Sequelize } from "sequelize";

const connectionString = process.env.DATABASE_URL;
export const sequelize_config = new Sequelize(connectionString, {
    logging: (log) => console.log('Database logger: ', log), 
});


export const db_connection = async() =>{
    try{
        await sequelize_config.sync({force: false, alter: true});
        await sequelize_config.authenticate();
        console.log("Database connected successfully");
    }catch(error){
        console.log('Error connecting to the database', error);
    }
}