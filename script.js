
document.addEventListener('DOMContentLoaded', () => {
    let books = JSON.parse(localStorage.getItem('books')) || [];

    function displayBooks() {
        const bookList = document.getElementById('books');
        bookList.innerHTML = '';
        books.forEach((book, index) => {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeBook(index);
            });
            li.appendChild(removeButton);
            bookList.appendChild(li);
        });
    }
    function saveBooks() {
        localStorage.setItem('books', JSON.stringify(books));
    } 

    function addBook(event) {
        event.preventDefault();
        const title = document.getElementById('text').value;
        const author = document.getElementById('author').value;
        books.push({ title, author });
        saveBooks();
        displayBooks();
        document.getElementById('book-form').reset();
    }

    function removeBook(index) {
        books = books.filter((book, i) => i !== index);
        saveBooks();
        displayBooks();
    }

    document.getElementById('book-form').addEventListener('submit', addBook);

    displayBooks();
});
