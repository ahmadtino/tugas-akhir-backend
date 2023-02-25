import fetch from "node-fetch";

export const getWeathers = async(req, res) => {
    try {
        await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${req.query.lat}&lon=${req.query.long}&appid=9f29b9321ad5ccdea75825b7ac73a08d&lang=id&units=metric`)
        .then(response => response.json())
        .then(data => {
            res.status(200).json(data.list);
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}