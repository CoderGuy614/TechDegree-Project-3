
// Assigning global variables. Initializing validity to false.
// Github Master
alert("connected")
let totalCost = 0;
let allowSubmit = false;
let validPayment = false;
let validCard = false;
let validCvv = false;

const checkbox1 = $(".activities input[name='all']")
const checkbox2 = $(".activities input[name='js-frameworks']")
const checkbox3 = $(".activities input[name='js-libs']")
const checkbox4 = $(".activities input[name='express']")
const checkbox5 = $(".activities input[name='node']")
const checkbox6 = $(".activities input[name='build-tools']")
const checkbox7 = $(".activities input[name='npm']")

// Converting the costs from strings to numbers so they can be summed.
const cost1 = parseInt((checkbox1.attr('data-cost').replace("$","")))
const cost2 = parseInt((checkbox2.attr('data-cost').replace("$","")))
const cost3 = parseInt((checkbox3.attr('data-cost').replace("$","")))
const cost4 = parseInt((checkbox4.attr('data-cost').replace("$","")))
const cost5 = parseInt((checkbox5.attr('data-cost').replace("$","")))
const cost6 = parseInt((checkbox6.attr('data-cost').replace("$","")))
const cost7 = parseInt((checkbox7.attr('data-cost').replace("$","")))


// Focus on the name input on page load
$('#name').focus();
// Initially hide the other job role input
$("#other-title").hide();
// Show the other job role input if "other" is selected
$('#title').change(function(){
	const $selection = $('#title').val()
	if ($selection === "other"){
		$('#other-title').show()
	} else {
		$('#other-title').hide();
	}
})

// This function updates the total cost that is displayed
function updateTotal() {
	$('.totalCost').text('Total Cost: $' + totalCost)
}


//Disable the color options until a design is selected
const $design = $('#design').val()
	if($design === "Select Theme"){
		$("#colors-js-puns").hide();
	}	

//Select Design Event Listenter
$("#colors-js-puns select").append('<option value="choosedesign">Choose a Design</option>');

// Shows only the correct color options for each design.
$("#design").change(function(){
		const designValue = $('#design').val()
		$('#selectTheme').prop('disabled',true)
		$("#colors-js-puns").show();
		if (designValue === "js puns"){
			$("#colors-js-puns option").hide();
			$("#colors-js-puns option[value = 'cornflowerblue']").show();
			$("#colors-js-puns option[value = 'darkslategrey']").show();
			$("#colors-js-puns option[value = 'gold']").show();
			$("#colors-js-puns option[value = 'choosedesign']").hide()
			$("#colors-js-puns option[value = 'cornflowerblue']").prop("selected",true);
		} else if (designValue === "heart js") {
			$("#colors-js-puns option").hide();
			$("#colors-js-puns option[value = 'tomato']").show();
			$("#colors-js-puns option[value = 'steelblue']").show();
			$("#colors-js-puns option[value = 'dimgrey']").show();
			$("#colors-js-puns option[value = 'choosedesign']").hide();
			$("#colors-js-puns option[value = 'tomato']").prop("selected",true);
		} else if (designValue === "Select Theme") {
			$("#colors-js-puns option").hide();
			$("#colors-js-puns option[value = 'choosedesign']").show();
			$("#colors-js-puns option[value = 'choosedesign']").prop("selected",true);
		}
})

// Creating the total cost display 
const totalCostDiv = document.createElement('div');
totalCostDiv.className ='totalCost';
$('.activities').append($(totalCostDiv).text('Total Cost: $' + totalCost));

//Checkbox click event listeners that add or subtract their values to totalCost.
checkbox1.change(function(){
		if(checkbox1.prop('checked')){
		totalCost += cost1
		} else {
		totalCost -= cost1;
		}
	updateTotal();
	})

checkbox2.change(function(){
		if(checkbox2.prop('checked')){
		totalCost += cost2
		checkbox4.prop('disabled', true);
		} else {
		totalCost -= cost2;
		checkbox4.prop('disabled', false);
		}
	$('#label4').toggleClass("unavailable")
	updateTotal();
	})

checkbox3.change(function(){
		if(checkbox3.prop('checked')){
		totalCost += cost3
		checkbox5.prop('disabled', true);
		} else {
		totalCost -= cost3;
		checkbox5.prop('disabled', false);
	}
	$('#label5').toggleClass("unavailable")
	updateTotal()
})

checkbox4.change(function(){
		if(checkbox4.prop('checked')){
		totalCost += cost4
		checkbox2.prop('disabled', true);
		} else {
		totalCost -= cost4;
		checkbox2.prop('disabled', false);
	}
	$('#label2').toggleClass("unavailable")
	updateTotal()
})

