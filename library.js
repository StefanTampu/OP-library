const bRead = document.getElementById("b-read");
const bReading = document.getElementById("b-reading");
const addButtons = document.querySelectorAll(".add");
const addRead = document.getElementById("add-read");
const addReading = document.getElementById("add-reading");
const formSection = document.querySelector(".form-section");
const form = document.getElementById("nb-form");
const formPRead = document.getElementById("pages-read");
const totalPages = document.getElementById("book-pages");
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
        let a = arr.indexOf(element); 

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

        const iconContainer = document.createElement("div");
        iconContainer.classList.add("icon-container")
        
        const removeIcon = document.createElement("img");
        removeIcon.src="Resources/book-minus.svg";
        removeIcon.classList.add("icon", "remove");
        removeIcon.setAttribute("id", a);

        const editIcon = document.createElement("img");
        editIcon.src="Resources/book-edit.svg";
        editIcon.classList.add("icon", "edit");
        editIcon.setAttribute("id", a);

        iconContainer.append(removeIcon, editIcon);
        bookContainer.append(bookTitle, bookAuthor, bookPages, iconContainer);
        if(arr === booksReadArr){
            bRead.insertBefore(bookContainer, addRead);
        } else if(arr === booksReadingArr){
            bReading.insertBefore(bookContainer, addReading);
        }
    });
}

//Change form visibility by clicking on an "add book" button

const formVisibility = () => {
    for(let addButton of addButtons){
        addButton.addEventListener("click", () => {
            formSection.style.visibility = "visible";
            formSection.style.opacity = "1";
            if (addButton.id === "add-read"){
                form.removeChild(formPRead);
            } else {
                form.insertBefore(formPRead, totalPages);
            }
        });
    }
    cancelButton.addEventListener("click", () => {
        formSection.style.visibility = "hidden";
        formSection.style.opacity = "0";
    });
}

formVisibility();

//Function changes form input into new Book objects

const inputToBook = event => {
    event.preventDefault();
    let arr;
    if (form.children[3] !== formPRead || form["pages-read"].value === form["book-pages"].value){
        form.read = read;
        arr = booksReadArr;
        addBookToArr(form["book-title"].value, form["book-author"].value, form["book-pages"].value, form["book-pages"].value, form.read);
        while (!bRead.firstElementChild.classList.contains("add")){   //Use firstElementChild instead of firstChild. Otherwise the white space inserted here between divs creates a #text node.
            bRead.removeChild(bRead.firstChild);
        }
        displayBooks(arr);  
    } else {
        form.read = null;
        arr = booksReadingArr;
        addBookToArr(form["book-title"].value, form["book-author"].value, form["pages-read"].value, form["book-pages"].value, form.read);
        while (!bReading.firstElementChild.classList.contains("add")){ 
            bReading.removeChild(bReading.firstChild);
        }
        displayBooks(arr);  
    }
}

form.addEventListener("submit", inputToBook);

//Delete book functions. *Note that the events are delegated to bRead and bReading, to impact all grand-children remove buttons.
bRead.addEventListener("click", (event) => {
    if(event.target.classList.contains("remove")){
        booksReadArr.splice(event.target.id, 1);
        while (!bRead.firstElementChild.classList.contains("add")){ 
            bRead.removeChild(bRead.firstChild);
        }
        displayBooks(booksReadArr);
    }
})

bReading.addEventListener("click", (event) => {
    if(event.target.classList.contains("remove")){
        booksReadingArr.splice(event.target.id, 1);
        while (!bReading.firstElementChild.classList.contains("add")){ 
            bReading.removeChild(bReading.firstChild);
        }
        displayBooks(booksReadingArr);  
    }
})

//Edit button clicked

bRead.addEventListener("click", (event) => {
    if(event.target.classList.contains("edit")){
        booksReadArr.splice(event.target.id, 1);
        bRead.removeChild(event.target.parentElement.parentElement);
        formSection.style.visibility = "visible";
        formSection.style.opacity = "1";
        form.insertBefore(formPRead, totalPages);
    }
})

bReading.addEventListener("click", (event) => {
    if(event.target.classList.contains("edit")){
        booksReadingArr.splice(event.target.id, 1);
        bReading.removeChild(event.target.parentElement.parentElement);
        formSection.style.visibility = "visible";
        formSection.style.opacity = "1";
        form.insertBefore(formPRead, totalPages);
    }
})