var emailInput = document.getElementById('inputEmail');
var passwordInput = document.getElementById('inputPassword');

document.querySelector('form.form-signin').addEventListener('submit', function (e) {

    //prevent the normal submission of the form
    e.preventDefault();

    console.log(emailInput.value);
    console.log(passwordInput.value);
});
