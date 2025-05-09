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

const alterKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

let billValue;
let tipPct;
let peopleValue;


// getting the value in the bill input
bill.addEventListener('keyup', function() {
    billValue = parseFloat(this.value);

    calculateTipAmount();
    calculateTotal();
    activateReset();
})

// prevent users from entering special characters in the input feild of bill
bill.addEventListener('blur', function() {
    let value = parseFloat(this.value);
    if (!isNaN(value)) {
        // Always display two decimals
        this.value = value.toFixed(2);
    }
});


// getting the value of the button(tip %) clicked
tipButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Only run for buttons, not the custom input
        if (!this.classList.contains("calculator__btn")) return;
        
        tipPct = parseFloat(this.textContent.replace('%','')) / 100;
        customTip.value = '';
        
        calculateTipAmount();
        calculateTotal();
        activateReset();
    });
});


// setting active state on the clicked tip button
tipButtons.forEach(btn => {
    btn.addEventListener("click", function() {
        tipButtons.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
    })
})

// getting the value of the custom tip
customTip.addEventListener('keyup', function() {
    tipPct = parseFloat(this.value) / 100;

    tipButtons.forEach(b => b.classList.remove("active"));

    calculateTipAmount();
    calculateTotal();
    activateReset();
})

// suggetion from Andrey (a.k.a @dar-ju)
// Only allow 2 digits in custom tip 
customTip.addEventListener('keydown', function(input) {
    if (alterKeys.includes(input.key)) return;

    if (!/^[0-9]$/.test(input.key)) {
        input.preventDefault();
        return;
    }

    if (this.value.length >= 2) {
        input.preventDefault();
    }
})

// getting the number of people
numPeople.addEventListener('keyup', function() {
    peopleValue = parseInt(this.value);
    if (peopleValue == 0) {
        error.classList.remove("hide");
        numPeople.style.border = "0.2rem solid var(--clr-orange400)";
    } else {
        error.classList.add("hide");
        numPeople.style.border = "none";
    }

    calculateTipAmount();
    calculateTotal();
    activateReset();
})

// prevent users from entering special characters when entering number of people
numPeople.addEventListener('keydown', function(input) {
    if (alterKeys.includes(input.key)) return;

    if (!/^[0-9]$/.test(input.key)) {
        input.preventDefault();
        return;
    }
})

/**
 * Calculates and displays the tip amount per person.
 * Updates the #tip-amount element in the UI.
 */
function calculateTipAmount() {
    let tipTotal = billValue * tipPct;
    let tipPerPerson = tipTotal/peopleValue
    if (tipPerPerson == Infinity) {
        tipAmount.innerHTML = '$0.00';
    } else if(tipPerPerson) {
        // tipAmount.innerHTML = '$' + tipPerPerson.toFixed(2);
        updateDisplayNumber(tipAmount, '$' + tipPerPerson.toFixed(2), 5)
    } else {
        tipAmount.innerHTML = '$0.00';
    }
}

/**
 * Calculates and displays the total bill per person,
 * including tip if selected. Updates the #total element in the UI.
 */
function calculateTotal() {
    if (!tipPct) {
        let totalPerPerson = billValue/peopleValue;
        if (totalPerPerson == Infinity) {
            total.innerHTML = '$0.00';
        } else if (totalPerPerson) {
            // total.innerHTML = '$' + totalPerPerson.toFixed(2);
            updateDisplayNumber(total, '$' + totalPerPerson.toFixed(2), 6)
        } else {
            total.innerHTML = '$0.00';
        }

    } else {
        let totalPerPerson = (billValue + (billValue * tipPct))/peopleValue;
        if (totalPerPerson == Infinity) {
            total.innerHTML = '$0.00';
        } else if (totalPerPerson) {
            // total.innerHTML = '$' + totalPerPerson.toFixed(2);
            updateDisplayNumber(total, '$' + totalPerPerson.toFixed(2), 6)
        } else {
            total.innerHTML = '$0.00';
        }
    }

    
}

// resetting the calculator
resetBtn.addEventListener("click", function() {
    billValue = 0;
    tipPct = 0;
    peopleValue = 0;

    bill.value = '';
    numPeople.value = '';
    customTip.value = '';

    error.classList.add("hide");
    numPeople.style.border = "";

    tipAmount.classList.remove("shrink")
    total.classList.remove("shrink")

    calculateTipAmount();
    calculateTotal();

    tipButtons.forEach(b => b.classList.remove("active"));
    resetBtn.classList.remove("active");
})

// turning on active state of the reset button
function activateReset() {
    resetBtn.classList.add("active");
}

// shrink the display number when the number is too long
function updateDisplayNumber(element, value, len) {
    element.textContent = value;
    element.classList.toggle('shrink', value.length > len);
}


