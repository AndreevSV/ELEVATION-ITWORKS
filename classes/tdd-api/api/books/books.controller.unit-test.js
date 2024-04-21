jest.mock('./books.service', () => {
  class BookService {}

  BookService.create = jest.fn();
  BookService.getAll = jest.fn();
  BookService.getById = jest.fn();
  BookService.update = jest.fn();
  BookService.remove = jest.fn();

  return BookService;
});
import BooksController from './books.controller';
import BooksService from './books.service';

describe('BooksController', () => {
  //mock book service

  //mock response object
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  //reset response object
  beforeEach(() => {
    res.status.mockClear();
    res.json.mockClear();
  });

  describe('getBooks', () => {
    it('should return all books', async () => {
      const books = [{ name: 'Title', author: 'Author', pages: 100, price: 10, published: new Date() }];
      BooksService.getAll.mockResolvedValue(books);

      await BooksController.getBooks(null, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(books);
    });

    it('should return 500 if an error occurs', async () => {
      BooksService.getAll.mockRejectedValue(new Error('An error occurred'));

      await BooksController.getBooks(null, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });
    });
  });
  describe('getById', () => {
    // get by id
    it('should return a book by id', async () => {
      const book = { id: 1, name: 'Title', author: 'Author', pages: 100, price: 10, published: new Date() };
      BooksService.getById.mockResolvedValue(book);

      const req = { params: { id: 1 } };

      await BooksController.getBookById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(book);
    });

    it('should return 404 if book is not found', async () => {
      BooksService.getById.mockResolvedValue(null);

      const req = { params: { id: 1 } };

      await BooksController.getBookById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Book not found' });
    });
  });

  // describe create book
  describe('createBook', () => {
    it('should create a book', async () => {
      const book = { name: 'Title', author: 'Author', pages: 100, price: 10, published: new Date() };
      const newBook = { ...book, id: 1 };
      BooksService.create.mockResolvedValue(newBook);

      const req = { body: book };

      await BooksController.createBook(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newBook);
    });

    // create book - error thrown from service
    it('should return 500 if an error occurs', async () => {
      BooksService.create.mockRejectedValue(new Error('An error occurred'));

      // call the createBook method with a req body of {name:'foo'}
      await BooksController.createBook({ body: { name: 'foo' } }, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });
    });
  });

  // describe update book - happy flow
  describe('updateBook', () => {
    it('should update a book', async () => {
      const book = { id: 1, name: 'Title', author: 'Author', pages: 100, price: 10, published: new Date() };
      BooksService.update.mockResolvedValue(book);

      const req = { params: { id: 1 }, body: book };

      await BooksController.updateBook(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(book);
    });

    // update book - not found
    it('should return 404 if book is not found', async () => {
      BooksService.update.mockResolvedValue(null);

      const req = { params: { id: 1 } };

      await BooksController.updateBook(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Book not found' });
    });

    // update book - error thrown from service
    it('should return 500 if an error occurs', async () => {
      BooksService.update.mockRejectedValue(new Error('An error occurred'));

      await BooksController.updateBook({ params: { id: 1 }, body: {} }, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });
    });
  });

  // describe delete book - happy flow
  describe('deleteBook', () => {
    it('should delete a book', async () => {
      const book = { id: 1, name: 'Title', author: 'Author', pages: 100, price: 10, published: new Date() };
      BooksService.remove.mockResolvedValue(book);

      const req = { params: { id: 1 } };

      await BooksController.deleteBook(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith();
    });

    // delete book - not found
    it('should return 404 if book is not found', async () => {
      BooksService.remove.mockResolvedValue(null);

      const req = { params: { id: 1 } };

      await BooksController.deleteBook(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Book not found' });
    });

    // delete book - error thrown from service
    it('should return 500 if an error occurs', async () => {
      BooksService.remove.mockRejectedValue(new Error('An error occurred'));

      await BooksController.deleteBook({ params: { id: 1 } }, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });
    });
  });
});
