/*Global Variables */

var customer = {};
customer.pizza = [];
customer.sandwich = [];
customer.drink = [];

window.onload = initialize();

function initialize() {
    var todayDate = new Date();
    document.getElementById('currentDate').innerHTML = todayDate;
}

function calcPizza() {
    var pizzaType = null;
    var pizzaSize = null;
    var pizzaToppings = null;
    var numOfPizzas = 0;
    var pizzaCost = 0;
    var toppingCost = 0;
    var toppingArray = []; //making empty array
    var pizza = {}; //pizza object

    if (document.querySelector('input[name="pizzaType[]"]:checked') != null) {
        pizzaType = document.querySelector('input[name="pizzaType[]"]:checked').value;
    }


    pizzaSize = document.getElementById('pizzaSize').value;

    switch (pizzaSize) {
        case 'Small':
            pizzaCost = 8.50;
            break;
        case 'Medium':
            pizzaCost = 11.50;
            break;
        case 'Large':
            pizzaCost = 14.00;
            break;
        case 'Extra Large':
            pizzaCost = 16.50;
            break;
        default:
            pizzaCost = 0;
            break;
    }


    numOfPizzas = document.getElementById('numOfPizza').value;

    pizzaToppings = document.getElementsByName('pizzaToppings[]');

    for (var pt = 0; pt < pizzaToppings.length; pt++) {

        if (pizzaToppings[pt].checked == true) {
            toppingCost += 1.75;
            toppingArray.push(pizzaToppings[pt].value)

        }
    }

    pizzaCost = (pizzaCost + toppingCost) * numOfPizzas;

    pizza.quantity = numOfPizzas;
    pizza.size = pizzaSize;
    pizza.type = pizzaType;
    pizza.cost = pizzaCost.toFixed(2); // Decimal .2
    pizza.toppings = toppingArray;

    return pizza;
}

function calcSandwich() {
    var sandwichType = null;
    var sandwichCost = 0;
    var numOfSandwich = 0;
    var sandwich = {};

    if (document.querySelector('input[name="sandwichType[]"]:checked') != null) {

        sandwichCost = document.querySelector('input[name="sandwichType[]"]:checked').value;

        sandwichType = document.querySelector('input[name="sandwichType[]"]:checked + span').textContent;
    }

    numOfSandwich = document.getElementById('numOfSandwich').value;

    sandwich.cost = (sandwichCost * numOfSandwich).toFixed(2);
    sandwich.type = sandwichType;
    sandwich.quantity = numOfSandwich;

    return sandwich;

}

function calcDrink() {
    var drinkType = null;
    var drinkSize = null;
    var drinkCost = 0;
    var numOfDrink = 0;
    var drink = {};

    if (drinkType = document.querySelector('input[name="drinkType[]"]:checked') != null) {
        drinkType = document.querySelector('input[name="drinkType[]"]:checked').value;
    }

    drinkSize = document.getElementById('drinkSize').value;

    switch (drinkSize) {
        case 'Small':
            drinkCost = 1.25;
            break;
        case 'Medium':
            drinkCost = 1.75;
            break;
        case 'Large':
            drinkCost = 2.00;
            break;
        default:
            drinkCost = 0;
            break;
    }

    numOfDrink = document.getElementById('numOfDrinks').value;

    drink.cost = (drinkCost * numOfDrink).toFixed(2);
    drink.type = drinkType;
    drink.quantity = numOfDrink;
    drink.size = drinkSize;

    return drink;

}

function addPizza() {
    var pizza = calcPizza();

    if (parseFloat(pizza.cost) != 0) {
        customer.pizza.push(pizza);
    }
    console.log(customer.pizza);

    clearFoam();
}

function addSandwich() {
    var sandwich = calcSandwich();

    if (parseFloat(sandwich.cost) != 0) {
        customer.sandwich.push(sandwich);
    }
    clearFoam();
}

function addDrink() {
    var drink = calcDrink();

    if (parseFloat(drink.cost) != 0) {
        customer.drink.push(drink);
    }
    clearFoam();
}

function calcOrder() {

    var fName = document.getElementById('firstName').value;
    var lName = document.getElementById('lastName').value;
    var address = document.getElementById('address').value;
    var phone = document.getElementById('phone').value;

    customer.clientInfo = [fName, lName, address, phone];

    dispOrder(customer);

}

function dispOrder(customer) {

    var receipt = '';

    receipt += '<h4>Customer Info</h4>';
    receipt += customer.clientInfo[0] + ' ' + customer.clientInfo[1] + '<br>';
    receipt += customer.clientInfo[2] + '<br>';
    receipt += customer.clientInfo[3] + '<br>';
    receipt += '<h4>Your order</h4>';
    receipt += 'Pizza: <br>';

    var pizzaTotal = 0;
    for (var i = 0; i < customer.pizza.length; i++) {

        receipt += customer.pizza[i].quantity + ' ' + customer.pizza[i].size + ' ' + customer.pizza[i].type;
        for (var a = 0; a < customer.pizza[i].toppings.length; a++) {
            var thisTopping = customer.pizza[i].toppings[a];
            receipt += ', ' + thisTopping;
        }
        receipt += ' $' + customer.pizza[i].cost + '<br>';

        pizzaTotal += parseFloat(customer.pizza[i].cost);
    }
    receipt += '<br>';
    receipt += 'Sandwiches: <br>';

    var sandwichTotal = 0;
    for (var i = 0; i < customer.sandwich.length; i++) {
        receipt += customer.sandwich[i].quantity + ' ' + customer.sandwich[i].type + ' $' + customer.sandwich[i].cost + '<br>';

        sandwichTotal += parseFloat(customer.sandwich[i].cost);
    }
    receipt += '<br>';
    receipt += 'Drink: <br>';

    var drinkTotal = 0;
    for (var i = 0; i < customer.drink.length; i++) {
        receipt += customer.drink[i].quantity + ' ' + customer.drink[i].size + ' ' + customer.drink[i].type + '  $' + customer.drink[i].cost + '<br>';

        drinkTotal += parseFloat(customer.drink[i].cost);
    }
    receipt += '<br>';
    receipt += 'Order Total: '

    var orderTotal = (pizzaTotal + sandwichTotal + drinkTotal).toFixed(2);
    receipt += '$' + orderTotal;


    document.getElementById('displayOrder').innerHTML = receipt;

}

function clearFoam() {
    var radioButtons = document.querySelectorAll('input[type="radio"]');

    for (let i = 0; i < radioButtons.length; i++) {
        var thisRadioButton = radioButtons[i];
        thisRadioButton.checked = false;
    }

    var checkboxes = document.querySelectorAll('input[type="checkbox"');

    for (let i = 0; i < checkboxes.length; i++) {
        var thisCheckButton = checkboxes[i];
        thisCheckButton.checked = false;
    }

    var numberInputs = document.querySelectorAll('input[type="number"]');

    for (let i = 0; i < numberInputs.length; i++) {
        var thisNumber = numberInputs[i];
        thisNumber.value = '';
    }

    var selectPizza = document.querySelectorAll('#pizzaSize');
    for (let i = 0; i < selectPizza.length; i++) {
        var thisSelect = selectPizza[i];
        thisSelect.value = '';
    }

    var selectDrink = document.querySelectorAll('#drinkSize');
    for (let i = 0; i < selectDrink.length; i++) {
        var thisSelect = selectDrink[i];
        thisSelect.value = '';
    }

}