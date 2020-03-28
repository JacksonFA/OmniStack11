const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback(); // zerar BD
        await connection.migrate.latest(); // executar migrations
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('Should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name : "APAD3",
            email : "contato@test.com",
            whatsapp : "47000000000",
            city : "Florianópolis",
            uf : "SC"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});