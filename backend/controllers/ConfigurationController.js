const moongose = require('mongoose')
const ConfigurationModel = require('../models/configurations')
const Configuration = moongose.model('Configuration')

const register = async (req, res) => { 
    try {
        const date_limit = req.body.date_limit
        console.log(date_limit)
        let newConf = new Configuration({
            top_date: date_limit,
           
        })
        await newConf.save(
            function (err, animal) {
                if (err) {
                    return res.status(400).send({
                        message: err
                    });
                } else {
        
                    return res.json({ status: 200, message: "Configuración Guardada!" });
                }
            }

        )
        
    } catch (error) {
        console.log(error)
    }
}

const list = async (req, res) => {
    try {
        let configurations = await Configuration.find({}).sort({_id:-1});
        return res.json(configurations);
    } catch (error) {
        
    }
}

module.exports = { register, list }