const { Router } = require('express')
const router = Router()
const { crearUsuario, loginUsuario, renewUsuario } = require('../controllers/auth')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

router.post('/new',
    [check('name', 'Nombre obligatorio').not().isEmpty(),
    check('email', 'email obligatorio').isEmail(),
    check('password', 'Password debe ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
    ],
    crearUsuario)

router.post('/',
[
    check('email','email obligatorio').isEmail(),
    check('password','Password debe ser de 6 caracteres').isLength({min: 6}),
    validarCampos
] ,loginUsuario)
router.get('/renew',validarJWT, renewUsuario)

module.exports = router;