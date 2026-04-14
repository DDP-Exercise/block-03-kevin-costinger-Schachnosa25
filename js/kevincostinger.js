"use strict";
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     Schachnosa Viertbauer - 2026-04-14
 *******************************************************/
let sumExpenses = 0.0; //Use this variable to keep the sum up to date.

const forms = document.querySelectorAll("form");

forms.forEach(form => {
    form.addEventListener("submit", submitForm)
})

function submitForm(e){
    e.preventDefault();
    const data = new FormData(e.target)

    const expense = data.get("expense");
    const amount= data.get("amount");
    const date = data.get("date");

    if (isEmpty(data) && (amount>=0.001) && (expense.length>=3))
    {
        sumExpenses += amount;
        logData(date,amount,expense);
        e.target.reset();
    } else {
        console.log("not valid");
        console.log(!isEmpty(data));
        console.log(!isEmpty((amount>=0.001)));
        console.log(expense.length>=3);
    }

    //TODO: Prevent the default behavior of the submit button.
    //TODO: Validate the form. If everything is fine, add the expense to the tracker and reset the form.
}


function logData(date,amount,expense){
    const table = document.getElementById("expenses");
    const tbody = table.querySelector("tbody");
    const euro_amount = formatEuro(Number(amount));

    const row = document.createElement("tr");

    const data_td = document.createElement("td");
    data_td.textContent = date;

    const amount_td = document.createElement("td");
    amount_td.textContent = euro_amount;

    const expense_td = document.createElement("td");
    expense_td.textContent = expense;

    const delete_td = document.createElement("td");
    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.className = "delete-btn";

    btn.addEventListener("click", () => {
        row.remove();
    });
    delete_td.appendChild(btn);

    row.appendChild(data_td);
    row.appendChild(amount_td);
    row.appendChild(expense_td);
    row.appendChild(delete_td);
    tbody.appendChild(row);

    document.getElementById("expenseSum").textContent = formatEuro(sumExpenses);
}

/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 ****************************/


/*******************************************************
 *     Checks if variable is empty
 *     @param {any} variable - Variable which you want to check.
 *     @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function(variable) {
    if(Array.isArray(variable))
        return (variable.length === 0);
    else if(typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 *     Converts number into currency string.
 *     @param {Number} number - Any numeric value.
 *     @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}