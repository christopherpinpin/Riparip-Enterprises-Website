const db = require('../models/db.js');
const cloudinary = require('../utils/cloudinary'); 
const upload = require('../utils/multer'); 
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const uniqid = require('uniqid');

var user = {
    username: "",
    password: ""
}

var about = "";


const controller = {

    //Get Pages

    //Index Page
    getIndex: function (req, res) {

        var products = "";
        var services = "";

        //Find About info
        db.findMany('about', {}, null, {_id: 0}, function(result){
            if(result != null){
                about = result[0];

                //Find 3 newest products
                db.findMany('products', {}, {date: -1}, {_id: 0}, function(result){
                    if(result != null){
                        products = result.slice(0, 3);

                        //Find 2 services
                        db.findMany('services', {}, {date: -1}, {_id: 0}, function(result){
                            if(result != null){
                                services = result.slice(0, 2);
                                db.findMany('cart', {}, null, {_id: 0}, function(result) {
                                    if(result != null) {
                                        cart = result;
                                        res.render('index', {cart: cart, products: products, about: about, services: services});
                                    }
                                });
                            }
                            else{
                                console.log("Invalid");
                            }
                        });
                    }
                    else{
                        console.log("Invalid");
                    }
                });
            }
            else{
                console.log("Invalid");
            }
        });
    },

    //Products Page
    getProducts: function (req, res){
        var products = "";
        var brands = "";
        var categories = "";

        //Find All Products
        db.findMany('products', {}, {productname: 1}, {_id: 0}, function(result){
            if(result != null){
                products = result;

                //Find All Brands
                db.findMany('brands', {}, null, {_id: 0}, function(result){
                    if(result != null){
                        brands = result;

                        //Find All Categories
                        db.findMany('categories', {}, null, {_id: 0}, function(result){
                            if(result != null){
                                categories = result;
                                db.findMany('cart', {}, null, {_id: 0}, function(result) {
                                    if(result != null) {
                                        cart = result;
                                        res.render('products', {cart: cart, about: about, products: products, brands: brands, categories: categories});
                                    }
                                });
                            }
                            else{
                                console.log("Invalid");
                            }
                        });
                    }
                    else{
                        console.log("Invalid");
                    }
                });
            }
            else{
                console.log("Invalid");
            }
        });
        
    },

    //Services Page
    getServices: function (req, res){
        var services = "";
        var cart = "";

        //Find All Services
        db.findMany('services', {}, {servicename: 1}, {_id: 0}, function(result){
            if(result != null){
                services = result;
                db.findMany('cart', {}, null, {_id: 0}, function(result) {
                    if(result != null) {
                        cart = result;
                        res.render('services', {cart: cart, about: about, services: services});
                    }
                });
            }
            else{
                console.log("Invalid");
            }
        });
        
    },

    //Admin Login Page accessed through: /admin
    getAdminLogin: function (req, res){
        res.render('adminlogin');
    },

    //About page through: /about
    getAbout: function (req, res){
        db.findMany('about', {}, null, {_id: 0}, function(result) {
            if(result != null){
                about = result[0];
                db.findMany('cart', {}, null, {_id: 0}, function(result) {
                    if(result != null) {
                        cart = result;
                        res.render('about', {cart: cart, about: about});
                    }
                });
            }
        });        
    },

    //Admin Add Products Page
    getAddProducts: function(req, res){
        var products = "";
        var brands = "";
        var categories = "";
        db.findMany('products', {}, null, {_id: 0}, function(result){
            if(result != null){
                products = result;
                db.findMany('brands', {}, null, {_id: 0}, function(result){
                    if(result != null){
                        brands = result;
                        db.findMany('categories', {}, null, {_id: 0}, function(result){
                            if(result != null){
                                categories = result;
                                res.render('productadd', {about: about, products: products, brands: brands, categories: categories});
                            }
                            else{
                                console.log("Invalid");
                            }
                        });
                    }
                    else{
                        console.log("Invalid");
                    }
                });
            }
            else{
                console.log("Invalid");
            }
        });
    },

    //Admin Add Services Page
    getAddServices: function(req, res){
        db.findMany('services', {}, null, {_id: 0}, function(result){
            if(result != null){
                res.render('serviceadd', {services: result});
            }
            else{
                console.log("Invalid");
            }
        });
    },

    //Login Admin
    loginAdmin: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        
    
        db.findOne('users', {username: username}, function(result){
           if(result != null){
               bcrypt.compare(password, result.password, function (error, isVerify){
                if(isVerify){
                    req.session.username = username;
                    
                    var login = {
                        username: result.username,
                        password: result.password,
                    }
                    user = login;
                    console.log("Working!");
                    res.redirect("/admin/products");
                } else {
                    console.log("Wrong Password!");
                    res.redirect('/admin');
                }
            });
           }
           else {
               console.log("Invalid login credentials.");
               res.redirect('/admin');
           }
        });
    },

    //Shows the products based on selected brand
    getProductbyBrand : function(req, res) {
        var brand = req.params.brand;
    
        brand = brand.replace("%20", " ");
        
        var products = "";
        var brands = "";
        var categories = "";

        //Find Products by Brand
        db.findMany('products', {brand: brand}, null, {_id: 0}, function(result){
            if(result != null){
                products = result;

                //Find All Brands
                db.findMany('brands', {}, null, {_id: 0}, function(result){
                    if(result != null){
                        brands = result;

                        //Find All Categories
                        db.findMany('categories', {}, null, {_id: 0}, function(result){
                            if(result != null){
                                categories = result;
                                db.findMany('cart', {}, null, {_id: 0}, function(result) {
                                    if(result != null) {
                                        cart = result;
                                        res.render('products', {cart: cart, products: products, brands: brands, categories: categories});
                                    }
                                });
                            }
                            else{
                                console.log("Invalid");
                            }
                        });
                    }
                    else{
                        console.log("Invalid");
                    }
                });
            }
            else{
                console.log("Invalid");
            }
        });
    },
    
    //Shows the products based on selected brand
    getProductbyCategory : function(req, res) {
        var category = req.params.category;
    
        category = category.replace("%20", " ");
        
        var products = "";
        var brands = "";
        var categories = "";

        //Find Products by Brand
        db.findMany('products', {category: category}, null, {_id: 0}, function(result){
            if(result != null){
                products = result;

                //Find All Brands
                db.findMany('brands', {}, null, {_id: 0}, function(result){
                    if(result != null){
                        brands = result;

                        //Find All Categories
                        db.findMany('categories', {}, null, {_id: 0}, function(result){
                            if(result != null){
                                categories = result;
                                db.findMany('cart', {}, null, {_id: 0}, function(result) {
                                    if(result != null) {
                                        cart = result;
                                        res.render('products', {cart: cart, products: products, brands: brands, categories: categories});
                                    }
                                });
                            }
                            else{
                                console.log("Invalid");
                            }
                        });
                    }
                    else{
                        console.log("Invalid");
                    }
                });
            }
            else{
                console.log("Invalid");
            }
        });
    },

    //Sort Products From A-Z
    getProductsSortAZ: function (req, res){
        var products = "";
        var brands = "";
        var categories = "";

        //Find All Products
        db.findMany('products', {}, {productname: 1}, {_id: 0}, function(result){
            if(result != null){
                products = result;

                //Find All Brands
                db.findMany('brands', {}, null, {_id: 0}, function(result){
                    if(result != null){
                        brands = result;

                        //Find All Categories
                        db.findMany('categories', {}, null, {_id: 0}, function(result){
                            if(result != null){
                                categories = result;
                                db.findMany('cart', {}, null, {_id: 0}, function(result) {
                                    if(result != null) {
                                        cart = result;
                                        res.render('products', {cart: cart, products: products, brands: brands, categories: categories});
                                    }
                                });
                            }
                            else{
                                console.log("Invalid");
                            }
                        });
                    }
                    else{
                        console.log("Invalid");
                    }
                });
            }
            else{
                console.log("Invalid");
            }
        });
        
    },

    //Sort Products From Z-A
    getProductsSortZA: function (req, res){
        var products = "";
        var brands = "";
        var categories = "";

        //Find All Products
        db.findMany('products', {}, {productname: -1}, {_id: 0}, function(result){
            if(result != null){
                products = result;

                //Find All Brands
                db.findMany('brands', {}, null, {_id: 0}, function(result){
                    if(result != null){
                        brands = result;

                        //Find All Categories
                        db.findMany('categories', {}, null, {_id: 0}, function(result){
                            if(result != null){
                                categories = result;
                                db.findMany('cart', {}, null, {_id: 0}, function(result) {
                                    if(result != null) {
                                        cart = result;
                                        res.render('products', {cart: cart, products: products, brands: brands, categories: categories});
                                    }
                                });
                            }
                            else{
                                console.log("Invalid");
                            }
                        });
                    }
                    else{
                        console.log("Invalid");
                    }
                });
            }
            else{
                console.log("Invalid");
            }
        });
        
    },

    //Sort Products Old to New
    getProductsSortOldToNew: function (req, res){
        var products = "";
        var brands = "";
        var categories = "";

        //Find All Products
        db.findMany('products', {}, {date: 1}, {_id: 0}, function(result){
            if(result != null){
                products = result;

                //Find All Brands
                db.findMany('brands', {}, null, {_id: 0}, function(result){
                    if(result != null){
                        brands = result;

                        //Find All Categories
                        db.findMany('categories', {}, null, {_id: 0}, function(result){
                            if(result != null){
                                categories = result;
                                db.findMany('cart', {}, null, {_id: 0}, function(result) {
                                    if(result != null) {
                                        cart = result;
                                        res.render('products', {cart: cart, products: products, brands: brands, categories: categories});
                                    }
                                });
                            }
                            else{
                                console.log("Invalid");
                            }
                        });
                    }
                    else{
                        console.log("Invalid");
                    }
                });
            }
            else{
                console.log("Invalid");
            }
        });
        
    },

    //Sort Products New to Old
    getProductsSortNewToOld: function (req, res){
        var products = "";
        var brands = "";
        var categories = "";

        //Find All Products
        db.findMany('products', {}, {date: -1}, {_id: 0}, function(result){
            if(result != null){
                products = result;

                //Find All Brands
                db.findMany('brands', {}, null, {_id: 0}, function(result){
                    if(result != null){
                        brands = result;

                        //Find All Categories
                        db.findMany('categories', {}, null, {_id: 0}, function(result){
                            if(result != null){
                                categories = result;
                                db.findMany('cart', {}, null, {_id: 0}, function(result) {
                                    if(result != null) {
                                        cart = result;
                                        res.render('products', {cart: cart, products: products, brands: brands, categories: categories});
                                    }
                                });
                            }
                            else{
                                console.log("Invalid");
                            }
                        });
                    }
                    else{
                        console.log("Invalid");
                    }
                });
            }
            else{
                console.log("Invalid");
            }
        });
        
    },

    //Add products by Admin
    addProduct : async function(req,res) {
        var prodpic = req.body.filename;
        var productname = req.body.prodname;
        var model = req.body.prodmodel;
        var category = req.body.prodcat;
        var brand = req.body.prodbrand;
        var proddesc = req.body.proddesc;
        var date = new Date();

        productname = productname.trim();
        model = model.trim();
        proddesc = proddesc.trim();

        console.log("------------------------------------------------------------");
        console.log(req.file);

        if (typeof req.file !== 'undefined'){ //if image is not empty, upload
            try{
                var img = await cloudinary.uploader.upload(req.file.path);
                var prodpic =  img.url;
                console.log(prodpic);
               
            } catch(err){
                console.log(err)
            }
        }

        var product = {
            prodpic: prodpic,
            productname: productname,
            model: model,
            productdesc: proddesc,
            category: category,
            brand: brand,
            date: date
        }

        db.findOne('products', {productname: product.productname, model: product.model}, function(result){
            if(result != null){
                res.redirect('/admin/products');
            }
            else {
                // Checks if there are empty fields
                if (product.prodpic == null || product.productname == "" || product.model == "" || product.productdesc == "") {
                    res.redirect('/admin/products');
                }
                // Solves blank fields issue
                else {
                    db.insertOne('products', product);
                    res.redirect('/admin/products');
                }
            }
         });
    },

    //Check if product exists
    checkProductExist : function(req,res) {

        var productname = req.query.productname;
        var model = req.query.model;

        db.findOne('products', {productname: productname, model: model}, function(result){
            if(result == null)
                res.json(true);
            else
                res.json(false);
         });
    },

    //Check if product exists for edit product
    checkEditProductExist : function(req,res) {

        var productname = req.query.productname;
        var model = req.query.model;
        var category = req.query.category;
        var brand = req.query.brand;
        var productdesc = req.query.productdesc;

        db.findOne('products', {productname: productname, model: model, category: category, brand: brand, productdesc: productdesc}, function(result){
            if(result == null)
                res.json(true);
            else
                res.json(false);
         });
    },

    //Add products by Admin
    addService : function(req,res) {
        var servicename = req.body.servname;
        var servicedesc = req.body.servdesc;
        var date = new Date();

        servicename = servicename.trim();
        servicedesc = servicedesc.trim();

        var service = {
            servicename: servicename,
            servicedesc: servicedesc,
            date: date
        }

        db.findOne('services', {servicename: service.servicename}, function(result){
            if(result != null){
                res.redirect('/admin/services');
            }
            else {
                // Check if field is blank after trim
                if (servicename == "" || servicedesc == "") {
                    res.redirect('/admin/services');
                }
                // Fixes blank field issue
                else {
                    db.insertOne('services', service);
                    res.redirect('/admin/services')
                }
            }
         });
    },

    //Edit products by Admin
    editProduct : async function(req, res) {
        var oldpname = req.params.pname;
        var oldpmodel = req.params.pmodel;

        oldpname = oldpname.replace("%20", " ");
        oldpmodel = oldpmodel.replace("%20", " ");
        
        var prodpic = req.body.editimgfile;
        var productname = req.body.editprodname;
        var model = req.body.editprodmodel;
        var category = req.body.editprodcat;
        var brand = req.body.editprodbrand;
        var productdesc = req.body.editproddesc;

        productname = productname.trim();
        model = model.trim();
        category = category.trim();
        brand = brand.trim();
        productdesc = productdesc.trim();


        console.log("------------------------------------------------------------");
        console.log(req.file);

        if (typeof req.file !== 'undefined'){ //if image is not empty, upload
            try{
                var img = await cloudinary.uploader.upload(req.file.path);
                prodpic =  img.url;
                console.log(prodpic);
               
            } catch(err){
                console.log(err)
            }
        }


        db.findOne('products', {productname: oldpname, model: oldpmodel}, function(result){
            if(result != null){
                var oldp = result;

                if(prodpic == null)
                    prodpic = oldp.prodpic;
                if(productname == "")
                    productname = oldp.productname;
                if(model == "")
                    model = oldp.model;
                if(category == "")
                    category = oldp.category;
                if(brand == "")
                    brand = oldp.brand;
                if(productdesc == "")
                    productdesc = oldp.productdesc;

                var newprod = {
                    prodpic: prodpic,
                    productname: productname,
                    model: model,
                    productdesc: productdesc,
                    category: category,
                    brand: brand
                }
                
                if(oldpname == newprod.productname && oldpmodel == newprod.model){
                    db.updateOne(`products`, {productname: oldpname, model: oldpmodel}, 
                        {$set: {prodpic: newprod.prodpic, productname: newprod.productname, model: newprod.model, productdesc: newprod.productdesc,
                                category: newprod.category, brand: newprod.brand}})
                    res.redirect('/admin/products');
                }
                else{
                    db.findOne('products', {productname: newprod.productname, model: newprod.model}, function(result){
                        if(result != null){
                            res.redirect('/admin/products');
                        }
                        else{
                            //Update Product in Database
                            db.updateOne(`products`, {productname: oldpname, model: oldpmodel}, 
                            {$set: {prodpic: newprod.prodpic, productname: newprod.productname, model: newprod.model, productdesc: newprod.productdesc,
                                    category: newprod.category, brand: newprod.brand}})
                            res.redirect('/admin/products');
                        }
                    });
                }
            }
            else {
                res.redirect('/admin/products');
            }
         });
    },

    //Edit services by Admin
    editService : function(req, res) {
        var oldsname = req.params.sname;

        var servicename = req.body.editservname;
        var servicedesc = req.body.editservdesc;

        servicename = servicename.trim();
        servicedesc = servicedesc.trim();

        db.findOne('services', {servicename: oldsname}, function (result) {
            if (result != null) {
                var olds = result;

                if (servicename == "") {
                    servicename = olds.servicename;
                }
                if (servicedesc == "") {
                    servicedesc = olds.servicedesc;
                }

                var newserv = {
                    servicename: servicename,
                    servicedesc: servicedesc,
                }

                if(oldsname == newserv.servicename){
                    db.updateOne(`services`, {servicename: oldsname}, {$set: {servicename: newserv.servicename, servicedesc: newserv.servicedesc}})
                    res.redirect('/admin/services');
                }
                else{
                    db.findOne('services', {servicename: newserv.servicename}, function(result){
                        if(result != null){
                            res.redirect('/admin/services');
                        }
                        else{
                            //Update Product in Database
                            db.updateOne(`services`, {servicename: oldsname}, {$set: {servicename: newserv.servicename, servicedesc: newserv.servicedesc}})
                            res.redirect('/admin/services');
                        }
                    });
                }
            }
            else {
                res.redirect('/admin/services')
            }
        });
    },

    deleteProduct : function(req, res) {
        var pname = req.query.pdelname;
        var pmodel = req.query.pdelmodel;

        console.log(pname);
        console.log(pmodel);

        db.deleteOne('products', {productname: pname, model: pmodel});
    },

    deleteService : function(req, res) {
        var sname = req.query.sdelname;

        console.log(sname);

        db.deleteOne('services', {servicename: sname});
    },

    //Edit About Page by Admin
    getEditAbout : function(req, res) {
        db.findMany('about', {}, null, {_id: 0}, function(result){
            if(result != null){
                res.render('aboutedit', result[0]);
            }
            else{
                console.log("Invalid");
            }
        });
        
    },

    //Edit info in about page
    editAboutPage : async function(req, res) {
        var logo = req.body.editlogopic;
        var aboutcompany = req.body.editaboutcompany;
        var slogan = req.body.editslogan;
        var aboutowner = req.body.editaboutowner;
        var contact1 = req.body.editcontact1;
        var contact2 = req.body.editcontact2;
        var email = req.body.editemail;

        console.log("------------------------------------------------------------");
        console.log(req.file);

        if (typeof req.file !== 'undefined'){ //if image is not empty, upload
            try{
                var img = await cloudinary.uploader.upload(req.file.path);
                logo =  img.url;
                console.log(logo);
               
            } catch(err){
                console.log(err)
            }
        }

        db.findMany('about', {}, null, {_id: 0}, function(result){
            if(result != null){
                db.updateOne('about', {aboutcompany: result[0].aboutcompany}, {$set: {logo: logo, aboutcompany: aboutcompany, 
                    slogan: slogan, aboutowner: aboutowner, contact1: contact1, contact2: contact2, email: email}});
                db.findMany('about', {}, null, {_id: 0}, function(result){
                    if(result != null){
                        about = result[0];
                        res.redirect('/admin/about')
                    }
                    else{
                        console.log("Invalid");
                    }
                });
            }
            else{
                console.log("Invalid");
            }
        });
    },

    //Edit categories and brands
    editCategBrand : function(req, res){

        var categoriesSelected = "";
        var brandsSelected = "";
        var addCategory = "";
        var addBrand = "";

        //Returns selected categories and brands
        var categoriesSelected = req.body.categories;
        var brandsSelected = req.body.brands;

        //Returns categories and brands to add
        addCategory = req.body.newcat;
        addBrand = req.body.newbrand;

        console.log(addCategory);
        console.log(addBrand);
        console.log(categoriesSelected);
        console.log(brandsSelected);

        var i;

        if(addCategory != "")
            db.insertOne('categories', {categoryname: addCategory});
        
        if(addBrand != "")
            db.insertOne('brands', {brandname: addBrand});

        if(Array.isArray(categoriesSelected)){
            for(i = 0; i < categoriesSelected.length; i++){
                db.deleteOne('categories', {categoryname: categoriesSelected[i]});
            }
        }
        else
            db.deleteOne('categories', {categoryname: categoriesSelected});

        if(Array.isArray(brandsSelected)){
            for(i = 0; i < brandsSelected.length; i++){
                db.deleteOne('brands', {brandname: brandsSelected[i]});
            }
        }
        else
            db.deleteOne('brands', {brandname: brandsSelected});
        

        res.redirect('/admin/products');
    },

    //View Specific Product
    viewSpecificProduct : function(req, res) {
        var pname = req.params.pname;
        var pmodel = req.params.pmodel;

        var products = "";
        var item = "";

        pname = pname.replace("%20", " ");
        pmodel = pmodel.replace("%20", " ");

        db.findOne('products', {productname: pname, model: pmodel}, function(result){
            if(result != null){
                item = result;
                db.findMany('products', {category: item.category}, null, {_id: 0}, function(result){
                    if(result != null){
                        products = result.slice(0,5);
                        products = products.filter(function(el) { return el.model != item.model; });
                        if(products.length == 5){
                            products.pop();
                        }
                        db.findMany('cart', {}, null, {_id: 0}, function(result) {
                            if(result != null) {
                                cart = result;
                                res.render('viewproduct', {cart: cart, products: products, item: item});
                            }
                        });
                    }
                    else{
                        res.redirect('/products');
                    }
                });
            }
            else{
                res.redirect('/products');
            }
        });

    },

    //View Specific Service
    viewSpecificService : function(req, res) {
        var sname = req.params.sname;

        var services = "";
        var item = "";

        sname = sname.replace("%20", " ");

        db.findOne('services', {servicename: sname}, function(result){
            if(result != null){
                item = result;
                db.findMany('services', {}, {date: 1}, {_id: 0}, function(result){
                    if(result != null){
                        services = result.slice(0,3);
                        services = services.filter(function(el) { return el.servicename != item.servicename; });
                        if(services.length == 3){
                            services.pop();
                        }
                        db.findMany('cart', {}, null, {_id: 0}, function(result) {
                            if(result != null) {
                                cart = result;
                                res.render('viewservice', {cart: cart, services: services, item: item});
                            }
                        });
                    }
                    else{
                        res.redirect('/services');
                    }
                });
            }
            else{
                res.redirect('/services');
            }
        });
    },

    //Get checkout page with cart content
    getCheckout : function(req, res){
        var cart = "";

        db.findMany('about', {}, null, {_id: 0}, function(result) {
            if (result != null) {
                about = result[0];
                db.findMany('cart', {}, null, {_id: 0}, function(result) {
                    if (result != null) {
                        cart = result;
                        res.render('checkout', {cart: cart, about: about});
                    }
                    else {
                        console.log("Cart is empty.");
                    }
                });
            }
        });
    },

    //Delete product from cart
    deleteProductCart : function(req, res) {
        var pname = req.params.pname;
        var pmodel = req.params.pmodel;

        pname = pname.replace("%20", " ");
        pmodel = pmodel.replace("%20", " ");

        db.deleteOne('cart', {productname: pname, model: pmodel});
        res.redirect('back');
    },

    //Delete service from cart
    deleteServiceCart : function(req, res) {
        var sname = req.params.sname;

        sname = sname.replace("%20", " ");

        db.deleteOne('cart', {servicename: sname});
        res.redirect('back');
    },

    //Send email from checkout
    sendEmailCheckout : function(req, res) {
        // create unique id
        const id = uniqid();

        // make cart variables
        var cart = req.query.items;
        var cartClient = "";

        for (var i=0; i<cart.length; i++) {
            if (cart[i].type == "product") {
                cartClient += "<p>Product name: " + cart[i].productname + ", Model: " + cart[i].model + ", Quantity: " + cart[i].qty + "</p>";
            } else {
                cartClient += "<p>Service name: " + cart[i].servicename + "</p>";
            }
        }


        // get client details
        const client = {
            fname: req.query.fname,
            lname: req.query.lname,
            hadd: req.query.hadd,
            email: req.query.eadd,
            mobile: req.query.mnum,
            cname: req.query.cname,
            cadd: req.query.cadd,
            ccon: req.query.ccon
        }

        // transporter object
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'swenggrp5@gmail.com',
                pass: 'Password12345!'
            }
        });

        // email format
        const email = transporter.sendMail({
            from: 'swenggrp5@gmail.com',
            to: 'grp5testreceiver@gmail.com', // communicate with client
            subject: '[RIPARIP] Inquiry #' + id + ' confirmed',
            html:
            "<p>Client name: " + client.fname + " " + client.lname + "</p>" +
            "<p>Client home address: " + client.hadd + "</p>" +
            "<p>Client email: " + client.email + "</p>" +
            "<p>Client contact number: " + client.mobile + "</p>" +
            "<p>=================</p>" +
            "<p>Company name: " + client.cname + "</p>" +
            "<p>Company address: " + client.cadd + "</p>" +
            "<p>Company contact number: " + client.ccon + "</p>" +
            "<p>=================</p>" +
            "<p><b>Products and services inquired:</b></p>" + cartClient +
            "<p>=================</p>" +
            "<p>You can contact your client by emailing <b>" + client.email + "</b>. " +
            "Please do not reply to this email. This is an auto-generated message.</p>"
        });
    }
}

module.exports = controller;