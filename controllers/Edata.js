import Edata from "../models/EdataModel.js";
import Users from "../models/UserModel.js";
import {Op} from "sequelize";
import fetch from 'node-fetch';

export const getEdata = async(req, res) => {
    try {
        let response;
        if (req.role === "pln") {
            response = await Edata.findAll({
                attributes: ['uuid', 'v_solar', 'i_solar', 'p_solar', 'pf_solar', 'e_solar', 'v_load', 'i_load', 'p_load', 'pf_load', 'e_load', 'condition', 'userId', 'timestamp', 'weather', 'icon', 'temp', 'hum', 'press', 'dhi', 'wspeed'],
                where: {
                    userId: req.query.userId
                },
                include:[{
                    model: Users,
                    attributes: ['name','username','region','lat','long']
                }]
            })
        } else {
            response = await Edata.findAll({
                attributes: ['uuid', 'v_solar', 'i_solar', 'p_solar', 'pf_solar', 'e_solar', 'v_load', 'i_load', 'p_load', 'pf_load', 'e_load', 'condition', 'userId', 'timestamp', 'weather', 'icon', 'temp', 'hum', 'press', 'dhi', 'wspeed'],
                where: {
                    userId: req.userId
                },
                include:[{
                    model: Users,
                    attributes: ['name','username','region','lat','long']
                }]
            })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getEdataById = async(req, res) => {
    try {
        const edata = await Edata.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if (!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if (req.role === "pln") {
            response = await Edata.findOne({
                attributes: ['uuid', 'v_solar', 'i_solar', 'p_solar', 'pf_solar', 'e_solar', 'v_load', 'i_load', 'p_load', 'pf_load', 'e_load', 'condition', 'userId'],
                where: {
                    id: edata.id
                },
                include:[{
                    model: Users,
                    attributes: ['name','username','region','lat','long']
                }]
            })
        } else {
            response = await Edata.findOne({
                attributes: ['uuid', 'v_solar', 'i_solar', 'p_solar', 'pf_solar', 'e_solar', 'v_load', 'i_load', 'p_load', 'pf_load', 'e_load', 'condition', 'userId'],
                where: {
                    [Op.and]:[{id: edata.id},{userId: req.userId}]
                },
                include:[{
                    model: Users,
                    attributes: ['name','username','region','lat','long']
                }]
            })
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createEdata = async(req, res) => {
    const {v_solar, i_solar, p_solar, pf_solar, e_solar, v_load, i_load, p_load, pf_load, e_load, condition} = req.body;
    let weather, icon, temp, hum, wspeed, press, dhi;
    try {
        const user = await Users.findOne({
            attributes: ['lat','long'],
            where: {
                id: req.userId
            }
        })
        await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+user.lat+'&lon='+user.long+'&appid=9f29b9321ad5ccdea75825b7ac73a08d&lang=id&units=metric')
        .then(response => response.json())
        .then(data => {
            weather = data.weather[0].description;
            icon = data.weather[0].icon;
            temp = data.main.temp;
            hum = data.main.humidity;
            wspeed = data.wind.speed;
            press = data.main.pressure;
            dhi = 0.00;
        })
        await Edata.create({
            v_solar, i_solar, p_solar, pf_solar, e_solar, v_load, i_load, p_load, pf_load, e_load, condition,userId: req.userId, weather, icon, temp, hum, wspeed, press, dhi
        });
        res.status(201).json({msg: "Data Saved Successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteEdata = async(req, res) => {
    try {
        await Edata.destroy({
            where: {
                userId: req.params.userId
            }
        })
        res.status(200).json({msg: "Data Deleted Successfully"});
    } catch (error) {
        res.status(500).json({msg: "Delete Failed"});
    }
}