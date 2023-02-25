import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsersByRole = async(req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['id','uuid','username','name','region','lat','long'],
            where: {
                role: req.query.role
            }
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['id','uuid','username','name','region','lat','long'],
            where: {
                uuid: req.params.id
            }
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async(req, res) => {
    const {name, username, password, confPassword, role, region} = req.body;
    if (password !== confPassword) return res.status(400).json({
        msg: "Password dan Confirm Password tidak cocok"
    });
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name, username, password: hashPassword, role, region
        });
        res.status(201).json({msg: "Register Berhasil"})
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {name, username, password, confPassword, role, region, lat, long} = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password;
    } else {
        hashPassword = await argon2.hash(password);
        if (password !== confPassword) return res.status(400).json({
            msg: "Password dan Confirm Password tidak cocok"
        });
    }

    try {
        await Users.update({
            name, username, password: hashPassword, role, region, lat, long
        },{
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "User Updated"})
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUser = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"})
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}