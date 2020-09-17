/*Global Variables */

var customer = {};
customer.pizza = [];
customer.sandwich = [];
customer.drink = [];
customer.clientInfo = [];
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

    sandwich.value = sandwichCost;
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

function clientInfo() {

    var modifyButton = document.getElementById('modifyinfo');
    modifyButton.disabled = true;

    var fName = document.getElementById('firstName').value;
    var lName = document.getElementById('lastName').value;
    var address = document.getElementById('address').value;
    var phone = document.getElementById('phone').value;

    customer.clientInfo = [fName, lName, address, phone];


    dispOrder(customer);

}

function addPizza(pizzaIndex, callback) {
    var pizza = calcPizza();
    var modifyButton = document.getElementById('modifypizza');
    var addButton = document.getElementById('addpizza');
    
    if (pizzaIndex !== undefined) {
        customer.pizza[pizzaIndex] = pizza;

        modifyButton.removeEventListener('click', callback);

        addButton.disabled = false;
        modifyButton.disabled = true;
    } else {
        if (parseFloat(pizza.cost) != 0) {
            customer.pizza.push(pizza);
        }
    }
  

    clientInfo();

    clearFoam();
}

function addSandwich(sandwichIndex, callback) {
    var sandwich = calcSandwich();
    var modifyButton = document.getElementById('modifysandwich');
    var addButton = document.getElementById('addsandwich');

    if (sandwichIndex !== undefined) {
        customer.sandwich[sandwichIndex] = sandwich;

        modifyButton.removeEventListener('click', callback);

        addButton.disabled = false;
        modifyButton.disabled = true;
    } else {
        if (parseFloat(sandwich.cost) != 0) {
            customer.sandwich.push(sandwich);
        }
    }
    clientInfo();

    clearFoam();
}

function addDrink(drinkIndex, callback) {
    var drink = calcDrink();
    var modifyButton = document.getElementById('modifydrink');
    var addButton = document.getElementById('adddrink');

    if (drinkIndex !== undefined) {
        customer.drink[drinkIndex] = drink;

        modifyButton.removeEventListener('click', callback);

        addButton.disabled = false;
        modifyButton.disabled = true;
    } else {
        if (parseFloat(drink.cost) != 0) {
            customer.drink.push(drink);
        }
    }

    clientInfo();

    clearFoam();
}

// function calcOrder() {

//     var fName = document.getElementById('firstName').value;
//     var lName = document.getElementById('lastName').value;
//     var address = document.getElementById('address').value;
//     var phone = document.getElementById('phone').value;

//     customer.clientInfo = [fName, lName, address, phone];

//     dispOrder(customer);

// }

function dispOrder(customer) {

    var receipt = '';

    receipt += '<h4>Customer Info</h4>';
    receipt += customer.clientInfo[0] + ' ' + customer.clientInfo[1] + '<br>';
    receipt += customer.clientInfo[2] + '<br>';
    receipt += customer.clientInfo[3] + '<br>';
    receipt += '<button onclick= "editCustomerInfo()">Modify</button>';

    receipt += '<h4>Your order</h4>';

    receipt += 'Pizza: <br>';

    var pizzaTotal = 0;
    for (var i = 0; i < customer.pizza.length; i++) {

        receipt += customer.pizza[i].quantity + ' ' + customer.pizza[i].size + ' ' + customer.pizza[i].type;
        for (var a = 0; a < customer.pizza[i].toppings.length; a++) {
            var thisTopping = customer.pizza[i].toppings[a];
            receipt += ', ' + thisTopping;
        }
        receipt += ' $' + customer.pizza[i].cost + '<input type = "checkbox" name = "pizzaInfo" value=' + i + '>' + '<br>';

        pizzaTotal += parseFloat(customer.pizza[i].cost);
    }
    receipt += '<button onclick= "editPizza()">Modify</button>';
    receipt += '<button onclick= "delPizza()">Del</button>';

    receipt += '<br>';
    receipt += 'Sandwiches: <br>';

    var sandwichTotal = 0;
    for (var i = 0; i < customer.sandwich.length; i++) {
        receipt += customer.sandwich[i].quantity + ' ' + customer.sandwich[i].type + ' $' + customer.sandwich[i].cost + '<input type = "checkbox" name = "sandwichInfo" value=' + i + '>' + '<br>';

        sandwichTotal += parseFloat(customer.sandwich[i].cost);
    }
    receipt += '<button onclick= "editSandwich()">Modify</button>';
    receipt += '<button onclick= "delSandwich()">Del</button>';

    receipt += '<br>';
    receipt += 'Drink: <br>';

    var drinkTotal = 0;
    for (var i = 0; i < customer.drink.length; i++) {
        receipt += customer.drink[i].quantity + ' ' + customer.drink[i].size + ' ' + customer.drink[i].type + '  $' + customer.drink[i].cost + '<input type = "checkbox" name = "drinkInfo" value=' + i + '>' + '<br>';

        drinkTotal += parseFloat(customer.drink[i].cost);
    }
    receipt += '<button onclick= "editDrink()">Modify</button>';
    receipt += '<button onclick= "delDrink()">Del</button>';
    receipt += '<br>';
    
    receipt += '<h4>Order Total: '

    var orderTotal = (pizzaTotal + sandwichTotal + drinkTotal).toFixed(2);
    receipt += '$' + orderTotal + '</h4>';


    document.getElementById('displayOrder').innerHTML = receipt;

}

