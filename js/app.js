$(document).ready(function () {

    // Show/Hide Password Init.
    //noinspection JSUnresolvedFunction,JSUnresolvedFunction
    $('#password').showPassword(true);

    // Give focus on the password field immediately. Users can type without clicking
    $('#password').focus();

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

    clipboard.on('error', function (e) {

        toastr.error('Your password could not be copied.', 'Error!');
        toastr.options.closeButton = true;
        toastr.options.preventDuplicates = true;
        toastr.options.timeOut = 2000;            // How long the toast will display without user interaction
        toastr.options.extendedTimeOut = 60;    // How long the toast will display after a user hovers over it
    });

    $("#password").on('change keydown paste input', function () {

        $("#password").complexify({}, function (valid, complexity) {

            var progressBar = $('#complexity-bar');
            var password = $('#password').val().trim();
            var complexityVal = $('#complexity');

            configureTips(password);

            progressBar.toggleClass('progress-bar-success', valid);

            if (password.length == 0) {
                complexityVal.text('');
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
            else if (complexity >= 65) {

                progressBar.removeClass();
                progressBar.addClass('progress-bar').addClass('progress-bar-success');
                complexityVal.text('Very Strong');
            }
            else {

                progressBar.removeClass();
                progressBar.addClass('progress-bar').addClass('progress-bar-danger');
                complexityVal.text('Weak');
            }

            progressBar.css({
                'width': complexity + '%'
            });

        });
    });
});

function configureTips(password) {

    var tip1 = $('#pwdLength');
    var tip2 = $('#pwdCasing');
    var tip3 = $('#pwdContinuous');
    var tip4 = $('#pwdDigits');
    var tip5 = $('#pwdSpecial');

    // We can't do anything - everything is unsatisfied
    if (password.length == 0) {

        tip1.removeClass('satisfied');
        tip2.removeClass('satisfied');
        tip3.removeClass('satisfied');
        tip4.removeClass('satisfied');
        tip5.removeClass('satisfied');

        if (!tip1.hasClass('unsatisfied')) tip1.addClass('unsatisfied');
        if (!tip2.hasClass('unsatisfied')) tip2.addClass('unsatisfied');
        if (!tip3.hasClass('unsatisfied')) tip3.addClass('unsatisfied');
        if (!tip4.hasClass('unsatisfied')) tip4.addClass('unsatisfied');
        if (!tip5.hasClass('unsatisfied')) tip5.addClass('unsatisfied');

        return;
    }

    if (password.length >= 8) {
        tip1.removeClass('unsatisfied');
        tip1.addClass('satisfied');
    }
    else {
        tip1.removeClass('satisfied');
        tip1.addClass('unsatisfied');
    }

    if (/[a-z].*[A-Z]|[A-Z].*[a-z]/.test(password)) {
        tip2.removeClass('unsatisfied');
        tip2.addClass('satisfied');
    }
    else {
        tip2.removeClass('satisfied');
        tip2.addClass('unsatisfied');
    }

    if (!/([0-9a-zA-Z\_\\])\1{2,}/.test(password)) {
        tip3.removeClass('unsatisfied');
        tip3.addClass('satisfied');
    }
    else {
        tip3.removeClass('satisfied');
        tip3.addClass('unsatisfied');
    }

    if (/\d/.test(password)) {
        tip4.removeClass('unsatisfied');
        tip4.addClass('satisfied');
    }
    else {
        tip4.removeClass('satisfied');
        tip4.addClass('unsatisfied');
    }

    if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?_]/.test(password)) {
        tip5.removeClass('unsatisfied');
        tip5.addClass('satisfied');
    }
    else {
        tip5.removeClass('satisfied');
        tip5.addClass('unsatisfied');
    }

}

// When the visibility of the password changes by default the field loses focus
// That's annoying - when the button is clicked we need to give focus back to the inout.
$('#password').on('passwordVisibilityChange', function () {
    $('#password').focus();
});

// jQuery(document).ready(function(){
//     jQuery("#password").keyup(function() {
//         passwordStrength(jQuery(this).val());
//     });
// });


//
// /* Password strength indicator */
// function passwordStrength(password) {
//
//     var desc = [{'width':'0px'}, {'width':'20%'}, {'width':'40%'}, {'width':'60%'}, {'width':'80%'}, {'width':'100%'}];
//
//     var descClass = ['', 'progress-bar-danger', 'progress-bar-danger', 'progress-bar-warning', 'progress-bar-success', 'progress-bar-success'];
//
//     var score = 0;
//
//     //if password bigger than 6 give 1 point
//     if (password.length > 6) score++;
//
//     //if password has both lower and uppercase characters give 1 point
//     if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/))) score++;
//
//     //if password has at least one number give 1 point
//     if (password.match(/d+/)) score++;
//
//     //if password has at least one special caracther give 1 point
//     if ( password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) )	score++;
//
//     //if password bigger than 12 give another 1 point
//     if (password.length > 10) score++;
//
//     // display indicator
//     $("#jak_pstrength").removeClass(descClass[score-1]).addClass(descClass[score]).css(desc[score]);
// }

// (function($) {
//
//     $("#password").complexify({}, function(valid, complexity) {
//         var progressBar = $('#complexity-bar');
//
//         progressBar.toggleClass('progress-bar-success', valid);
//         progressBar.toggleClass('progress-bar-danger', !valid);
//         progressBar.css({
//             'width': complexity + '%'
//         });
//
//         // $('#complexify #complexity').text(Math.round(complexity) + '%');
//     });
//
// })(jQuery);

