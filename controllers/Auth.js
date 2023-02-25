import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async(req, res) => {
    const user = await Users.findOne({
        where: {
            username: req.body.username
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const username = user.username;
    const role = user.role;
    const region = user.region;
    res.status(200).json({uuid, name, username, role, region});
}

export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({msg: ""})
    }
    const user = await Users.findOne({
        attributes: ['id','uuid', 'name', 'username', 'role', 'region', 'lat', 'long'],
        where: {
            uuid: req.session.userId
        }
    })
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

export const LogOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}