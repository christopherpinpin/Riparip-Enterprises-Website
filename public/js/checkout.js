$(document).ready(function () {
    $('#place_inquiry').click(function() {
        var cart = [];
        var f_name = $.trim($('#f_name').val());
        var l_name = $.trim($('#l_name').val());
        var h_add = $.trim($('#home_address').val());
        var e_add = $.trim($('#email_address').val());
        var m_num = $.trim($('#mobile_num').val());
        var c_name = $.trim($('#c_name').val());
        var c_add = $.trim($('#c_address').val());
        var c_con = $.trim($('#c_contact').val());

        for (var i=0; i<localStorage.length; i++) {
            cart.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }

        $.get('/sendemail', {items: cart, fname: f_name, lname: l_name, hadd: h_add,
                            eadd: e_add, mnum: m_num, cname: c_name, cadd: c_add,
                            ccon: c_con}, function(result) { });

        localStorage.clear();
    });
});