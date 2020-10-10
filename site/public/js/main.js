var emailInput = document.getElementById('inputEmail');
var passwordInput = document.getElementById('inputPassword');

document.querySelector('form.form-signin').addEventListener('submit', function (e) {

    //prevent the normal submission of the form
    e.preventDefault();

    console.log(emailInput.value);
    console.log(passwordInput.value);
    $.ajax({
        type: "POST",
        url: "./api/create_user.php",
        data: { 'emailInput': emailInput.value, 'passwordInput': passwordInput.value },
        //dataType: 'json', this breaks everything look into why
        success: function () {
            console.log("it worked");
        },
        error: function () {
            console.log("it did not work");
        },
    });
});

