const INCOMPLETE_LIST_BOOKSHELF_ID = "incompleteBookshelfList";
const COMPLETE_LIST_BOOKSHELF_ID = "completeBookshelfList";
const BOOK_ID = "bookId";

function makeBook(title /* string */, author  /* string */, year /* number */, isCompleted /* boolean */) {
    
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("author");
    bookAuthor.innerText = "Penulis: " + author;

    const bookYear = document.createElement("p");
    bookYear.classList.add("year");
    bookYear.innerText = "Tahun: " + year;

    const div = document.createElement("div");
    div.classList.add("action");

    const article = document.createElement("article");
    article.classList.add("book_item");
    article.append(bookTitle, bookAuthor, bookYear);

    if(isCompleted) {
        div.append(createUndoButton(), createTrashButton());
    } else {
        div.append(createCheckButton(), createTrashButton());
    }

    article.append(div);
    return article;
}

function createUndoButton() {
    return createButton("unfinished-button", "Belum Selesai dibaca", "green", function(event) {
        unfinishedBook(event.target.parentElement.parentElement)
    });
}

function createCheckButton() {
    return createButton("finished-button", "Selesai dibaca", "green", function(event) {
        finishedBook(event.target.parentElement.parentElement)
    });
}

function createTrashButton() {
    return createButton("delete-button", "Hapus Buku", "red", function(event) {
        deleteBook(event.target.parentElement.parentElement)
    });
}

function createButton(buttonTypeClass, text, color, eventListener) {
    const button = document.createElement("button");
    button.classList = buttonTypeClass;
    button.innerText = text;
    button.classList = color;
    button.addEventListener("click", function(event) {
        eventListener(event);
    });

    return button;
}

function addBook() {
    const incompleteBook = document.getElementById(INCOMPLETE_LIST_BOOKSHELF_ID);
    const completeBook = document.getElementById(COMPLETE_LIST_BOOKSHELF_ID);
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    let isCompleted = document.getElementById("inputBookIsComplete");

    if(isCompleted.checked) {
        isCompleted = true;
    } else {
        isCompleted = false;
    }

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, isCompleted);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, isCompleted);

    newBook[BOOK_ID] = bookObject.id;
    books.push(bookObject);

    if(isCompleted) {
        completeBook.append(newBook);
    } else {
        incompleteBook.append(newBook);
    }

    updateDataToStorage();
}

function unfinishedBook(bookELement /* HTML Element */) {
    const incompleteBook = document.getElementById(INCOMPLETE_LIST_BOOKSHELF_ID);
    const bookTitle = bookELement.querySelector(".book_item > h3").innerText;
    const bookAuthor = bookELement.querySelector(".author").innerText.replace("Penulis: ", "");
    const bookYear = bookELement.querySelector(".year").innerText.replace("Tahun: ", "");
    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
    const book = findBook(bookELement[BOOK_ID]);

    book.isCompleted = false;
    newBook[BOOK_ID] = book.id;
    incompleteBook.append(newBook);
    bookELement.remove();

    updateDataToStorage();
}

function finishedBook(bookELement /* HTML Element */) {
    const completeBook = document.getElementById(COMPLETE_LIST_BOOKSHELF_ID);
    const bookTitle = bookELement.querySelector(".book_item > h3").innerText;
    const bookAuthor = bookELement.querySelector(".author").innerText.replace("Penulis: ", "");
    const bookYear = bookELement.querySelector(".year").innerText.replace("Tahun: ", "");
    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(bookELement[BOOK_ID]);

    book.isCompleted = true;
    newBook[BOOK_ID] = book.id;
    completeBook.append(newBook);
    bookELement.remove();

    updateDataToStorage();
}

function deleteBook(bookELement /* HTML Element */) {
    if(confirm("Apakan Anda yakin ingin menghapus data?")) {
        const bookPosition = findBookIndex(bookELement[BOOK_ID]);
        
        books.splice(bookPosition, 1);
        bookELement.remove();

        updateDataToStorage();   
    }
}

function refreshDataFromBooks () {
    const incompleteBook = document.getElementById(INCOMPLETE_LIST_BOOKSHELF_ID);
    const completeBook = document.getElementById(COMPLETE_LIST_BOOKSHELF_ID);

    for (book of books) {
        const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);

        newBook[BOOK_ID] = book.id;

        if(book.isCompleted) {
            completeBook.append(newBook);
        } else {
            incompleteBook.append(newBook);
        }
    }
}