/**
 * Created by Администратор on 19.08.2016.
 */

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
    if (count > 0){
        return false;
    } else {
        return true;
    }
}

function checkTheYearOfTheDate(){
    var date = document.getElementById("date-of-edition").value;
    var checkYear = date.substr(date.length - 4);
    return checkYear > 1799;
}


$(function () {

    $.validator.addMethod('checkAuthors', function (value, element) {
        return this.optional(element)
            || checkAuthorName()
    }, 'Please, enter the full name of authors');

    $.validator.addMethod('checkTheFormatOfDate', function(value, element){
       return this.optional(element)
        || /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(value)
    }, 'Please, enter the date in a right format');

    $.validator.addMethod('checkTheOldDates', function(value, element){
       return this.optional(element)
        || checkTheYearOfTheDate()
    }, 'Only books which are newer than 1800 are allowed');

    $.validator.addMethod("isbnMatch", function(value, element){
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

    $("#register-form").validate({
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
                required: "This field is required",
            },
            pages: {
                required: "This field is required",
                nowhitespace: "Whitespace is not allowed here",
                number: "You must enter only numbers",
                range: "Enter the number between 0 and 10.000"
            },
            publication:{
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
});

$("#add-but").on("click", addNewBook);
