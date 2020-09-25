/* xhtml, css, js coding by Joseph / icq: 219465801 / (c) 2012 */

/* js */

jQuery(document).ready(function() {
	
	scrollGirl();	
								
    $(window).scroll(function () { 
		scrollGirl();
    });
	
    $("ul.form-table input").focus(function () {
		$("ul.form-table li.form-line").removeClass("active");							
		$(this).parents("li.form-line").addClass("active");
    });
    checkMainPageSubmit();
});

function checkMainPageSubmit() {
    var hashParams = window.location.hash;
    if (hashParams.indexOf('result') > 0) {
        hashArr = hashParams.split(':'),
        resultId = hashArr[1],
        hash = hashParams.replace('#result:', '');
        var results = {'1' : 'Such type of photos are not supported',
                       '2' : 'All required fields should be filled', 
                       '3' : 'No photos were uploaded, please select photos from your computer and submit form again.',
                       '4' : 'Data sent successfully.',
                       '5' : 'Unable to process form data, please submit again.'};
        $('#formMessageDiv').html(results[resultId]);
    }
}

function validateContactForm() {
    var captcha = $('#formCaptcha').val(),
    f_name = $('#f_name').val(),
    f_email = $('#f_email').val(),
    f_msg = $('#f_msg').val();
    $.post('submit.php', { 'captcha' : captcha, 'f_name' : f_name, 'f_email' : f_email, 'f_msg' : f_msg }, function (data) {
        if (data.hasOwnProperty('error')) {
            if (data.error.length > 1) {
                $('#captchaImage').attr('src', $('#captchaImage').attr('src')+'#'+Math.random());
                $('#formMessageDiv').html(data.error).css('color', 'red');
            }
        } else {
            if (data.valid === true) {
                $('#formMessageDiv').html('<p>Message sent</p>').css('color', 'green');
            }
        }
    });
    return false;
}

function scrollGirl(){
		var b_width = $("body").css("width");
		var b_height = $("body").css("height");
		b_height = parseInt(b_height);
		b_width = parseInt(b_width);
		if(b_height < 1200) {			
			var height_diff = 1200 - b_height;
			var curPos=$(document).scrollTop();
			var cur_scroll_pos = height_diff;			
			
			if(curPos < height_diff){cur_scroll_pos = curPos;}			
			cur_scroll_pos = height_diff - cur_scroll_pos;	

			pos_string = 'center '+cur_scroll_pos+'px';
			$(".girl-bg").stop().css({"background-position":pos_string});
		}
}