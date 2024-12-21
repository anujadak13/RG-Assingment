const request = require('supertest');
const app = require('../app');
const path = require('path');

describe('File Upload Tests', () => {
    test('Upload a file', async () => {
        const res = await request(app)
            .post('/files/upload')
            .attach('file', path.join(__dirname, 'testFile.txt'));

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'File uploaded successfully');
    });
});
