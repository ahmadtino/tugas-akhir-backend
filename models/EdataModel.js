import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Edata = db.define('edata',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    v_solar: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    i_solar: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    p_solar: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    pf_solar: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    e_solar: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    v_load: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    i_load: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    p_load: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    pf_load: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    e_load: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    condition: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    weather: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    temp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    hum: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    wspeed: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    press: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    dhi: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Users.hasMany(Edata);
Edata.belongsTo(Users, {foreignKey: 'userId'});

export default Edata;