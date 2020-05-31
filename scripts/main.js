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

function addCard() {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    const addButton = document.createElement('button');
    addButton.value = '+';
    addButton.textContent = '+';
    card.appendChild(addButton);
    main.appendChild(card);
    addEventListeners();
}

function addEventListeners() {
    const plus = document.querySelector('button[value="+"]');
    plus.addEventListener('click', bringUpForm);
}

function renderDetails(details, tmp) {
    let title = document.createElement('p');
    title.textContent = tmp.title;
    details.appendChild(title);

    let author = document.createElement('p');
    author.textContent = "By " + tmp.author;
    details.appendChild(author);

    let pages = document.createElement('p');
    pages.textContent = tmp.pages + " pages";
    details.appendChild(pages);

    let read = document.createElement('p');
    read.textContent = tmp.read;
    details.appendChild(read);
}

function  addOptions(options, tmp) {
    let edit = document.createElement('button');
    edit.textContent = 'Edit';
    // edit.addEventListener('click', bringUpForm(tmp));
    options.appendChild(edit);

    let del = document.createElement('button');
    del.textContent = 'Delete';
    del.addEventListener('click', deleteCard);
    options.appendChild(del);

    let read = document.createElement('button');
    read.textContent = 'Read';
    options.appendChild(read);
}


function deleteCard() {
    let card = this.parentNode.parentNode.parentNode;
    main.removeChild(card);
    // console.log(main.child);
}

function addBookToLibrary() {
    const card = this.parentNode.parentNode;
    let title = document.bookInfo.title.value;
    let author = document.bookInfo.author.value;
    let pages = document.bookInfo.pages.value;
    let read = document.bookInfo.read.value;

    let tmp = new Book(title, author, pages, read);
    myLibrary.push(tmp);

    const infoCard = document.createElement('div');
    infoCard.setAttribute('class', 'infoCard');

    const image = document.createElement('img');
    image.setAttribute('src', 'assets/images/sample2.png');
    infoCard.appendChild(image);

    const details = document.createElement('div');
    renderDetails(details, tmp);
    infoCard.appendChild(details);

    const options = document.createElement('div');
    addOptions(options, tmp);
    infoCard.appendChild(options);

    card.removeChild(card.firstElementChild);
    card.appendChild(infoCard);

    addCard();
}

function addInputFields(form, book, property) {
    const label = document.createElement('label');
    label.setAttribute('for', property);
    label.textContent = property;
    form.appendChild(label);
    const input = document.createElement('input');
    input.setAttribute('id', property);
    if (property === 'pages')
        input.setAttribute('type', 'number');
    // input.textContent = myLibrary[];
    input.textContent = book[property];
    form.appendChild(input);
    let br = document.createElement('br')
    form.appendChild(br);
}

function bringUpForm(book= new Book('', '', '', '')) {
    const card = this.parentNode;
    card.removeChild(card.lastElementChild);

    const form = document.createElement('form');
    form.setAttribute('name','bookInfo');
    bookProperties.forEach(property => addInputFields(form, book, property));
    card.appendChild(form);

    const save = document.createElement('input');
    save.type = 'button';
    save.value = 'Save';
    form.appendChild(save);
    save.addEventListener('click', addBookToLibrary);
}

const main = document.querySelector('main');
const plus = document.querySelector('button[value="+"]');
plus.addEventListener('click', bringUpForm);
