let totalCost = 0;
const checkbox1 = $(".activities input[name='all']")
const checkbox2 = $(".activities input[name='js-frameworks']")
const checkbox3 = $(".activities input[name='js-libs']")
const checkbox4 = $(".activities input[name='express']")
const checkbox5 = $(".activities input[name='node']")
const checkbox6 = $(".activities input[name='build-tools']")
const checkbox7 = $(".activities input[name='npm']")

const cost1 = parseInt((checkbox1.attr('data-cost').replace("$","")))
const cost2 = parseInt((checkbox2.attr('data-cost').replace("$","")))
const cost3 = parseInt((checkbox3.attr('data-cost').replace("$","")))
const cost4 = parseInt((checkbox4.attr('data-cost').replace("$","")))
const cost5 = parseInt((checkbox5.attr('data-cost').replace("$","")))
const cost6 = parseInt((checkbox6.attr('data-cost').replace("$","")))
const cost7 = parseInt((checkbox7.attr('data-cost').replace("$","")))

function updateTotal() {
	$('.totalCost').text('Total Cost: $' + totalCost)
}
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

//Disable the color options until a design is selected
const $design = $('#design').val()
	if($design === "Select Theme"){
		$("#colors-js-puns").hide();
	}	

//Select Design Event Listenter
$("#colors-js-puns select").append('<option value="choosedesign">Choose a Design</option>');
$("#design").change(function(){
		const designValue = $('#design').val()
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
$('#payment').change(function(){
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


//incorporate this on Refactor 1
// $('[type"checkbox"]').each(function() {
//         const $test = $(this);
//         if ($dateAndTime == $test.attr('data-day-and-time')) {
//             $test.addClass('disabled');
//         }
//     });




//if the design select box value is "select theme"
      // change the color options to only say "choose a color"
  
  	// $("#selectBox").append('<option value="option6">option6</option>');

// add a change event listener to the design 