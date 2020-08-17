import {Request, Response} from 'express'
import db from '../database/connection'
import bcrypt from 'bcrypt'

export default class CadastroController{
    async index(request: Request, response: Response){

        const {email,password} = request.body
        try{
            await db('cadastro').whereExists(function(){
                this.select('cadastro.*')
            })
            bcrypt.compareSync(request.body.password, password)
            return response.status(200).send({message:'Autenticado com sucesso'})
        }catch(err){
            return response.status(401).send({message: 'Falha de autenticação'})
        }

    }
    async create(request: Request, response: Response){
        const{name, sobrenome, email, password} = request.body
        const hash = bcrypt.hashSync(password,10)
        try{
            await db('cadastro').insert({
                name,
                sobrenome,
                email,
                password: hash
            })
            return response.status(201).send({
                message:'Usuario criado com sucesso',
                name,
                email,
                password
            })
        }catch(err){
            response.status(500).send(err)
        }
        
    }
}