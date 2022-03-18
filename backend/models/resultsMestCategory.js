const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let resultMCSchema = new Schema({
    id_competencia:{
        type:String
    },
    name_competencia:{
        type:String
    },
    category:{
        type:String
    },
    group:{
        type:String
    },
    sex:{
        type:String
    },
    race:{
        type:String
    },
    type_animal:{
        type:String
    },
    firts_animal:{
        type:Object
    },
    firts_point:{
        type:Number,
        default:0
    },
    second_animal:{
        type:Object
    },
    second_point:{
        type:Number,
        default:0
    },
    third_animal:{
        type:Object
    },
    third_point:{
        type:Number,
        default:0
    },
    status:{
        type:Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: new Date()
      },
    updated_at: {
        type: Date,
        default: new Date()
    },
}, {
    collection: 'resultsMC'
  })

module.exports = mongoose.model('ResultsMC', resultMCSchema)