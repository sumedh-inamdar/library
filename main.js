let myLibrary = [];

const formCont = document.querySelector('.addForm');
const form = document.querySelector('.libForm');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const table = document.querySelector('tbody');

form.addEventListener('submit', addBookToLibrary);


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    let str = title + ' by ' + author + ', ';
    str += pages + ' pages, ';
    str += read ? 'read' : 'not read yet';
    return str;
}

Book.prototype.changeRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(event) {
    const newBook = createBook();
    // check if duplicate exists else proceed
    if (ifDuplicateExists(newBook)) {
        displayDuplicate();
    } else {
        removeDuplicate();
        myLibrary.push(newBook);
    }
    updateLibrary();
    event.preventDefault();
}

function ifDuplicateExists(bookToCheck) {
    return myLibrary.some(libBook =>
        Object.keys(bookToCheck).every(key => libBook[key] == bookToCheck[key])
    );
}

function displayDuplicate() {
    if (!form.nextElementSibling) {
        const dupeString = document.createElement('p');
        dupeString.textContent = 'Book already exists in Library';
        formCont.appendChild(dupeString);
    }
}

function removeDuplicate() {
    if (form.nextElementSibling) {
        formCont.removeChild(formCont.lastChild);
    }
}

function createBook() {
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookPages = pages.valueAsNumber;
    const bookRead = read.checked;
    return new Book(bookTitle, bookAuthor, bookPages, bookRead);
}

function updateLibrary() {
    table.textContent = '';
    myLibrary.forEach((book, index) => {
        const row = document.createElement('tr');

        // Book title
        const bookTitle = document.createElement('td');
        bookTitle.textContent = book.title;
        row.appendChild(bookTitle);

        // Book Author
        const bookAuthor = document.createElement('td');
        bookAuthor.textContent = book.author;
        row.appendChild(bookAuthor);

        // Book Pages
        const bookPages = document.createElement('td');
        bookPages.textContent = book.pages;
        row.appendChild(bookPages);

        // Book read
        const bookRead = document.createElement('td');
        const readIcon = document.createElement('i');
        const readSelect = book.read ? 'fa-check-circle' : 'fa-times-circle';
        readIcon.classList.add('far', readSelect);

        readIcon.addEventListener('click', () => {
            book.changeRead();
            updateLibrary();
        });
        bookRead.appendChild(readIcon);
        row.appendChild(bookRead);
        

        // Book Removal
        const remove = document.createElement('td');
        const removeIcon = document.createElement('i');
        removeIcon.classList.add('far', 'fa-trash-alt');
        removeIcon.setAttribute('data-index', index);
        removeIcon.addEventListener('click', (e) => {
            const indexDel = e.target.getAttribute('data-index');
            myLibrary.splice(indexDel, 1);
            updateLibrary();
        })
        remove.appendChild(removeIcon);
        row.appendChild(remove);

        table.appendChild(row);
    });
}

