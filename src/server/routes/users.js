import express from 'express';
import validateInput from '../shared/validateUser';
import jwt from 'jsonwebtoken';
import secret from '../jwt-config';
import validateInputLogin from '../shared/login';
// import getUser from '../models/users'

let router = express.Router();
const User = require('../models/users');


router.post("/login", (req, res) => {
	const {errors, isValid} = validateInputLogin(req.body);


	if (isValid) {
		const {identifier, password} = req.body;
		User.getUser(identifier, password)
			.then((user) => {
				res.status(201).send({
					id_token: createToken(user.username),
					user: user
				});
			})

			.catch((error) => {
				console.log('err', error);
				res.status(400).json({error});
			});
	}


});

function createToken(username) {
	return jwt.sign({user: username}, secret,
		{expiresIn: 60 * 60});
}

router.post('/', (req, res) => {
	const {errors, isValid} = validateInput(req.body);
	if (!isValid) return res.status(400).json(errors);


	User.createUser(req.body)
		.then((user) => {
			res.status(201).send({
				id_token: createToken(user.username),
				user: user.username
			});
		})
		.catch((error) => {


			res.status(400).json({error});
		});

});


export default router;