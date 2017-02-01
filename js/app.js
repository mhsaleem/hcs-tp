$(document).ready(function () {
    var common = false;
    // Show/Hide Password Init.
    // Give focus on the password field immediately. Users can type without clicking
    //noinspection JSUnresolvedFunction,JSUnresolvedFunction,JSJQueryEfficiency
    $('#password').showPassword(true).focus();


    // Copy to clipboard btn
    //noinspection JSUnresolvedFunction,JSUnresolvedFunction
    var clipboard = new Clipboard('#clipboard');

    // Show notifications after password has been coppied
    clipboard.on('success', function (e) {

        toastr.success('Your password has been copied.', 'Success!');
        toastr.options.closeButton = true;
        toastr.options.preventDuplicates = true;
        toastr.options.timeOut = 2000;            // How long the toast will display without user interaction
        toastr.options.extendedTimeOut = 60;    // How long the toast will display after a user hovers over it
        e.clearSelection();
    });

    clipboard.on('error', function () {

        toastr.error('Your password could not be copied.', 'Error!');
        toastr.options.closeButton = true;
        toastr.options.preventDuplicates = true;
        toastr.options.timeOut = 2000;            // How long the toast will display without user interaction
        toastr.options.extendedTimeOut = 60;    // How long the toast will display after a user hovers over it
    });

    //noinspection JSJQueryEfficiency
    $("#password").on('change keydown paste input', function () {

        $("#password").complexify({}, function (valid, complexity) {

            var progressBar = $('#complexity-bar');
            var password = $('#password').val().trim();
            var complexityVal = $('#complexity');
            configureTips(password);
            progressBar.toggleClass('progress-bar-success', valid);


            if (password.length == 0) {
                complexityVal.text('');
                common = false;
            }
            else if (complexity >= 30 && complexity < 45) {

                progressBar.removeClass();
                progressBar.addClass('progress-bar').addClass('progress-bar-warning');
                complexityVal.text('Medium');
            }
            else if (complexity >= 45 && complexity < 65) {

                progressBar.removeClass();
                progressBar.addClass('progress-bar').addClass('progress-bar-success');
                complexityVal.text('Strong');
            }
            else if (complexity >= 65 && complexity <=99) {

                progressBar.removeClass();
                progressBar.addClass('progress-bar').addClass('progress-bar-success');
                complexityVal.text('Very Strong');
            }
            else if (complexity == 100) {

                progressBar.removeClass();
                progressBar.addClass('progress-bar').addClass('progress-bar-success');
                complexityVal.text('Perfect');
            }
            else {
                progressBar.removeClass();
                progressBar.addClass('progress-bar').addClass('progress-bar-danger');
                complexityVal.text('Weak');
            }


            if(common){
                if(complexity >= 20){
                    complexity -= 20;
                    progressBar.css({
                        'width': complexity  + '%'
                    });
                }
                else{
                    progressBar.css({
                        'width': '0%'
                    });
                }
            }
            else{
                progressBar.css({
                    'width': complexity  + '%'
                });
            }


            if ($.inArray(password, COMPLEXIFY_BANLIST) > -1){
                progressBar.removeClass();
                progressBar.addClass('progress-bar').addClass('progress-bar-danger');
                progressBar.css({'width' : 100+'%'});
                complexityVal.text('Common Password');
                common = true;
            }

        });
    });
});

