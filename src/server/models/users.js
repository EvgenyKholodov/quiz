import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		// unique: true,
		index: true,
		required: true
	},

	password: {
		required: true,
		type: String
	},
	email: {
		required: true,
		// unique: true,
		type: String

	}

});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newuser) {


	return User.findOne({$or: [{email: newuser.email}, {username: newuser.username}]})
		.then((user) => {

			if (user) {

				if (user.email == newuser.email) return Promise.reject({email: "User with this email already exists"});
				if (user.username == newuser.username) return Promise.reject({username: "User with this username already exists"});
			}

	const salt = bcrypt.genSaltSync(10);
	newuser.password = bcrypt.hashSync(newuser.password, salt);
	return User.create(newuser);


	});

}

module.exports.getUser = (identifier, comparePassword) => {
	return User.findOne({$or: [{username: identifier}, {email: identifier}]})
		.then((user) => {
			if (!user) return Promise.reject({identifier: "User not found"});
			let isMatch = bcrypt.compareSync(comparePassword,user.password);
			return isMatch ? user : Promise.reject({password : "Password is not match"})
		});

};


module.exports.getUserByUsername = function (username, callback) {
	const query = {username: username};
	User.findOne(query, callback);
}
module.exports.getUserById = function (id, callback) {
	User.findById(query, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		if (err) throw err;
		callback(null, isMatch)
	});
}