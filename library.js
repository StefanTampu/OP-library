let bRead = document.getElementById("b-read");

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

function displayBooks(arr){
    for(let i=0; i++; arr.length){
    
    }
}


addBookToLibrary("Hobbit", "Your", 22);
addBookToLibrary("Jurnal", "Nicolae", 33);