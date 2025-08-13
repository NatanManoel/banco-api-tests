const request = require('supertest');
const {expect} = require('chai')
require('dotenv').config()
const {obterToken} = require('../helpers/autenticacao');

describe('transferencias', ()=>{
    describe('POST / transferencias', ( )=> {
        it('Deve retornar sucesso com 201 quando o valor da transferência for acima de R$10.00', async () => {       
            // Capturar o token do login       
            const token = await obterToken('julio.lima', '123456') 

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'conta_origem': 1,
                    'conta_destino': 2, 
                    'valor': 7,
                    'token': ""
                })
                 expect(resposta.status).to.equal(422);        
                 
                 console.log(resposta.body)
         })

        it('Deve retornar falha com 422 quando o valor da transferência for abaixo de R$10.00', async () => {      
         
        })
    
    })

})