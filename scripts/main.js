let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function displayBooks() {
    console.log(myLibrary);
}

function addBookToLibrary() {
    let title = document.info.Title.value;
    let author = document.info.Author.value;
    let pages = document.info.Pages.value;
    let read = document.info.Read.value;

    let tmp = new Book(title, author, pages, read);
    myLibrary.push(tmp);
}

// const form = document.createElement('form');
// const input = document.createElement('input');
// form.appendChild(input);
// const main = document.querySelector('main');
// main.appendChild(form);

const submit = document.querySelector(`input[id="new"]`);
submit.addEventListener('click', addBookToLibrary);

const display = document.querySelector(`button[name="books"]`);
display.addEventListener('click', displayBooks);

