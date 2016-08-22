/**
 * Created by Администратор on 5/16/2016.
 */
var validation = {};

function validationObjectFilling() {
    validation.title = document.getElementById("title-of-book").value;
    validation.authors = document.getElementById("authors").value;
    validation.pages = document.getElementById("pages-of-book").value;
    if (document.getElementById("publication-company-of-book").length) {
        validation.publication = document.getElementById("publication-company-of-book").value;
    } else {
        validation.publication = "No Company";
    }
    validation.year = document.getElementById("publication-year-of-book").value;
    validation.edition = document.getElementById("date-of-edition").value;
    validation.isbn = document.getElementById("isbn").value;
}

/**
 * Set the data of new book to the localStorage
 * @param object
 */
function setToStorage(object) {
    //console.log(object);
    var listBooks = getStorage() || [];
    listBooks.push(object);
    localStorage.setItem("list-books", JSON.stringify(listBooks));
}

/**
 * Return the data of the chosen book
 */
function getStorage() {
    var listBooks = localStorage.getItem("list-books");
    return JSON.parse(listBooks) || [];
}

function rewriteStorage(arr) {
    localStorage.setItem("list-books", JSON.stringify(arr));
}

/**
 * Add new book to the list and redirection to the main page
 * @param e
 */
function addNewBook(e) {
    e.preventDefault();
    //console.log(validation);
    var newObject = {};
    for (key in validation) {
        newObject[key] = validation[key];
        //console.log(validation[key].value);
    }
    newObject.uniqId = Date.now();
    //console.log(newObject);
    setToStorage(newObject);
    redirectTo("index.html");
}

/**
 * redirect to the home page
 * @param page{string}
 */
function redirectTo(page) {
    window.location.href = page;
}

/**
 * detect the index.html page
 */
function detectThePageListItems() {
    if ($("#list-container").length) {
        console.log('fdgdf');
        //console.log("Page is here");
        var listBooks = getStorage();
        console.log(listBooks);
        if (listBooks) {
            listBooks.forEach(function (item, i) {
                insertDataToNewListItem(item);
            });
        }
    } else {
        console.log("123");
    }
}

/*
 * sort books by the year of publication
 * */
function sortBooksByYearPublication(e) {
    e.preventDefault();
    var storage = getStorage();
    var tempSortedObject = _.sortBy(storage, function (item) {
        return item.year;
    });
    var liArr = document.querySelectorAll("li.list-item");
    liArr.forEach(function (element, index) {
        element.remove();
    });
    tempSortedObject.forEach(function (element, index) {
        insertDataToNewListItem(element);
    });
    var newLiArr = document.querySelectorAll("li.list-item");
    newLiArr.forEach(function (element, index) {
        $(element).addClass("animated fadeInLeft");
    });
}

function sortBooksByTitle(e) {
    e.preventDefault();
    var storage = getStorage();
    var tempSortedObject = _.sortBy(storage, function (item) {
        return item.title;
    });
    var liArr = document.querySelectorAll("li.list-item");
    liArr.forEach(function (element, index) {
        element.remove();
    });
    tempSortedObject.forEach(function (element, index) {
        insertDataToNewListItem(element);
    });
    var newLiArr = document.querySelectorAll("li.list-item");
    newLiArr.forEach(function (element, index) {
        $(element).addClass("animated fadeInRight");
    });
}

function insertDataToNewListItem(object) {
    var element = '<li class="list-item" data-id=' + object.uniqId + '> ' +
        '<a href="#"> ' +
        '<img src="" alt="" data-id=' + object.uniqId + '> ' +
        '<ul class="list-item-description">' +
        ' <li> <p class="desc">Title: </p> <p class="title">' + object.title + '</p> </li>' +
        ' <li> <p class="desc">Authors: </p> <p class="authors">' + object.authors + '</p> </li> ' +
        '<li><p class="desc">Pages: </p> <p class="pages">' + object.pages + '</p> </li> ' +
        '<li> <p class="desc">Publication Company:</p> <p class="publication">' + object.publication + '</p> </li> ' +
        '<li> <p class="desc">Year of Publication:</p> <p class="year">' + object.year + '</p> </li>' +
        ' <li> <p class="desc">Date of Edition: </p> <p class="edition">' + object.edition + '</p> </li>' +
        ' <li> <p class="desc">ISBN: </p> <p class="isbn">' + object.isbn + '</p> </li>' +
        ' <li class="list-item-description-buttons"> ' +
        '<div class="manage"> <a href="#"><button class="edit" data-id=' + object.uniqId + '>Edit</button></a> <a href="#"><button class="remove" data-id="' + object.uniqId + '">Delete</button></a> </div> ' +
        '</li> ' +
        '</ul>' +
        ' </a> ' +
        '</li>';
    $(".list-view").append(element);
}

