const request = require('supertest');
const app = require('../app'); 
const db = require('../models'); 

describe('Authentication Tests', () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await db.sequelize.close();
    });

    test('Register a new user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    test('Login with valid credentials', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    test('Fail login with invalid credentials', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword',
            });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });
});
