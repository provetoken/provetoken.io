$(document).ready(function () {
    // animate links - anchor(#)
    var hh = $('header').innerHeight();
    $('a').on('click', function () {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - hh
        }, 1500, 'linear');
        event.preventDefault();
    });

    // show or hide mobile menu (adding a class show/hide)
    $('.icon').on('click', function () {
        if ($('.header-mobile-menu').hasClass('hide')) {
            $('.header-mobile-menu').removeClass('hide');
            $('.header-mobile-menu').addClass('show');
        } else {
            $('.header-mobile-menu').removeClass('show');
            $('.header-mobile-menu').addClass('hide');
        }
    })
});

function goToWhitepaper() {
    var url = window.location.origin + '/ProveToken_Whitepaper.pdf';
    window.open(url, '_blank');
}
function setLables(sendMessageText) {
    $('#btnSend').removeAttr('disabled');
    $('#lblSendMessage').html(sendMessageText);
    $('#txtQuestion').val('');
    $('#txtEmail').val('');
}
function sendEmail() {
    if (!isFormValid()) {
        return false;
    }
    var question = $('#txtQuestion').val();
    var email = $('#txtEmail').val();
    $('#btnSend').attr('disabled', 'disabled');
    $.post('/Home/SendEmail', { question: question, email: email })
        .done(function () {
            setLables('The email has been sent.');
        })
        .fail(function () {
            setLables('Error while trying to send the mail. Please try again!');
        });
    return false;
}
function isFormValid() {
    var question = $('#txtQuestion').val();
    if (isEmptyOrSpaces(question)) {
        showError('Enter your question');
        return false;
    }
    var email = $('#txtEmail').val();
    if (isEmptyOrSpaces(email)) {
        showError('Enter your email');
        return false;
    }
   
    if (!validateEmail(email)) {
        showError('Enter a valid email address');
        return false;
    }

    showError('');
    return true;
}
function showError(errorMessage) {
    $('#lblSendMessage').html('');
    $('#lblErrorMessage').html(errorMessage);
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}