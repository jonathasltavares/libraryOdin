// Recupera os dados do localStorage ou inicia com array vazio
let myLibrary = JSON.parse(localStorage.getItem("books")) || [];

const form = document.getElementById('bookForm');
const content = document.getElementById('content');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "Read" : "Not read yet"}`;
};

// Converte os objetos recuperados em instâncias de Book
myLibrary = myLibrary.map(bookData =>
    new Book(bookData.title, bookData.author, bookData.pages, bookData.read)
);

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    localStorage.setItem("books", JSON.stringify(myLibrary));
    renderCards(); // Atualiza a interface após adicionar
}

form.onsubmit = function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const bookToSave = {
        title: formData.get('title'),
        author: formData.get('author'),
        pages: formData.get('pages'),
        read: formData.get('isRead') === "true" // Converte para booleano
    };

    addBookToLibrary(bookToSave.title, bookToSave.author, bookToSave.pages, bookToSave.read);
    form.reset(); // Limpa o formulário após envio
};

function renderCards() {
    // Limpa o conteúdo atual para evitar duplicação
    content.innerHTML = "";
    
    myLibrary.forEach((book, index) => {
        content.innerHTML += `
            <div class="bookCard">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
                <p><strong>Status:</strong> ${book.read ? "Read" : "Not read yet"}</p>
                <button class="action-button" onclick="toggleRead(${index})">
                    ${book.read ? "Mark as Unread" : "Mark as Read"}
                </button>
                <button class="action-button" onclick="deleteBook(${index})">Delete</button>
            </div>
        `;
    });
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(myLibrary));
    renderCards();
}

function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read;
    localStorage.setItem("books", JSON.stringify(myLibrary));
    renderCards();
}

window.onload = function() {
    renderCards(); // Renderiza os livros salvos ao carregar a página
};
