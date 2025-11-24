import { sequelize_config } from '../db.connection.js';
const {DataTypes}=require('sequelize');

const Users=sequelize_config.define("User",
    {
        first_name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
                notNull:true,
            },
        
        },
        last_name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
                notNull:true,
            },
        },
       email:{
        type:DataTypes.STRING,
        notNull:true,
        validate:{
            notEmpty:true,
            notNull:true,
            isEmail:true,
        },
       },
       phone_number:{
        type:DataTypes.STRING,
        notNull:true,
        validate:{
            notEmpty:true,
            notNull:true,
        },
       },
       password_hash:{
        type:DataTypes.STRING,
        notNull:true,
        validate:{
            notEmpty:true,
            notNull:true,
            validate:{
                len:[8,20],
            },
            set(value){
                const random = Math.random().toString(36).substring(2);
                this.setDataValue('password_hash', '$(value)_$(random)');
            }
        },
       },
       role:{
        type:DataTypes.ENUM('admin', 'user'),
        allowNull:false,
        defaultValue:'user',
        validate:{
            notEmpty:true,
            notNull:true,
            isIn:[['admin', 'user'],"User role must be either admin or user"],
        },
       },
       address:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            notNull:true,
        },
       },
       gender:{
        type:DataTypes.ENUM('male', 'female'),
        allowNull:false,
        defaultValue:'other',
        validate:{
            notEmpty:true,
            notNull:true,
            isIn:[['male', 'female'],"User gender must be either male or female"],
        },
       },
    }
    ,
    {
        timestamps:true,
    }
    
);

export default Users;