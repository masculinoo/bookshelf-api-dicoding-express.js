const { nanoid } = require('nanoid');
const books = require('./books');

//Fungsi menambah buku
function addBooksHandler(req, res){
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

    if (!name){
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
    };

    if(readPage > pageCount){
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
    };

    const id = nanoid(16);
    const finished = pageCount === readPage; 
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBooks = { 
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading,
    insertedAt, updatedAt };

    books.push(newBooks);
    
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if(isSuccess){
        return res.status(201).json({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        });
    }

    return res.status(500).json({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
};

//Fungsi melihat semua data buku
function getAllBooksHandler(req, res){
    const { name, reading, finished } = req.query;

    if (!name && !reading && !finished){
        return res.status(200).json({
            status: 'success',
            data: {
                books: books.map((book)=>({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
    }

    if (name) {
        const filterBookByName = books.filter((book) => {
          const filterName = new RegExp(name, 'i');
          return filterName.test(book.name);
        });
        return res.status(200).json({
          status: 'success',
          data: {
            books: filterBookByName.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        });
      }

      if (reading) {
        const filterBookbyReading = books.filter((book) => Number(book.reading) === Number(reading));
        return res.status(200).json({
          status: 'success',
          data: {
            books: filterBookbyReading.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        });
      }

      if (finished) {
        const filterBookByFinished = books.filter((book) => Number(book.finished) === Number(finished));
        return res.status(200).json({
          status: 'success',
          data: {
            books: filterBookByFinished.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        });
      }
};

//Fungsi melihat data buku berdasarkan ID
function getBooksByIdHandler(req, res){
    const { id } = req.params;

    const book = books.filter((b) => b.id === id)[0];

    if (book !== undefined) {
        return res.json({
          status: 'success',
          data: {
            book,
          },
        });
      }
      
      return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
};

//Fungsi edit data buku
function editBookByHandler(req, res){
    const { id } = req.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;
    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === id);

    if (!name){
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
      }
    
      if(readPage > pageCount){
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
      }

    if (index !== -1) {
        books[index] = {
          ...books[index],
          name,
          year,
          author,
          summary,
          publisher,
          pageCount,
          readPage,
          reading,
          updatedAt,
        };
     
        return res.status(200).json({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        });
      }

      return res.status(404).json({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      });
};

//Fungsi hapus data buku berdasarkan ID
function deleteBookIdByHandler(req, res){
    const { id } = req.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        return res.status(200).json({
          status: 'success',
          message: 'Buku berhasil dihapus',
        });
      }

      return res.status(404).json({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      });
};

module.exports = { addBooksHandler, getAllBooksHandler, getBooksByIdHandler, editBookByHandler, deleteBookIdByHandler,};