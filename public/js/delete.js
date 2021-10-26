$(document).ready(function () {

    $('.modal').on('click', '.delprodbtn', function () {
        var pname = $(this).parent().children()[5].defaultValue;
        var pmodel = $(this).parent().children()[10].defaultValue;

        var x = confirm("Are you sure you want to delete this product?");
        if (x) {
            $.get('/delproduct', {pdelname: pname, pdelmodel: pmodel}, function(result) { });  // Delete product
            alert("Product deleted successfully.");
        }
    });

    $('.modal').on('click', '.delservbtn', function () {
        var sname = $(this).parent().children()[2].defaultValue;

        var x = confirm("Are you sure you want to delete this service?");
        if (x) {
            $.get('/delservice', {sdelname: sname}, function(result) { });  // Delete service
            alert("Service deleted successfully.");
        }
    });

    $('.formaddprod').on('click', '#btnaddprod', function () {
        var pname = document.getElementById("prodname").value;
        var pmodel = document.getElementById("prodmodel").value;

        console.log(pname);
        console.log(pmodel);

        $.get('/checkProductExist', {productname: pname, model: pmodel}, function(result) { 
            if(result)
                alert("Product added successfully.");
            else
                alert("Product already exists.");
        });
        

        
            
    });

    $('.formeditproduct').on('click', '#btnsavechanges', function () {
        var pname = document.getElementById("editprodname").value;
        var pmodel = document.getElementById("editprodmodel").value;
        var pcat = document.getElementById("editprodcat").value;
        var pbrand = document.getElementById("editprodbrand").value;
        var pdesc = document.getElementById("editproddesc").value;


        $.get('/checkEditProductExist', {productname: pname, model: pmodel, category: pcat, brand: pbrand, productdesc: pdesc}, function(result) { 
            if(result)
                alert("Changes saved.");
            else
                alert("No changes saved.");
        });
        

        
            
    });

});