checkbox5.change(function(){
		if(checkbox5.prop('checked')){
		totalCost += cost5
		checkbox3.prop('disabled', true);
		} else {
		totalCost -= cost5;
		checkbox3.prop('disabled', false);
	}
	$('#label3').toggleClass("unavailable")
	updateTotal()
})

checkbox6.change(function(){
		if(checkbox6.prop('checked')){
		totalCost += cost6
		} else {
		totalCost -= cost6;
	}
	updateTotal()
})
checkbox7.change(function(){
		if(checkbox7.prop('checked')){
		totalCost += cost7
		} else {
		totalCost -= cost7;
	}
	updateTotal()
})

// Payment section - show and hide the correct payment options
$('#paypal').hide();
$('#bitcoin').hide();
$('#payment option[value="select method"]').prop('disabled',true)
$('#payment option[value="Credit Card"]').prop('selected',true)
$('#payment').change(function(){
	checkValidPayment()
	alertPayment();
	const val = $('#payment').val();
	if (val === "PayPal"){
		$('#credit-card').hide();
		$('#bitcoin').hide();
		$('#paypal').show();


	} else if (val === "Bitcoin") {
		$('#credit-card').hide();
		$('#paypal').hide();
		$('#bitcoin').show();
	} else if (val === "Credit Card") {
		$('#paypal').hide();
		$('#bitcoin').hide();
		$('#credit-card').show();
	}
	})

// Creating the Name Error Message Div and Hiding It
const $namediv = $("<div></div>", {id: "name_div", "class": "error_div"});
$namediv.html('<strong>Name field must not be left blank</strong>')
$("#name").after($namediv);
$namediv.hide()

// Creating the Email Error Message Div and Hiding It
const $emaildiv = $("<div></div>", {id: "email_div", "class": "error_div"});
$emaildiv.html('<strong>Please enter a valid email address</strong>')
$("#mail").after($emaildiv);
$emaildiv.hide()

// Creating the Activities Error Message Div and Hiding It
const $activediv = $("<div></div>", {id: "activities_div", "class": "error_div"});
$activediv.html('<strong>Please select at least one activity</strong>')
$(".activities").after($activediv);
$activediv.hide()

// Creating the Payment Error Message Div and Hiding It
const $paymentdiv = $("<div></div>", {id: "payment_div", "class": "error_div"});
$paymentdiv.html('<strong>Please check your payment details</strong>')
$("#payment-info").after($paymentdiv);
$paymentdiv.hide()

// Creating the Carn Number Error Message Div and Hiding It
const $cardnumdiv = $("<div></div>", {id: "cardnum_div", "class": "error_div"});
$cardnumdiv.html('<strong>Enter 13 - 16 digit card number</strong>')
$("#cc-num").after($cardnumdiv);
$cardnumdiv.hide()

// Creating the Zip Code Error Message Div and Hiding It
const $zipdiv = $("<div></div>", {id: "zip_div", "class": "error_div"});
$zipdiv.html('<strong>Enter 5 Digit Zip Code</strong>')
$("#zip").after($zipdiv);
$zipdiv.hide()

// Creating the Zip Code Error Message Div and Hiding It
const $zipdivempty = $("<div></div>", {id: "zip_div_empty", "class": "error_div"});
$zipdivempty.html('<strong>Zip is too long</strong>')
$("#zip").after($zipdivempty);
$zipdivempty.hide()

// Creating the CVV Error Message Div and Hiding It
const $cvvdiv = $("<div></div>", {id: "cvv_div", "class": "error_div"});
$cvvdiv.html('<strong>Enter 3 digit CVV</strong>')
$("#cvv").after($cvvdiv);
$cvvdiv.hide()

// Creating the CVV Error Message Div and Hiding It
const $cvvdivempty = $("<div></div>", {id: "cvv_div_empty", "class": "error_div"});
$cvvdivempty.html('<strong>CVV is too long</strong>')
$("#cvv").after($cvvdivempty);
$cvvdivempty.hide()



//Name Validation Function
function checkValidName(name) {
		if (name){
		return true;
	} else {
		return false;
	}
}
//Email Validation Function
function checkValidEmail(email){
		return  /^[^@]+@[^@.]+\.[a-z]+$/i.test(email)
}
// Checks that at least 1 activity was selected
function checkValidTotal(){
	if (totalCost === 0) {
		return false;
		 } else {
		return true;
			}
		}
