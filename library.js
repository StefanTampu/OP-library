const bRead = document.getElementById("b-read");
const bReading = document.getElementById("b-reading");
const addButton = document.querySelectorAll(".add");
const addRead = document.getElementById("add-read");
const addReading = document.getElementById("add-reading");
const form = document.getElementById("nb-form");

let booksReadArr = [];
let booksReadingArr = [];

function Book(title, author, pagesRead, pagesTotal){
    this.title = title
    this.author = author
    this.pagesRead = pagesRead
    this.pagesTotal = pagesTotal
}


function addBookToRead(title, author, pagesRead, pagesTotal){
    const newBook = new Book(title, author, pagesRead, pagesTotal);
    booksReadArr.push(newBook);
} 

function addBookToReading(title, author, pagesRead, pagesTotal){
    const newBook = new Book(title, author, pagesRead, pagesTotal);
    booksReadingArr.push(newBook);
} 


//Function for displaying books from arrays in library//
const displayBooks = arr => {
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
        bookPages.textContent = `Pages read: ${element.pagesRead} / ${element.pagesTotal}`;
        bookContainer.append(bookTitle, bookAuthor, bookPages);
        if(arr === booksReadArr){
            bRead.insertBefore(bookContainer, addRead);
        } else if(arr === booksReadingArr){
            bReading.insertBefore(bookContainer, addReading);
        }
    });
}

addBookToReading("Jurnal", "Nicolae", 33, 50);

displayBooks(booksReadArr);
displayBooks(booksReadingArr);

//Form input converted to book object//
//const inputToBook = event => {
    //event.preventDefault();//
    //const myFormData = new FormData(event.target);
    //console.log(myFormData);
//}

function trial(event){
    event.preventDefault();
    let f = event.target;
    const newBook = new Book(f["book-title"].value, f["book-author"].value, f["pages-read"].value, f["book-pages"].value)
    booksReadArr.push(newBook);
    while (!bRead.firstElementChild.classList.contains("add")){   //Use firstElementChild instead of firstChild. Otherwise the white space inserted here between divs creates a #text node.
        bRead.removeChild(bRead.firstChild);
    }
    displayBooks(booksReadArr);
}

form.addEventListener("submit", trial);