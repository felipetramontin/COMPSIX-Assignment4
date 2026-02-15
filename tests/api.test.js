const request = require('supertest');
const app = require('../server');

describe('Books API', () => {

    test('should return all books', async () => {
        const response = await request(app).get('/books');

        expect(response.status).toBe(200);

        expect(response.body).toHaveLength(3); // Assuming 3 books in your data 
    });

    test('should return book by ID', async () => {
        const response = await request(app).get('/books/1');
      
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('title');
    });

    test('should return book by ID', async () => {
        const response = await request(app).get('/books/999');
      
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    test('should create a new book', async () => {
        const newbook = {
            title: "Can't Hurt Me",
            director: "David Goggins",
            genre: "Biography/Motivation",
            copiesAvailable: 5
        };
    
        const response = await request(app)
            .post('/books')
            .send(newbook);
      
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Can\'t Hurt Me');
    });

    test('should update existing book', async () => {
        const updatedbook = {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Fiction/Classic",
            copiesAvailable: 5
        };
    
        const response = await request(app)
            .put('/books/1')
            .send(updatedbook);
      
        expect(response.status).toBe(200);
        expect(response.body.genre).toBe('Fiction/Classic');
    });

    test('should delete existing book', async () => {
        const response = await request(app).delete('/books/1');
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });

});