function configureTips(password) {

    var tip1 = $('#pwdLength');
    var tip2 = $('#pwdCasing');
    var tip3 = $('#pwdContinuous');
    var tip4 = $('#pwdDigits');
    var tip5 = $('#pwdSpecial');
    var tip6 = $('#pwdCommon');

    // We can't do anything - everything is unsatisfied
    if (password.length == 0) {

        resetCheckList(tip1,tip2,tip3,tip4,tip5,tip6);

        return;
    }

    if (password.length >= 8) {
        tip1.find("span").removeClass('glyphicon-remove-sign');
        tip1.find("span").addClass('glyphicon-ok-sign');
        tip1.removeClass('unsatisfied');
        tip1.addClass('satisfied');
    }
    else {
        tip1.find("span").removeClass('glyphicon-ok-sign');
        tip1.find("span").addClass('glyphicon-remove-sign');
        tip1.removeClass('satisfied');
        tip1.addClass('unsatisfied');
    }

    if (/[a-z].*[A-Z]|[A-Z].*[a-z]/.test(password)) {
        tip2.find("span").removeClass('glyphicon-remove-sign');
        tip2.find("span").addClass('glyphicon-ok-sign');
        tip2.removeClass('unsatisfied');
        tip2.addClass('satisfied');
    }
    else {
        tip2.find("span").removeClass('glyphicon-ok-sign');
        tip2.find("span").addClass('glyphicon-remove-sign');
        tip2.removeClass('satisfied');
        tip2.addClass('unsatisfied');
    }

    if (!/([0-9a-zA-Z\_\\])\1{2,}/.test(password)) {
        tip3.find("span").removeClass('glyphicon-remove-sign');
        tip3.find("span").addClass('glyphicon-ok-sign');
        tip3.removeClass('unsatisfied');
        tip3.addClass('satisfied');
    }
    else {
        tip3.find("span").removeClass('glyphicon-ok-sign');
        tip3.find("span").addClass('glyphicon-remove-sign');
        tip3.removeClass('satisfied');
        tip3.addClass('unsatisfied');
    }

    if (/\d/.test(password)) {
        tip4.find("span").removeClass('glyphicon-remove-sign');
        tip4.find("span").addClass('glyphicon-ok-sign');
        tip4.removeClass('unsatisfied');
        tip4.addClass('satisfied');
    }
    else {
        tip4.find("span").removeClass('glyphicon-ok-sign');
        tip4.find("span").addClass('glyphicon-remove-sign');
        tip4.removeClass('satisfied');
        tip4.addClass('unsatisfied');
    }

    if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?_]/.test(password)) {
        tip5.find("span").removeClass('glyphicon-remove-sign');
        tip5.find("span").addClass('glyphicon-ok-sign');
        tip5.removeClass('unsatisfied');
        tip5.addClass('satisfied');
    }
    else {
        tip5.find("span").removeClass('glyphicon-ok-sign');
        tip5.find("span").addClass('glyphicon-remove-sign');
        tip5.removeClass('satisfied');
        tip5.addClass('unsatisfied');
    }

    if ($.inArray(password, COMPLEXIFY_BANLIST) > -1){
        var progressBar = $('#complexity-bar');
        tip6.find("span").removeClass('glyphicon-ok-sign');
        tip6.find("span").addClass('glyphicon-remove-sign');
        tip6.removeClass('satisfied');
        tip6.addClass('unsatisfied');


        // progressBar.removeClass();
        // progressBar.addClass('progress-bar').addClass('progress-bar-info');
        // progressBar.css({'width' : 100+'%'});
        // toastr.warning('Your password contains a very common word.', 'Attention!');
        // toastr.options.closeButton = false;
        // toastr.options.preventDuplicates = true;
        // toastr.options.timeOut = 4000;
        // toastr.options.extendedTimeOut = 60;
        // toastr.options.positionClass = "toast-top-full-width";
    }
    else{
        tip6.find("span").removeClass('glyphicon-remove-sign');
        tip6.find("span").addClass('glyphicon-ok-sign');
        tip6.removeClass('unsatisfied');
        tip6.addClass('satisfied');
    }

}
    function resetCheckList(tip1,tip2,tip3,tip4,tip5,tip6){
        tip1.removeClass();
        tip1.addClass('unsatisfied');
        tip2.removeClass();
        tip2.addClass('unsatisfied');
        tip3.removeClass();
        tip3.addClass('unsatisfied');
        tip4.removeClass();
        tip4.addClass('unsatisfied');
        tip5.removeClass();
        tip5.addClass('unsatisfied');
        tip6.removeClass();
        tip6.addClass('unsatisfied');

        tip1.find("span").removeClass();
        tip1.find("span").addClass('glyphicon glyphicon-remove-sign');
        tip2.find("span").removeClass();
        tip2.find("span").addClass('glyphicon glyphicon-remove-sign');
        tip3.find("span").removeClass();
        tip3.find("span").addClass('glyphicon glyphicon-remove-sign');
        tip4.find("span").removeClass();
        tip4.find("span").addClass('glyphicon glyphicon-remove-sign');
        tip5.find("span").removeClass();
        tip5.find("span").addClass('glyphicon glyphicon-remove-sign');
        tip6.find("span").removeClass();
        tip6.find("span").addClass('glyphicon glyphicon-remove-sign');
    }
// function checkCommonWord(password){
//     if ($.inArray(password, COMPLEXIFY_BANLIST)){
//         $('.common-word-warning').css( "display", "block");
//     }
// }

// When the visibility of the password changes by default the field loses focus
// That's annoying - when the button is clicked we need to give focus back to the inout.
$('#password').on('passwordVisibilityChange', function () {
    $(this).focus();
});


/*
* Makes the password read-friendly. Parses all the password characters and replaces the ambiguous with words.
* Also adds extra spaces between characters.
* i.e: "f!j1" -> f exclamation point j 1
*
* @param String - The password that has to be converted to speech friendly.
* @return String - The password converted*/

function getPasswordText(pword) {

    var characters = {

        '!': 'exclamation point',
        '@': 'at sign',
        '$': 'dollar sign',
        '%': 'percentage',
        '^': 'up',
        '&': 'and',
        '*': 'star',
        '(': 'opening parenthesis',
        ')': 'closing parenthesis',
        '_': 'underscore',
        '+': 'plus',
        '-': 'minus',
        '§': 'paragraph',
        '/': 'line',
        '\\': 'escape',
        '?': 'question mark',
        ',': 'comma',
        '.': 'full stop',
        '<': 'open tag',
        '>': 'close tag',
        '|': 'line',
        '{': 'open curly brace',
        '}': 'close curly brace'
    };

    pwordChars = pword.split("");
    pwordSpeak = "";

    for (var index = 0; index < pwordChars.length; index++) {

        var pwordChar = pwordChars[index];

        if (pwordChar in characters)
            pwordSpeak += characters[pwordChar];
        else
            pwordSpeak += pwordChar;

        pwordSpeak += "   ";
    }

    return pwordSpeak;
}



// Use the built in SpeechSynthesis to make the computer speak.

function speak(text, callback) {

    var u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = 'en-US';
    u.rate = 0.6;

    u.onend = function () {
        if (callback) {
            callback();
        }
    };

    u.onerror = function (e) {
        if (callback) {
            callback(e);
        }
    };

    speechSynthesis.speak(u);
}


// Read the password character by character
$('#speakPassword').click(function(){

    var password = $("#password").val().trim();

    if (password.length > 0) {

        //console.log(password);
        var pword = getPasswordText(password);
        //console.log(pword);
        speak(pword);
    }else {

        speak("You haven't typed a password");
    }
});


// Read the password strength
$('#speakPasswordStrength').click(function(){

    var password = $("#password").val().trim();

    if (password.length > 0) {

        var strength = $("#complexity").html();
        speak("Your password is " + strength);
    }else {

        speak("You haven't typed a password");
    }
});
