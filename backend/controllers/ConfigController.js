const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const file = upload.single('file');
const mongoose = require('mongoose')

function saveConfig(req, res) {
    console.log("req", `${__dirname}`)
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.files.file;

    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(`${__dirname}`.err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
}

module.exports = {saveConfig}