function deleteBook(e) {
    e.preventDefault();
    var id = $(this).data("id");
    console.log(id);
    $(this).parents(".list-item").remove();
    var storage = getStorage();
    storage.forEach(function (element, index) {
        if (element.uniqId === id) {
            console.log(12334);
            storage.splice(index, 1);
        }
    });
    console.log(storage);
    rewriteStorage(storage);
}

/*
 * This function takes the info about the chosen to edit book and puts into the new localStorage called DBId
 * */
function editThisBook(e) {
    e.preventDefault();
    var id = $(this).data("id");
    console.log(id);
    var tempObject = {};
    var storage = getStorage();
    storage.forEach(function (element, index) {
        if (element.uniqId === id) {
            tempObject = element;
        }
    });
    console.log(tempObject);
    localStorage.setItem("DBId", tempObject.uniqId);
    redirectTo("add-new-book-to-list.html");
}

/*
 * This  function takes the info of the book which you re gonna edit and use "fillAllFields" function
 * */
function addEditInfo() {
    if ($("#add-book-check").length && localStorage.getItem("DBId")) {
        document.getElementById("add-but").innerHTML = "Save Changings";
        var editObject = localStorage.getItem("DBId");
        console.log(editObject);
        var storage = getStorage();
        storage.forEach(function (element, index) {
            if (element.uniqId == editObject) {
                fillAllFields(element);
            }
        });
    } else {
        console.log("nothing");
    }
}

/*
 *
 * */
function ChangeInfoInLocalStorage(e) {
    e.preventDefault();
    var storage = getStorage();
    var dbid = localStorage.getItem("DBId");
    storage.forEach(function (element, index) {
        if (element.uniqId == dbid) {
            element.title = document.getElementById("title-of-book").value;
            element.authors = document.getElementById("authors").value;
            element.pages = document.getElementById("pages-of-book").value;
            element.publication = document.getElementById("publication-company-of-book").value;
            element.year = document.getElementById("publication-year-of-book").value;
            element.edition = document.getElementById("date-of-edition").value;
            element.isbn = document.getElementById("isbn").value;
        }
    });
    rewriteStorage(storage);
    redirectTo('index.html');
}

/*
 * When you edit the existed book, this function adds values to the input fields
 * */
function fillAllFields(object) {
    if ($("#add-book-check").length && localStorage.getItem("DBId")) {
        document.getElementById("title-of-book").value = object.title;
        document.getElementById("authors").value = object.authors;
        document.getElementById("pages-of-book").value = object.pages;
        document.getElementById("publication-company-of-book").value = object.publication;
        document.getElementById("publication-year-of-book").value = object.year;
        document.getElementById("date-of-edition").value = object.edition;
        document.getElementById("isbn").value = object.isbn;
    }
}

/*
 * To clear the local storage (DBId)
 * */
function clearDBId() {
    localStorage.removeItem("DBId");
}

addEditInfo();
detectThePageListItems();

/*
 * Open popup to change a title of the page
 * */
function openPopUp() {
    setTimeout(function () {
        $("#background-gray-color").addClass("active");
        $("#pop-up").addClass("animated fadeInUp");
        $("#pop-up").addClass("active");
    }, 500)
}


/*
 * Close popup to change a title of the page
 * */
function clPopUp() {
    $("#pop-up").removeClass("animated fadeInUp");
    $("#pop-up").removeClass("active");
    $("#background-gray-color").removeClass("active");
    document.getElementById("if-title-exist").style.display = "none";
}


/*
 * Creates all elements inside the popup and then took an old title from local storage
 * */
function changeTitleOfThePage() {
    var oldTitle = {};
    if (!localStorage.getItem('title-name')) {
        oldTitle = 'My Book Collection - List of Books';
    } else {
        oldTitle = JSON.parse(localStorage.getItem("title-name"))
    }
    var popupInside = '<div class="out-popup">' + '<h1 class="old-title">' + oldTitle.title + '</h1> ' +
        '<p class="desc-of-this old-title-description">(This is old tile of the page)</p>' +
        '<input type="text" id="new-title" class="new-title-input">' +
        '<p class="errorHere animated rotateIn" id="if-title-exist">Please, type the title of the page</p>' +
        '<p class="desc-of-this input-description">Please, type here a new title of the page</p>' +
        '<button class="button-save-title" id="save-title">Save Title</button>' +
        '</div>';
    $("#pop-up").append(popupInside);
}

/*
 * Change the title on the main page and then reloads a page
 * */
function setNewTitle() {
    if (document.getElementById("new-title").value) {
        var titleObj = {
            title: document.getElementById("new-title").value,
            dateOfChange: Date.now()
        };
        localStorage.setItem("title-name", JSON.stringify(titleObj));
        redirectTo("index.html");
    } else {
        document.getElementById("if-title-exist").style.display = "block";
    }
}

