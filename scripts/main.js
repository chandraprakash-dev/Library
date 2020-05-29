let myLibrary = [];
let bookProperties = ['title', 'author', 'pages', 'read'];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function render() {
    myLibrary.forEach(book => console.log(book));
}

function addBookToLibrary() {
    const card = this.parentNode.parentNode;
    let title = document.bookInfo.title.value;
    let author = document.bookInfo.author.value;
    let pages = document.bookInfo.pages.value;
    let read = document.bookInfo.read.value;

    let tmp = new Book(title, author, pages, read);
    myLibrary.push(tmp);

    card.removeChild(card.firstElementChild)
}

function createInput(form, property) {
    const label = document.createElement('label');
    label.setAttribute('for', property);
    label.textContent = property;
    form.appendChild(label);
    const input = document.createElement('input');
    input.setAttribute('id', property);
    if (property === 'pages')
        input.setAttribute('type', 'number');
    form.appendChild(input);
    let br = document.createElement('br')
    form.appendChild(br);
}

function bringUpForm(e) {
    const card = this.parentNode;
    card.removeChild(card.lastElementChild);

    const form = document.createElement('form');
    form.setAttribute('name','bookInfo');
    bookProperties.forEach(property => createInput(form, property));

    card.appendChild(form);

    const save = document.createElement('input');
    save.type = 'button';
    save.value = 'Save';
    form.appendChild(save);
    save.addEventListener('click', addBookToLibrary);

    // submit.addEventListener('click', addBookToLibrary);
    const display = document.createElement('button');
    display.textContent = 'Display';
    display.addEventListener('click', render);
    card.appendChild(display);

}

const plus = document.querySelector('button[value="+"]');
plus.addEventListener('click', bringUpForm);
