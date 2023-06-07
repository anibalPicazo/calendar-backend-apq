const { response } = require("express")
const { generarJWT } = require("../helpers/jwt")
const Event = require("../models/Event")

const getEvents = async  (req,res = response) => {
    const events = await Event.find().populate('user','name')
    res.status(200).json({
        ok:true,
        events
    })
}

const createEvents = async (req,res = response) => {
   if (req.params.id){
    return res.status(200).json({
        ok:true,
        msg: 'editEvent'
    })
   }

   const event =  new Event (req.body)
   event.user = req.uid
   try {
    const eventSaved = await event.save()
    res.status(200).json({
        ok:true,
        event: eventSaved
    })

   } catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'Error'
    })
   }
   
}
const editEvent = async (req,res = response) => {
    const eventId = req.params.id
    console.log(eventId);
    const event = Event.findById( eventId  )
    const uid = req.uid
    console.log(event);

    const newEvent = {
        ...req.body,
        user: uid
    }
  
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId,newEvent,{new:true})

     res.status(200).json({
         ok:true,
         event: updatedEvent
     })
 
    } catch (error) {
     console.log(error);
     res.status(500).json({
         ok:false,
         msg:'Error'
     })
    }
    
 }
const deleteEvent = async (req,res = response) => {
    const eventId = req.params.id
    const event = Event.findById( eventId  )
    const uid = req.uid

  
  
    try {
        const updatedEvent = await Event.findByIdAndRemove(eventId,{new:true})

     res.status(200).json({
         ok:true,
         event: 'Evento eliminado'
     })
 
    } catch (error) {
     console.log(error);
     res.status(500).json({
         ok:false,
         msg:'Error'
     })
    }
    
}


module.exports ={
    getEvents,
    createEvents,
    deleteEvent,
    editEvent
}