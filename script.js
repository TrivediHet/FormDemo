var prices = [[3, 3.50, 4], [2, 2.50, 3], [1.50, 2, 2.50], [6, 7, 8], [9, 10.50, 12]];
var beverageList = ["Tea", "Coffee", "Soda", "Beer", "Wine"];
var sizeList = ["Small", "Medium", "Large"];

$(document).ready(function () {
    $("#selector").on("change", function () {
        var e = document.getElementById("selector");
        if (e.options[e.selectedIndex].value >= 3) {
            $("#age").show();
            $("#radioBtn").hide();
        } else {
            $("#age").hide();
            $("#radioBtn").show();
        }
    });
});

var createOrder = function () {
    var customer = document.querySelector("#customer").value;
    var selection = document.getElementById("selector");
    var beverage = selection.options[selection.selectedIndex].value;
    var size = document.querySelector("input[type=radio]:checked").value;
    var quantity = document.querySelector("#numBox").value;
    var header = "";
    var message = "";
    var total = "";
    var canOrder = true;

    if (beverage >= 3) {
        var birthDate = new Date(document.querySelector("#date").value);
        var today = new Date();
        if (today.getFullYear() - birthDate.getFullYear() < 21) {
            canOrder = false;
        } else if (today.getFullYear() - birthDate.getFullYear() == 21) {
            if (today.getMonth() - birthDate.getMonth() < 0) {
                canOrder = false;
            } else if (today.getMonth() - birthDate.getMonth() == 0) {
                if (today.getDate() - birthDate.getDate() < 0) {
                    canOrder = false;
                }
            }
        }
    }
    if (canOrder) {
        header = "<b>RECEIPT</b>";
        message = customer + " ordered " + quantity + " " + sizeList[size] + " " + beverageList[beverage] + " @ $" + prices[beverage][size];
        total = "TOTAL DUE: " + (quantity * prices[beverage][size]);
    } else {
        message = "You must be 21 to order alcoholic beverage.";
    }
    document.querySelector("#receipt").innerHTML = header + "<br>" + message + "<br>" + total;
}

window.onload = function () {
    document.querySelector("#orderBtn").onClick = createOrder;
}