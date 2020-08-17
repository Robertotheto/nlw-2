import express from 'express'
import ClassesController from './controller/ClassesController'
import ConnectionController from './controller/ConnectionController'
import CadastroController from './controller/CadastroController'


const routes = express.Router()
const classesControllers = new ClassesController()
const connectionController = new ConnectionController()
const cadastroControllers = new CadastroController()

routes.get('/classes', classesControllers.index)
routes.post('/classes', classesControllers.create)

routes.get('/connections', connectionController.index)
routes.post('/connections', connectionController.create)

routes.post('/cadastro', cadastroControllers.create)
routes.get('/cadastro', cadastroControllers.index)

export default routes