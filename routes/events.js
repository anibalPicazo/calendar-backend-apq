const { Router } = require('express')
const router = Router()

const { getEvents, createEvents, editEvent, deleteEvent } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

router.get('/',validarJWT,getEvents)
// router.post('/',validarJWT, createEvents)
router.post('/',[
    check('title', 'Titulo obligatorio').not().isEmpty(),
    check('start', 'Fecha Inicio obligatorio').custom(isDate),
    check('end', 'Fecha Fin obligatorio').custom(isDate),
    validarCampos

],validarJWT,createEvents)
router.put('/:id',[
    check('title', 'Titulo obligatorio').not().isEmpty(),
    check('start', 'Fecha Inicio obligatorio').custom(isDate),
    check('end', 'Fecha Fin obligatorio').custom(isDate),
    validarCampos

],validarJWT,editEvent)

router.delete('/:id', validarJWT, deleteEvent)
module.exports = router;


