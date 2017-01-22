jQuery(document).ready(function () {

    // Show/Hide Password Init.
    //noinspection JSUnresolvedFunction,JSUnresolvedFunction
    $('#password').showPassword(true);

    // Copy to clipboard btn
    //noinspection JSUnresolvedFunction,JSUnresolvedFunction
    var clipboard = new Clipboard('#clipboard');

    // Show notifications after password has been coppied
    clipboard.on('success', function(e) {

        toastr.success('Your password has been copied.', 'Success!');
        toastr.options.closeButton = true;
        toastr.options.preventDuplicates = true;
        toastr.options.timeOut = 2000;            // How long the toast will display without user interaction
        toastr.options.extendedTimeOut = 60;    // How long the toast will display after a user hovers over it
        e.clearSelection();
    });

    clipboard.on('error', function(e) {

        toastr.error('Your password could not be copied.', 'Error!');
        toastr.options.closeButton = true;
        toastr.options.preventDuplicates = true;
        toastr.options.timeOut = 2000;            // How long the toast will display without user interaction
        toastr.options.extendedTimeOut = 60;    // How long the toast will display after a user hovers over it
    });

    jQuery("#password").keyup(function () {
        $("#password").complexify({}, function (valid, complexity) {
            var progressBar = $('#complexity-bar');

            progressBar.toggleClass('progress-bar-success', valid);
            progressBar.toggleClass('progress-bar-danger', !valid);
            progressBar.css({
                'width': complexity + '%'
            });

            // $('#complexify #complexity').text(Math.round(complexity) + '%');
        });
    });
});


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

