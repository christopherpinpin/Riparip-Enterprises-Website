$(document).ready(function () {
    // adding a product to cart using "Inquire" button
    $('.modal').off().on('click', '.addProd', function () {
        var pname = $(this).parent().children()[1].defaultValue;
        var pmodel = $(this).parent().children()[2].defaultValue;
        var pqty =  parseInt(document.getElementById(pname + pmodel + "qty").value);

        console.log(pname);
        console.log(pmodel);
        console.log(pqty);

        var item = {
            productname: pname,
            model: pmodel,
            qty: pqty,
            type: "product"
        }
        
        var productKey = "product" + pname + pmodel;

        console.log("--------------------------------------------------");
        console.log(localStorage.getItem(productKey));
        console.log("--------------------------------------------------");

        // if item already exists, update qty only
        if (localStorage.getItem(productKey) != null) {
            var curItem = JSON.parse(localStorage.getItem(productKey));
            var curQty = curItem.qty;
            var newQty = parseInt(curQty) + parseInt(pqty);
            var newItem = {
                productname: pname,
                model: pmodel,
                qty: newQty,
                type: "product"
            };
            localStorage.setItem(productKey, JSON.stringify(newItem));
        } else {
            localStorage.setItem(productKey, JSON.stringify(item));
        }
    });

    // adding a product through its specific product page using "Add to Cart" button
    $('.product_info').off().on('click', '.addProdSpec', function () {
        var pname = $(this).parent().children()[1].defaultValue;
        var pmodel = $(this).parent().children()[2].defaultValue;
        var pqty =  parseInt(document.getElementById(pname + pmodel + "qty").value);

        console.log(pname);
        console.log(pmodel);
        console.log(pqty);

        var item = {
            productname: pname,
            model: pmodel,
            qty: pqty,
            type: "product"
        }
        
        var productKey = "product" + pname + pmodel;

        console.log("--------------------------------------------------");
        console.log(localStorage.getItem(productKey));
        console.log("--------------------------------------------------");

        // if item already exists, update qty only
        if (localStorage.getItem(productKey) != null) {
            var curItem = JSON.parse(localStorage.getItem(productKey));
            var curQty = curItem.qty;
            var newQty = parseInt(curQty) + parseInt(pqty);
            var newItem = {
                productname: pname,
                model: pmodel,
                qty: newQty,
                type: "product"
            };
            localStorage.setItem(productKey, JSON.stringify(newItem));
        } else {
            localStorage.setItem(productKey, JSON.stringify(item));
        }
    });

    // adding a service to cart using "Inquire" button
    $('.readmore').off().on('click', '.add_cart_services', function () {
        var sname = $(this).parent().children()[1].defaultValue;

        console.log(sname);

        var item = {
            servicename: sname,
            type: "service"
        }
        
        var serviceKey = "service" + sname;

        console.log("--------------------------------------------------");
        console.log(localStorage.getItem(serviceKey));
        console.log("--------------------------------------------------");

        localStorage.setItem(serviceKey, JSON.stringify(item));
    });

    // adding a service through its specific service page using "Add to Cart" button
    $('.addServSpec').off().on('click', '.addServSpecific', function () {
        var sname = $(this).parent().children()[1].defaultValue;

        console.log(sname);

        var item = {
            servicename: sname,
            type: "service"
        }
        
        var serviceKey = "service" + sname;

        console.log("--------------------------------------------------");
        console.log(localStorage.getItem(serviceKey));
        console.log("--------------------------------------------------");

        localStorage.setItem(serviceKey, JSON.stringify(item));
    });
});