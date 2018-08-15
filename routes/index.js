var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const expressValidator = require('express-validator');
const passport = require('passport');
const saltRounds = 10;
let user_id = {};

/* GET home page. */


router.get('/products',(req, res, next) => {
	const db = require('../db.js');
	
	db.query('SELECT * from products ',(error,results,fields) => {
		let string = JSON.stringify(results);
		console.log(string);
		n = results.length;
		if(error) throw error;
		else{
			for(let i =0;i<n;i++){
				console.log(results[i].harvestedDate);

			}
			  res.render('products',{string:results});
		}
	});

  // res.render('products');
});




router.get('/logout', (req, res, next) => {
    req.logout()
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    })
});


router.get('/', (req, res, next) => {
  res.render('home');
});

router.post('/login', passport.authenticate('local',{
	successRedirect:'/user/products',
	failureRedirect:'/'
}));

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
	const db = require('../db.js');
		const username = req.body.username;
		const email = req.body.email;
		let password = req.body.password;
		let address = req.body.address;
		let contact = req.body.contact;
		console.log(username + contact + email);

		bcrypt.hash(password, saltRounds, function(err, hash) {
  		if(err) throw err;
  		else{
			db.query('INSERT INTO supplier (suppName,suppPassword,suppEmail,suppContact,suppAddress) VALUES(?,?,?,?,?)' ,[username,hash,email,contact,address], 
				(error,results,fields)=>{
					if(error) throw error;
					else {
						db.query('SELECT LAST_INSERT_ID() AS user_id', (error,results,fields) => {
							if(error) throw error;
							else{
								console.log(results[0]);
								user_id = results[0];
							req.login(user_id, function(err) {
								  if (err) { return next(err); }
								  return res.redirect('/user/dashboard');
								});
							}
						});

					}
				});  		
			}
		});
});		
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});
 
passport.deserializeUser(function(id, done) {
    done(null, user_id);
});

function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}


router.post('/validate', (req, res, next) => {
	const db = require('../db.js');
	
	db.query('SELECT suppEmail from supplier where suppEmail=?',[req.body.email],(error,results,fields) => {
		if(error) throw error;
		console.log(req.body.email);
		console.log(results[0]);
		if(!results[0]){    // NO USER FOUND WITH ENTERED NAME
			res.send(true); // RETURN TRUE
		} else {
			res.send(false);
		}
	});
});

router.post('/validate1', (req, res, next) => {
	const db = require('../db.js');
	
	db.query('SELECT suppContact from supplier where suppContact=?',[req.body.contact],(error,results,fields) => {
		if(error) throw error;
		console.log(req.body.contact);
		console.log(results[0]);
		if(!results[0]){    // NO USER FOUND WITH ENTERED NAME
			res.send(true); // RETURN TRUE
		} else {
			res.send(false);
		}
	});
});

module.exports = router;
