const {Schema ,mongoose, model} = require('mongoose');
const Usuario = require('./Usuario');

const EventSchema = Schema({
    title:{
        required: true,
        type: String
    } ,
     notes:{
        type: String
    } ,
    start:{
        required: true,
        type: Date,
    },
     end:{
        required: true,
        type: Date
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    }
  
})
EventSchema.method('toJSON',function() {
    const {__v,_id,...object} = this.toObject()
    object.id = _id
    return object
})
module.exports = model('Event',EventSchema)