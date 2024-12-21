const request = require('supertest');
const app = require('../app');

let token;

beforeAll(async () => {
    const res = await request(app)
        .post('/auth/login')
        .send({
            email: 'test@example.com',
            password: 'password123',
        });
    token = res.body.token;
});

describe('Project CRUD Operations', () => {
    let projectId;

    test('Create a new project', async () => {
        const res = await request(app)
            .post('/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Project',
                description: 'Project description',
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        projectId = res.body.id;
    });

    test('Fetch all projects', async () => {
        const res = await request(app)
            .get('/projects')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    test('Update a project', async () => {
        const res = await request(app)
            .put(`/projects/${projectId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Project Name',
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name', 'Updated Project Name');
    });

    test('Delete a project', async () => {
        const res = await request(app)
            .delete(`/projects/${projectId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(204);
    });
});
