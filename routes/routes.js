const express = require(`express`);
const controller = require('../controllers/controller.js');
const upload = require('../utils/multer.js');

const app = express();

//Get Pages
app.get('/', controller.getIndex);
app.get('/products', controller.getProducts);
app.get('/services', controller.getServices);
app.get('/admin', controller.getAdminLogin);
app.get('/about', controller.getAbout);
app.get('/checkout', controller.getCheckout);
app.get('/admin/products', controller.getAddProducts);
app.get('/admin/services', controller.getAddServices);
app.get('/admin/about', controller.getEditAbout);

//Get by Brand
app.get('/products/brand/:brand', controller.getProductbyBrand);

//Get by Category
app.get('/products/category/:category', controller.getProductbyCategory);

//Sort Products from A-Z
app.get('/products/AZ', controller.getProductsSortAZ);

//Sort Products from Z-A
app.get('/products/ZA', controller.getProductsSortZA);

//Sort Products from Old to New
app.get('/products/OldToNew', controller.getProductsSortOldToNew);

//Sort Products from New to Old
app.get('/products/NewToOld', controller.getProductsSortNewToOld);

//Login Admin
app.post('/login', controller.loginAdmin);

//Add Product by Admin
app.post('/addproduct', upload.single('filename'), controller.addProduct);

//Add Service by Admin
app.post('/addservice', controller.addService);

//Edit Product by Admin
app.post('/editproduct/:pname/:pmodel', upload.single('editimgfile'), controller.editProduct);

//Edit Service by Admin
app.post('/editservice/:sname', controller.editService);

//Delete Product by Admin
app.get('/delproduct', controller.deleteProduct);

//Delete Service by Admin
app.get('/delservice', controller.deleteService);

//Edit Info in About Page by Admin
app.post('/editabout', upload.single('editlogopic'), controller.editAboutPage);

//Edit Categories and Brand
app.post('/editCategBrand', controller.editCategBrand);

//View specific product
app.get('/products/:pname/:pmodel', controller.viewSpecificProduct);

//View specific service
app.get('/services/:sname', controller.viewSpecificService);

//Delete product from cart
app.post('/deleteprodcart/:pname/:pmodel', controller.deleteProductCart);

//Delete service from cart
app.post('/deleteservcart/:sname', controller.deleteServiceCart);

//Send email from checkout
app.get('/sendemail', controller.sendEmailCheckout);

//Check product exists
app.get('/checkProductExist', controller.checkProductExist);

//Check product exists
app.get('/checkEditProductExist', controller.checkEditProductExist);

module.exports = app;