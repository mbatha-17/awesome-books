
// document.addEventListener('DOMContentLoaded', () => {
//     let books = JSON.parse(localStorage.getItem('books')) || [];

//     function displayBooks() {
//         const bookList = document.getElementById('books');
//         bookList.innerHTML = '';
//         books.forEach((book, index) => {
//             const li = document.createElement('li');
//             li.textContent = `${book.title} by ${book.author}`;
//             const removeButton = document.createElement('button');
//             removeButton.textContent = 'Remove';
//             removeButton.addEventListener('click', () => {
//                 removeBook(index);
//             });
//             li.appendChild(removeButton);
//             bookList.appendChild(li);
//         });
//     }
//     function saveBooks() {
//         localStorage.setItem('books', JSON.stringify(books));
//     } 

//     function addBook(event) {
//         event.preventDefault();
//         const title = document.getElementById('text').value;
//         const author = document.getElementById('author').value;
//         books.push({ title, author });
//         saveBooks();
//         displayBooks();
//         document.getElementById('book-form').reset();
//     }

//     function removeBook(index) {
//         books = books.filter((book, i) => i !== index);
//         saveBooks();
//         displayBooks();
//     }

//     document.getElementById('book-form').addEventListener('submit', addBook);

//     displayBooks();
// });


class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }
  
  class BookList {
    constructor() {
      this.books = this.loadBooks();
      this.displayBooks();
    }
  
    addBook(title, author) {
      const book = new Book(title, author);
      this.books.push(book);
      this.saveBooks();
      this.displayBooks();
    }
  
    removeBook(index) {
      this.books.splice(index, 1);
      this.saveBooks();
      this.displayBooks();
    }
  
    displayBooks() {
      const bookList = document.getElementById('books');
      if (!bookList) {
        console.error('Element with id "books" not found.');
        return;
    }

      bookList.innerHTML = '';
      this.books.forEach((book, index) => {
        const li = document.createElement('li');
        li.className = 'book-item';
        li.textContent = `${book.title} by ${book.author}`;
        const removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
          this.removeBook(index);
        });
        li.appendChild(removeButton);
        bookList.appendChild(li);
      });
    }
  
    saveBooks() {
      localStorage.setItem('books', JSON.stringify(this.books));
    }
  
    loadBooks() {
      const booksJSON = localStorage.getItem('books');
      return booksJSON ? JSON.parse(booksJSON) : [];
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const bookList = new BookList();
    
    document.getElementById('book-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('text').value;
      const author = document.getElementById('author').value;
      console.log('Form submitted:', { title, author });
      bookList.addBook(title, author);
      e.target.reset();
    });
  });

  window.addEventListener('storage', (event) => {
    if (event.key === 'books') {
    const bookList = new BookList();
    bookList.displayBooks();
    }
  });
  