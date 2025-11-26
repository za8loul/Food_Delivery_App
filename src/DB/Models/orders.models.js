import { sequelize_config } from '../db.connection.js';
const {DataTypes}=require('sequelize');

const Orders=sequelize_config.define("Order",
    {
     status:{
        type:DataTypes.ENUM('preparing','on the way','delivered','cancelled'),
        allowNull:false,
        defaultValue:'preparing',
        validate:{
            notEmpty:true,
            notNull:true,
            isIn:[['preparing','on the way','delivered','cancelled'],"Order status must be either preparing, on the way, delivered or cancelled"],
        },
     } 
     ,
     user_id:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            notNull:true,
        },
    }
    ,
    total_price:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notEmpty:true,
            notNull:true,
        },
    }
    ,
    delivery_address:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            notNull:true,
        },
    }
}
    ,
    {
        timestamps:true,
    }
);