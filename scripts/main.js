let myLibrary = [];
let bookProperties = ['Title', 'Author', 'Pages', 'Read'];

function Book(Title, Author, Pages, Read) {
    this.Title = Title;
    this.Author = Author;
    this.Pages = Pages;
    this.Read = Read;
}

function addCard() {
    let plus = document.querySelector('button[value="+"]');
    if(plus) return;
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
    let Title = document.createElement('p');
    Title.setAttribute('value', 'Title')
    Title.textContent = tmp.Title;
    details.appendChild(Title);

    let Author = document.createElement('p');
    Author.setAttribute('value', 'Author')
    Author.textContent = "By " + tmp.Author;
    details.appendChild(Author);

    let Pages = document.createElement('p');
    Pages.setAttribute('value', 'Pages')
    Pages.textContent = tmp.Pages + " Pages";
    details.appendChild(Pages);

    let Read = document.createElement('p');
    Read.setAttribute('value', 'Read')
    Read.textContent = tmp.Read;
    details.appendChild(Read);
}

function  addOptions(options, tmp) {

    let edit = document.createElement('button');
    edit.setAttribute('value', 'edit')
    edit.textContent = 'Edit';
    edit.addEventListener('click', bringUpForm);
    options.appendChild(edit);

    let del = document.createElement('button');
    del.setAttribute('value', 'delete')
    del.textContent = 'Delete';
    del.addEventListener('click', deleteCard);
    options.appendChild(del);

    let Read = document.createElement('button');
    Read.setAttribute('value', 'Read');
    Read.textContent = 'Read';
    Read.addEventListener('click', ReadStatus);
    options.appendChild(Read);
}

function ReadStatus() {
    let currentCard = this.parentNode.parentNode;
    let Read = currentCard.querySelector(`p[value="Read"]`);
    Read.textContent = 'yes';
}

function deleteCard() {
    let card = this.parentNode.parentNode.parentNode;
    main.removeChild(card);
}

function addBookToLibrary() {
    const card = this.parentNode.parentNode;
    let Title = document.bookInfo.Title.value;
    let Author = document.bookInfo.Author.value;
    let Pages = document.bookInfo.Pages.value;

    let readButtons = [...document.querySelectorAll('input[name="Read"]')];
    let selectedButton = readButtons.filter( readButton => readButton.checked)[0];
    let read = selectedButton.value;

    let tmp = new Book(Title, Author, Pages, Read);
    myLibrary.push(tmp);

    const infoCard = document.createElement('div');
    infoCard.setAttribute('class', 'infoCard');

    const image = document.createElement('img');
    image.setAttribute('src', 'assets/images/sample2.png');
    infoCard.appendChild(image);

    const details = document.createElement('div');
    details.setAttribute('value', 'details');
    renderDetails(details, tmp);
    infoCard.appendChild(details);

    const options = document.createElement('div');
    addOptions(options, tmp);
    infoCard.appendChild(options);

    card.removeChild(card.firstElementChild);
    card.appendChild(infoCard);

    addCard();
}

function  radioInputSection(property) {
    // Create a section for the property
    const section = document.createElement('section');
    section.setAttribute('id', property);

    // span for the choice heading
    const span = document.createElement('span');
    span.textContent = property;
    section.appendChild(span);
    let br = document.createElement('br');
    section.appendChild(br);

    // Radio button for yes
    const yesInput = document.createElement('input');
    yesInput.type = 'radio';
    yesInput.name = 'Read';
    yesInput.id = 'yes';
    yesInput.value = 'yes';
    section.appendChild(yesInput);
    const yesLabel = document.createElement('label');
    yesLabel.textContent = 'Yes'
    yesLabel.for = 'yes';
    section.appendChild(yesLabel)

    // Radio button for no
    const noInput = document.createElement('input');
    noInput.type = 'radio';
    noInput.name = 'Read';
    noInput.id = 'no';
    noInput.value = 'no';
    noInput.checked= "checked";
    section.appendChild(noInput);
    const noLabel = document.createElement('label');
    noLabel.textContent = 'No'
    noLabel.for = 'no';
    section.appendChild(noLabel);
    return section;
}

function addInputFields(form, book, property) {
    if (property === 'Read') {
        let section = radioInputSection(property);
        form.appendChild(section);
        return;
    }

    // Create a section for the property
    const section = document.createElement('section');
    section.setAttribute('id', property);

    // Add label for input
    const label = document.createElement('label');
    label.setAttribute('for', property);
    label.textContent = property;
    section.appendChild(label);
    let br = document.createElement('br');
    section.appendChild(br);

    // Add input field
    const input = document.createElement('input');
    input.setAttribute('id', property);
    if (property === 'Pages')
        input.setAttribute('type', 'number');
    input.value = book[property];
    section.appendChild(input);
    section.appendChild(br);

    // Add section to form
    form.appendChild(section);
}

function bringUpForm() {
    let caller = this.value;
    let card = '';
    let currentBook = ''
    if(caller === 'edit') {
        card = this.parentNode.parentNode.parentNode;
        let infoCard = this.parentNode.parentNode;
        let details = infoCard.querySelector('div[value="details"]');
        let Title = details.querySelector('p[value="Title"]');
        // retrieve book with Title
        currentBook = myLibrary.filter(book => book.Title === Title.textContent)[0];
    } else {
        card = this.parentNode;
        currentBook = new Book('', '', '', '');
    }

    card.removeChild(card.lastElementChild);

    const form = document.createElement('form');
    form.setAttribute('name','bookInfo');
    bookProperties.forEach(property => addInputFields(form, currentBook ,property));
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
