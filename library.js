const bRead = document.getElementById("b-read");
const bReading = document.getElementById("b-reading");
const addButtons = document.querySelectorAll(".add");
const addRead = document.getElementById("add-read");
const addReading = document.getElementById("add-reading");
const formSection = document.querySelector(".form-section");
const form = document.getElementById("nb-form");
const cancelButton = document.getElementById("cancel");

let booksReadArr = [];
let booksReadingArr = [];

function Book(title, author, pagesRead, pagesTotal, read){
    this.title = title
    this.author = author
    this.pagesRead = pagesRead
    this.pagesTotal = pagesTotal
    this.read = read;
}


const addBookToArr = (title, author, pagesRead, pagesTotal, read) => {
    const newBook = new Book(title, author, pagesRead, pagesTotal, read);
    if (newBook.read){
        booksReadArr.push(newBook);        
    } else {
        booksReadingArr.push(newBook);
    }
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

const inputToBook = event => {
    event.preventDefault();
    let f = event.target;
    let arr;
    if (f["pages-read"].value < f["book-pages"].value){
        f.read = null;
        arr = booksReadingArr;
    } else {
        f.read = read;
        arr = booksReadArr;
    }
    addBookToArr(f["book-title"].value, f["book-author"].value, f["pages-read"].value, f["book-pages"].value, f.read);
    if(arr === booksReadingArr){
        while (!bReading.firstElementChild.classList.contains("add")){   //Use firstElementChild instead of firstChild. Otherwise the white space inserted here between divs creates a #text node.
            bReading.removeChild(bReading.firstChild);
        }
        displayBooks(booksReadingArr);  
    } else if (arr === booksReadArr){
        while (!bRead.firstElementChild.classList.contains("add")){ 
            bRead.removeChild(bRead.firstChild);
        }
        displayBooks(booksReadArr);
    }
}

form.addEventListener("submit", inputToBook);

//Change form visibility by clicking on an "add book" button

const formVisibility = () => {
    for(let addButton of addButtons){
        addButton.addEventListener("click", () => {
            formSection.style.visibility = "visible";
            formSection.style.opacity = "1";
        });
    }
    cancelButton.addEventListener("click", () => {
        formSection.style.visibility = "hidden";
        formSection.style.opacity = "0";
    });
}

formVisibility();

