document.addEventListener("DOMContentLoaded", function() {
    const bookForm  = document.getElementById("inputBook");
    
    bookForm,addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
    });

    if(isStorageExist) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", function() {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", function() {
    refreshDataFromBooks();
})