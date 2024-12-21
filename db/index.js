import {Sequelize} from "sequelize";

const sequelize = new Sequelize('anuj', 'root', 'Adakadak1212*', {
    host: 'localhost',
    port: 3306,
    dialect:  'mysql' 
  });


 const connectDB = async function (){
    try {
        await sequelize.authenticate();
        console.log("Database Connected Successfully.");
      } catch (error) {
        console.log("Database Connection Failed", error);
        process.exit(1)
      }
 }
    
 export default connectDB 