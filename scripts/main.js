const total = document.getElementById("total");
const tipAmount = document.getElementById("tip-amount");
const numPeople = document.getElementById("people");
const customTip = document.getElementById("custom-pct");
const fifty = document.querySelector(".fifty");
const twentyfive = document.querySelector(".twentyfive");
const fifteen = document.querySelector(".fifteen");
const ten = document.querySelector(".ten");
const five = document.querySelector(".five");
const bill = document.getElementById("bill")
const error = document.getElementById("error")
const resetBtn = document.querySelector(".display__button")

const tipButtons = document.querySelectorAll('.calculator__btn');

let billValue;
let tipPct;
let peopleValue;


// getting the value in the bill input
bill.addEventListener('keyup', function() {
    billValue = parseFloat(this.value);
})

// getting the value of the button(tip %) clicked
tipButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    tipPct = parseFloat(this.textContent.replace('%', '')) / 100;
    customTip.value = '';
    calculateTipAmount();
    calculateTotal();
  });
});

// getting the value of the custom tip
customTip.addEventListener('keyup', function() {
    tipPct = parseFloat(this.value) / 100;

    calculateTipAmount();
    calculateTotal();
})

// getting the number of people
numPeople.addEventListener('keyup', function() {
    peopleValue = parseInt(this.value);
    if (peopleValue == 0) {
        console.log(peopleValue)
        error.classList.remove("hide");
        numPeople.style.border = "0.2rem solid var(--clr-orange400)";
    }

    calculateTipAmount();
    calculateTotal();
})


// calculating the "Tip Amount"
function calculateTipAmount() {
    let tipTotal = billValue * tipPct;
    let tipPerPerson = tipTotal/peopleValue
    if (tipPerPerson == Infinity) {
        tipAmount.innerHTML = '$0.00';
    } else if(tipPerPerson) {
        tipAmount.innerHTML = '$' + tipPerPerson.toFixed(2);
    } else {
        tipAmount.innerHTML = '$0.00';
    }
}

// calculating total bill per person
function calculateTotal() {
    let totalPerPerson = (billValue + (billValue * tipPct))/peopleValue;
    if (totalPerPerson == Infinity) {
        total.innerHTML = '$0.00';
    } else if (totalPerPerson) {
        total.innerHTML = '$' + totalPerPerson.toFixed(2);
    } else {
        total.innerHTML = '$0.00';
    }
}

// resetting the calculator
resetBtn.addEventListener("click", function() {
    billValue = 0;
    tipPct = 0;
    peopleValue = 0;

    bill.value = '';
    numPeople.value = '';

    calculateTipAmount();
    calculateTotal();
})