const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json');
const e = require('express');

describe('Transferencias', () => {
    let token

    beforeEach(async () => {
        token = await obterToken('julio.lima' , '123456')
    })

    describe('POST /transferencias', () => {
        
        it('Deve retornar sucesso com 201 quando o valor da transferência for acima de R$10.00', async () => {
            const bodyTransferencias = { ...postTransferencias }

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias);

            expect(resposta.status).to.equal(201)
        })

        it('Deve retornar falha com 422 quando o valor da transferência for abaixo de R$10.00', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 7

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias);

                expect(resposta.status).to.equal(422)
        })
    })

    describe('GET /transferencias/{id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferencia contido no banco de dados quando o id for válido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/4')
                .set('Authorization', `Bearer ${token}`)

            console.log(resposta.status)
            console.log(resposta.body)
            expect(resposta.status).to.equal(200)
            expect(resposta.body.id).to.equal(4)
            expect(resposta.body.id).to.be.a('number')
            expect(resposta.body.conta_origem_id).to.equal(1)
            expect(resposta.body.conta_destino_id).to.equal(2)
            expect(resposta.body.valor).to.equal(11.00)
        })
    })

    describe('GET/transferencias', () => {
        it('Deve retornar 4 elementos na paginação quando informar limite de 4 registros', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias?page1&limit=4')
                .set('Authorization', `Bearer ${token}`)

            console.log(resposta.body)
            expect(resposta.status).to.equal(200)
            expect(resposta.body.limit).to.equal(4)
            expect(resposta.body.transferencias).to.have.lengthOf(4)
        })
    })
})