// Checks that the card number is 13-16 digits.
function checkValidCard() {
	const regExpCard = /^\d{13,16}$/
	const cardInput = $('#cc-num').val();
	return regExpCard.test(cardInput)
}
// Checks that the zip code is 5 digits.
function checkValidZip() {
	const regExpZip = /^\d{5}$/
	const zipInput = $('#zip').val();
	return regExpZip.test(zipInput)
}
// Checks that the CVV is 3 digits.
function checkValidCvv(){
	const regExpCvv = /^\d{3}$/
	const CvvInput = $('#cvv').val();
	return regExpCvv.test(CvvInput)
}

// Keyup listeners so that the errors update in real time.
$('#cc-num').on('keyup', checkValidPayment)
$('#zip').on('keyup', checkValidPayment)
$('#cvv').on('keyup', checkValidPayment)

// This function checks that a valid payment option was chosen.  
function checkValidPayment() {
	const val = $('#payment').val();
	if (!val){
		validPayment = false;
	}
	if (val === "Credit Card") {
		if(checkValidCard() && checkValidZip() && checkValidCvv()) {
			validPayment = true;
			}
		if (!checkValidCard()){
				validCard = false;
				$('#cc-num').addClass('red')
				$cardnumdiv.show()
				validPayment = false;
			} else {
				$cardnumdiv.hide();
				validCard = true;
				$('#cc-num').removeClass('red')
			}
		if (!checkValidZip()){
				validZip = false;
				$('#zip').addClass('red')
				validPayment = false;
					if($('#zip').val().length > 5) {
					$zipdivempty.show()
					$zipdiv.hide()
				} else {
					$zipdiv.show()
					$zipdivempty.hide()
				}
			} else {
				validZip = true;
				$zipdivempty.hide()
				$zipdiv.hide()
				$('#zip').removeClass('red')
			}
		if (!checkValidCvv()){
				validCvv = false;
				$('#cvv').addClass('red')
				$cvvdiv.show();
				validPayment = false;
					if($('#cvv').val().length > 3){
						$cvvdivempty.show();
						$cvvdiv.hide();
					} else {
						$cvvdivempty.hide();
						$cvvdiv.show();
					}
				} else {
				validCvv = true;
				$('#cvv').removeClass('red')
				$cvvdiv.hide();
				$cvvdivempty.hide();
			}
		} else if( val === "PayPal" || val === "Bitcoin") {
			validPayment = true;
		}
	}




// This function adds red text and border to alert the user of an invalid input.
function alertPayment(){
	if(validPayment === false){
		$('#payment-info').addClass('red')
		$paymentdiv.show();
		} else {
		$('#payment-info').removeClass('red')
		$paymentdiv.hide();
		}
	}

// Name input event listener
$('#name').on('keyup', function(){
	const nameInput = $('#name').val()
 	if(checkValidName(nameInput)) {
 		$namediv.hide();
 		$('#name').removeClass('red')
 		return true;
 	} else {
 		$namediv.show();
 		$('#name').addClass('red')
 		return false;
 	}
})

// Email input event listener
$('#mail').on('keyup', function(){
	const mailInput = $('#mail').val()
 	if(checkValidEmail(mailInput)) {
 		$emaildiv.hide();
 		$('#mail').removeClass('red')
 		return true;
 	} else {
 		$emaildiv.show();
 		$('#mail').addClass('red')
 		return false;
 	}
})

// Activities input event listener
$('.activities input').on('change', function(){
if(totalCost === 0){
	$activediv.show();
	$('.activities').addClass('red')
	} else {
	$activediv.hide();
	$('.activities').removeClass('red')
}
})

 //This function returns true if the form is ready to submit, and false if not.
function checkValidity() {
	const nameInput = $('#name').val()
	if(!checkValidName(nameInput)){
		$namediv.show();
 		$('#name').addClass('red')
	} else if(checkValidName(nameInput)){
		$namediv.hide();
		$('#name').removeClass('red')
	}
	
	const mailInput = $('#mail').val()
	if(!checkValidEmail(mailInput)){
		$emaildiv.show();
 		$('#mail').addClass('red')
	} else if(checkValidEmail(mailInput)){
		$emaildiv.hide();
		$('#email').removeClass('red')
	}

	if(checkValidTotal()) {
		$activediv.hide();
		$('.activities').removeClass('red')
	} else {
		$activediv.show();
		$('.activities').addClass('red')
	}
	// Checks if the  required fields are all valid
	if(checkValidEmail(mailInput) && checkValidName(nameInput) && checkValidTotal()) {
		allowSubmit = true;
	} else {
		allowSubmit = false;
	}
	checkValidPayment()
	alertPayment()
	// checks if payment is valid and required fields are valid
	if(validPayment === true && allowSubmit === true) {
		return true //form was submitted
	} else {

		return false // form was not submitted
	}
}

$('button').click(checkValidity);