/*
 * Saves the new title permanently
 * */
function appendNewTitle() {
    var title = JSON.parse(localStorage.getItem("title-name"));
    document.getElementById("the-highest-title").innerHTML = title.title;
}

function previewFile() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
    validation.picture = file;
}

function checkAuthorName() {
    var count = 0;
    var authorsArr = [];
    authorsArr = document.getElementById("authors").value.split(',');
    console.log(authorsArr);
    authorsArr.forEach(function (element, index) {
        if (element.indexOf(" ") == -1) {
            count++;
        }
    });
    if (count > 0) {
        return false;
    } else {
        return true;
    }
}

function checkTheYearOfTheDate() {
    var date = document.getElementById("date-of-edition").value;
    var checkYear = date.substr(date.length - 4);
    return checkYear > 1799;
}

function setUpPage() {
    if ($("#the-highest-title").length) {
        appendNewTitle();
        changeTitleOfThePage();
    }
    $(document).on("click", ".remove", deleteBook);
    $(document).on("click", ".edit", editThisBook);
    $("#sort-by-publication-year").on("click", sortBooksByYearPublication);
    $("#sort-by-title").on("click", sortBooksByTitle);
    $("#book-adition").on("click", clearDBId);
    $("#register-form").on("change", validationObjectFilling);
    if ($("#add-book-check").length && localStorage.getItem("DBId")) {
        $("#add-but").removeClass("bookAdd-disabled");
        $("#add-but").addClass("save-details");
        document.getElementById("checkThis").style.display = "none";
        $("#add-but").on("click", ChangeInfoInLocalStorage);
    } else {
        $.validator.addMethod('checkAuthors', function (value, element) {
            return this.optional(element)
                || checkAuthorName()
        }, 'Please, enter the full name of authors');

        $.validator.addMethod('checkTheFormatOfDate', function (value, element) {
            return this.optional(element)
                || /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(value)
        }, 'Please, enter the date in a right format');

        $.validator.addMethod('checkTheOldDates', function (value, element) {
            return this.optional(element)
                || checkTheYearOfTheDate()
        }, 'Only books which are newer than 1800 are allowed');

        $.validator.addMethod("isbnMatch", function (value, element) {
            return this.optional(element) ||
                /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/.test(value)
        }, 'Please, enter right format of ISBN');

        $.validator.setDefaults({
            errorClass: 'help-block animated bounceIn',
            highlight: function (element) {
                $(element)
                    .closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element)
                    .closest('.form-group').removeClass('has-error');
            }
        });
        var form = $("#register-form");

        form.validate({
            rules: {
                title: {
                    required: true,
                    maxlength: 30
                },
                authors: {
                    required: true,
                    checkAuthors: true
                },
                pages: {
                    required: true,
                    nowhitespace: true,
                    number: true,
                    range: [0, 10000]
                },
                publication: {
                    required: false,
                    maxlength: 30
                },
                year: {
                    required: true,
                    number: true,
                    min: 1800
                },
                edition: {
                    required: true,
                    checkTheFormatOfDate: true,
                    checkTheOldDates: true
                },
                isbn: {
                    required: true,
                    isbnMatch: true
                }
            },
            messages: {
                title: {
                    required: "This field is required",
                    maxlength: "It must contain no more than 30 characters"
                },
                authors: {
                    required: "This field is required"
                },
                pages: {
                    required: "This field is required",
                    nowhitespace: "Whitespace is not allowed here",
                    number: "You must enter only numbers",
                    range: "Enter the number between 0 and 10.000"
                },
                publication: {
                    required: "This field is required",
                    maxlength: "It must contain no more than 30 characters"
                },
                year: {
                    required: "This field is required",
                    number: "You must enter only number",
                    min: "Only books which are newer 1800 are allowed"
                },
                edition: {
                    required: "This field is required"
                },
                isbn: {
                    required: "This field is required"
                }
            }
        });
        $("#checkThis").click(function (e) {
            e.preventDefault();
            if (form.valid()) {
                $("#add-but").disabled = false;
                $("#add-but").removeClass("bookAdd-disabled");
                $("#add-but").addClass("bookAdd");
                $("#checkThis").removeClass("save-details");
                $("#checkThis").addClass("bookAdd-disabled");
                $("#add-but").on("click", addNewBook);
            }

        });
        $("#save-title").on("click", setNewTitle);
    }
    $("#edit-title-of-page").on("click", openPopUp);
    //$("#edit-title-of-page").on("click", changeTitleOfThePage);
    $("#background-gray-color").on("click", clPopUp);
}

window.addEventListener("load", setUpPage, false);

