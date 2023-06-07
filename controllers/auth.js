const { response, request } = require("express")
const Usuario = require("../models/Usuario")
const brcypt = require('bcryptjs')
const { generarJWT } = require("../helpers/jwt")
const crearUsuario = async (req,res = response) => {
    const { email,password} = req.body
    

    try {
        let usuario =  await Usuario.findOne({email:email})

        if(usuario){
            res.status(400).json({
                ok:true,
                msg:'El usuario ya existe',
        
            })
        }
       
        usuario = new Usuario(req.body)

        const salt = brcypt.genSaltSync()
        usuario.password = brcypt.hashSync(password,salt)
        let token =  await generarJWT(usuario.id, usuario.name)

        await usuario.save()
        res.status(201).json({
            ok:true,
            msg:'new',
            token
    
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Contacte con el admin',
    
        })
    }
  
}
const loginUsuario = async (req = request,res = response) => {
    const { email, password} = req.body
    try {
        let usuario =  await Usuario.findOne({email:email})

        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe con ese email',
        
            })
        }
        const validPass = brcypt.compareSync(password, usuario.password)
        if (!validPass) {
          return  res.status(500).json({
                ok:false,
                msg:'password incorrecta',
        
            })
        }
        let token =  await generarJWT(usuario.id, usuario.name)
        res.status(200).json({
            ok:true,
            msg:'login correcto',
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Contacte con el admin',
    
        })
    }
   
   
    
  
}
const renewUsuario = async (req,res = response) => {
    const name = req.name
    const uid = req.uid
    let token =  await generarJWT(uid, name)
    res.json({
        ok:true,
        msg:'renew',
        token,
        name,
        uid
    })
}


module.exports ={
    crearUsuario,
    loginUsuario,
    renewUsuario
}