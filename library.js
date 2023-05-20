let bRead = document.getElementById("b-read");
let addRead = document.getElementById("add-read");
let addReading = document.getElementById("add-reading");

let booksFinished = [];
let booksReading = [];

function Book(title, author, pages){
    this.title = title
    this.author = author
    this.pages = pages
}


function addBookToLibrary(title, author, pages){
    const newBook = new Book(title, author, pages);
    booksFinished.push(newBook);
    console.log(booksFinished);
} 

const displayBooks = (arr) => {
    arr.forEach((element) => {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");
        const bookTitle = document.createElement("p");
        bookTitle.classList.add("b-title");
        bookTitle.textContent = `Title: ${element.title}`;
        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("b-author");
        bookAuthor.textContent = `Author: ${element.author}`;
        const bookPages = document.createElement("p");
        bookPages.classList.add("b-pages");
        bookPages.textContent = `Pages read: ${element.pages}`;
        bookContainer.append(bookTitle, bookAuthor, bookPages);
        bRead.insertBefore(bookContainer, addRead);
    });
}

addBookToLibrary("Hobbit", "Your", 22);
addBookToLibrary("Jurnal", "Nicolae", 33);

displayBooks(booksFinished);