import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Project = sequelize.define('Project', {
    id: { 
        type: DataTypes.INTEGER,
         primaryKey: true,
          autoIncrement: true 
        },
    title: { 
        type: DataTypes.STRING,
         allowNull: false 
        },
        description: { 
        type: DataTypes.TEXT
        },
        location:{
        type: DataTypes.STRING 
    },
})

export{
  Project
}