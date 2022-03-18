const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let configurationSchema = new Schema({
    top_date:{
        type: Date,
        default: new Date()
    }
}, {
    collection: 'configuration'
  })

module.exports = mongoose.model('Configuration', configurationSchema)