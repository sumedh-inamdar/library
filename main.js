/*
Library
Creator: Sumedh Inamdar
*/

// DOM nodes
const formCont = document.querySelector('.addForm');
const form = document.querySelector('.libForm');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const table = document.querySelector('tbody');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    changeRead = () => {
        this.read = !this.read;
    }
}
class Library {
    constructor() {
        this.myLib = [];
    }
    addBook() {
        const newBook = new Book(
            title.value,
            author.value,
            pages.valueAsNumber,
            read.checked);
        
        if (this.duplicateExists(newBook)) {
            this.displayDuplicate();
        } else {
            this.removeDuplicate();
            this.myLib.push(newBook);
            localStorage.setItem('myLibrary', JSON.stringify(this.myLib));
        }

        this.updateLibrary();
        // event.preventDefault();
    }
    
    duplicateExists(inputBook) {
        return this.myLib.some(libBook => Object.keys(inputBook).every(key => libBook[key] == inputBook[key]));
    }
    
    displayDuplicate() {
        if (!form.nextElementSibling) {
            const dupeString = document.createElement('p');
            dupeString.textContent = 'Book already exists in Library';
            formCont.appendChild(dupeString);
        }
    }

    removeDuplicate() {
        //removes duplicate book message from formCont
        if (form.nextElementSibling) {
            formCont.removeChild(formCont.lastChild);
        }
    }

    updateLibrary() {
        table.textContent = '';
        this.myLib.forEach((book, index) => {
            
            //Create row
            const row = document.createElement('tr');

            //Add title to row
            const bookTitle = document.createElement('td');
            bookTitle.textContent = book.title;
            row.appendChild(bookTitle);

            //Add author to row
            const bookAuthor = document.createElement('td');
            bookAuthor.textContent = book.author;
            row.appendChild(bookAuthor);

            //Add pages to row
            const bookPages = document.createElement('td');
            bookPages.textContent = book.pages;
            row.appendChild(bookPages);

            //Add read to row
            const bookRead = document.createElement('td');
            const readIcon = document.createElement('i');
            const readSelect = book.read ? 'fa-check-circle' : 'fa-times-circle';
            readIcon.classList.add('far', readSelect);
            readIcon.addEventListener('click', () => {
                book.changeRead();
                localStorage.setItem('myLibrary', JSON.stringify(this.myLib));
                this.updateLibrary();
            });
            bookRead.appendChild(readIcon);
            row.appendChild(bookRead);    
            
            //Add delete to row
            const remove = document.createElement('td');
            const removeIcon = document.createElement('i');
            removeIcon.classList.add('far', 'fa-trash-alt');
            removeIcon.setAttribute('data-index', index);
            removeIcon.addEventListener('click', (e) => {
                const indexDel = e.target.getAttribute('data-index');
                this.myLib.splice(indexDel, 1);
                localStorage.setItem('myLibrary', JSON.stringify(this.myLib));
                this.updateLibrary();
            })
            remove.appendChild(removeIcon);
            row.appendChild(remove);

            //Append row to table
            table.appendChild(row);

        });
    }
}

let myLibrary = new Library();

form.addEventListener('submit', (event) => {
    myLibrary.addBook();
    event.preventDefault();
});

// Startup sequence
if (localStorage.myLibrary) {
    //load localStorage data into myLibrary (global variable)
    myLibrary.myLib = JSON.parse(localStorage.getItem('myLibrary'));
    myLibrary.updateLibrary();
} else {
    localStorage.setItem('myLibrary', JSON.stringify([]));
}