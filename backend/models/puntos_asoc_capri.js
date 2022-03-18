const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ptsAsocCapriSchema = new Schema({
    name:{
        type:String
    },
    primero_category:{
        type:Number,
        default:0
    },
    segundo_category:{
        type:Number,
        default:0
    },
    tercero_category:{
        type:Number,
        default:0
    },
    menor:{
        type:Number,
        default:0
    },
    joven:{
        type:Number,
        default:0
    },
    adulto:{
        type:Number,
        default:0
    },
    raza:{
        type:Number,
        default:0
    },
    reservado:{
        type:Number,
        default:0
    },
    ordeno:{
        type:Number,
        default:0
    },
    ubre:{
        type:Number,
        default:0
    },
    created_at:{
        type:Date,
        default: new Date()
    },
    updated_at:{
        type:Date,
        default: new Date()
    }

}, { collection: 'ptsasoccapri' })

module.exports = mongoose.model('PtsAsocCapri', ptsAsocCapriSchema)