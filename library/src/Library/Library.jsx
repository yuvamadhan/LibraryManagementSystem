import React, { useState, useEffect } from 'react';
import './Library.css';

const ManageBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  useEffect(() => {
    fetchBooks();
  }, [searchTitle, searchAuthor]);

  const fetchBooks = async () => {
    try {
      let url = 'http://localhost:8000/api/books';
      const queryParams = [];
      if (searchTitle.trim() !== '') {
        queryParams.push(`title=${encodeURIComponent(searchTitle)}`);
      }
      if (searchAuthor.trim() !== '') {
        queryParams.push(`author=${encodeURIComponent(searchAuthor)}`);
      }
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const deleteBook = async (bookId) => {
    console.log(bookId)
    try {
      await fetch(`http://localhost:8000/api/books/${bookId}`, {
        method: 'DELETE',
      });
      
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setSearchAuthor(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const addBook = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      const data = await response.json();
      setBooks(data);
      setNewBook({ title: '', author: '' }); 
      window.location.reload();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <h1 className='title'>Manage Books</h1>
      <div className='searcht'>
        <label className='hello'>
          Search by Title:
          <input type="text" value={searchTitle} onChange={handleTitleChange} placeholder="Enter title..." />
          Search by Author:
          <input type="text" value={searchAuthor} onChange={handleAuthorChange} placeholder="Enter author..." />
        </label>
        
      </div>
      <div className='searcha'>
       
      </div>
      <h2 className='addbook'>Add New Book</h2>
      <form className='container1' onSubmit={(e) => { e.preventDefault(); addBook(); }}>
        <label>
          Title:
          <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />
        </label>
        <label>
          Author:
          <input type="text" name="author" value={newBook.author} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Book</button>
      </form>
      <table className='items'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td><button onClick={() => deleteBook(book.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooksPage;