function editCustomerInfo() {
    var modifyButton = document.getElementById('modifyinfo');

    modifyButton.disabled = false;

    var fName = document.getElementById('firstName');
    var lName = document.getElementById('lastName');
    var address = document.getElementById('address');
    var phone = document.getElementById('phone');

    fName.value = customer.clientInfo[0];
    lName.value = customer.clientInfo[1];
    address.value = customer.clientInfo[2];
    phone.value = customer.clientInfo[3];

}

function editPizza() {
    var index;
    var modifyButton = document.getElementById('modifypizza');
    var addButton = document.getElementById('addpizza');

    var pizzaTypeInput = document.querySelectorAll('.pizzaType input');
    var pizzaSizeInput = document.querySelectorAll('#pizzaSize option');
    var pizzaNumber = document.getElementById('numOfPizza');
    var pizzaToppings = document.querySelectorAll('input[type="checkbox"');
    // get drink array number
    index = document.querySelector('input[name="pizzaInfo"]:checked').value;
    modifyButton.disabled = false;
    addButton.disabled = true;

    // populaitng drink info
    for (var i = 0; i < pizzaTypeInput.length; i++) {
        var thisPizzaTypeInput = pizzaTypeInput[i];
        if (thisPizzaTypeInput.value == customer.pizza[index].type)
            thisPizzaTypeInput.checked = true;
    }

    for (let i = 0; i < pizzaSizeInput.length; i++) {
        var thisPizzaSizeInput = pizzaSizeInput[i];
        if (thisPizzaSizeInput.value == customer.pizza[index].size)
            thisPizzaSizeInput.selected = true;
    }

    pizzaNumber.value = customer.pizza[index].quantity;

    
    for (let i = 0; i < pizzaToppings.length; i++) {
        var thisCheckButton = pizzaToppings[i];
        for (var a = 0; a < customer.pizza[index].toppings.length; a++) {
            if(thisCheckButton.value == customer.pizza[index].toppings[a])
            thisCheckButton.checked = true;
        }
    }

    modifyButton.addEventListener('click', function modifyListener() {
        addPizza(index, modifyListener);
    });

}

function delPizza() {
    var index;
    index = document.querySelector('input[name="pizzaInfo"]:checked').value;
    customer.pizza.splice(index, 1);
    dispOrder(customer);
}

function editSandwich() {
    var index;
    var modifyButton = document.getElementById('modifysandwich');
    var addButton = document.getElementById('addsandwich');

    var sandwichTypeInput = document.querySelectorAll('.sandwichType input');
    var sandwichNumber = document.getElementById('numOfSandwich');

    // get sandiwich array number
    index = document.querySelector('input[name="sandwichInfo"]:checked').value;
    modifyButton.disabled = false;
    addButton.disabled = true;

    // populaitng sandwich info
    for (var i = 0; i < sandwichTypeInput.length; i++) {
        var thisSandwichTypeInput = sandwichTypeInput[i];
        if (thisSandwichTypeInput.value == customer.sandwich[index].value)
            thisSandwichTypeInput.checked = true;
    }

    sandwichNumber.value = customer.sandwich[index].quantity;

    modifyButton.addEventListener('click', function modifyListener() {
        addSandwich(index, modifyListener);
    });

}

function delSandwich() {
    var index;
    index = document.querySelector('input[name="sandwichInfo"]:checked').value;
    customer.sandwich.splice(index, 1);
    dispOrder(customer);
}

function editDrink() {
    var index;
    var modifyButton = document.getElementById('modifydrink');
    var addButton = document.getElementById('adddrink');

    var drinkTypeInput = document.querySelectorAll('.drinkType input');
    var drinkSizeInput = document.querySelectorAll('#drinkSize option');
    var drinkNumber = document.getElementById('numOfDrinks');

    // get drink array number
    index = document.querySelector('input[name="drinkInfo"]:checked').value;
    modifyButton.disabled = false;
    addButton.disabled = true;

    // populaitng drink info
    for (var i = 0; i < drinkTypeInput.length; i++) {
        var thisDrinkTypeInput = drinkTypeInput[i];
        if (thisDrinkTypeInput.value == customer.drink[index].type)
            thisDrinkTypeInput.checked = true;
    }

    for (let i = 0; i < drinkSizeInput.length; i++) {
        var thisDrinkSizeInput = drinkSizeInput[i];
        if (thisDrinkSizeInput.value == customer.drink[index].size)
            thisDrinkSizeInput.selected = true;
    }

    drinkNumber.value = customer.drink[index].quantity;

    modifyButton.addEventListener('click', function modifyListener() {
        addDrink(index, modifyListener);
    });

}

function delDrink() {
    var index;
    index = document.querySelector('input[name="drinkInfo"]:checked').value;
    customer.drink.splice(index, 1);
    dispOrder(customer);
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

    // var textInputs = document.querySelectorAll('input[type="text"]')

    // for (let i = 0; i < textInputs.length; i++) {
    //     var thisText = textInputs[i];
    //     thisText.value = '';
    // }

    // var telInputs = document.querySelectorAll('input[type="tel"]')

    // for (let i = 0; i < telInputs.length; i++) {
    //     var thisTel = telInputs[i];
    //     thisTel.value = '';
    // }
}
