var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/products',authenticationMiddleware()  ,(req, res, next) => {
 console.log('ye tera pakistan hai'+req.session.passport.user);
	const db = require('../db.js');
	db.query('SELECT * FROM products JOIN sales ON sales.productID = products.productID where sales.supplierID=?',[req.session.passport.user],(error,results,fields) => {
		let string = JSON.stringify(results);
		console.log(string);
		if(error) throw error;
		else{
			res.render('products',{string:results});
		}
	});
 
  //console.log(req.isAuthenticated());
});

function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}

module.exports = router;
// SELECT * FROM products  JOIN (products, sales) ON (products.productID=sales.productID AND products.productID=?)
//                  SELECT * FROM products JOIN products ON sales.productID = products.productID AND products.productID = ?
