const UserSchema = require('../models').userSchema;
const Utility = require('../services/utility');

const permissionLevel1 = ['admin'];
const permissionLevel2 = ['admin', 'manager'];

export function addMealLog(req, res) {
	const userId = req.params.userId;
	// check if admin has called the route
	if (userId != null) {
		// check if the user who called it is really admin
		if (permissionLevel1.findIndex(elem => elem === req.user.role) === -1)
			return res.status(401).send();
		UserSchema.findOne({ _id: userId }, (err, user) => {
			if (err) return res.status(404).send();
			return Utility.addMealLog(user, req, res);
		});
	} else {
		return Utility.addMealLog(req.user, req, res);
	}
}

export function removeMealLog(req, res) {
	const userId = req.params.userId;
	// check if admin has called the route
	if (userId != null) {
		// check if the user who called it is really admin
		if (permissionLevel1.findIndex(elem => elem === req.user.role) === -1)
			return res.status(401).send();
		UserSchema.findOne({ _id: userId }, (err, user) => {
			if (err) return res.status(404).send();
			return Utility.removeMealLog(user, req, res);
		});
	} else {
		return Utility.removeMealLog(req.user, req, res);
	}
}

export function editMealLog(req, res) {
	const userId = req.params.userId;
	// check if admin has called the route
	if (userId != null) {
		// check if the user who called it is really admin
		if (permissionLevel1.findIndex(elem => elem === req.user.role) === -1)
			return res.status(401).send();
		UserSchema.findOne({ _id: userId }, (err, user) => {
			if (err) return res.status(404).send();
			return Utility.editMealLog(user, req, res);
		});
	} else {
		return Utility.editMealLog(req.user, req, res);
	}
}

export function getMealLogs(req, res) {
	const userId = req.params.userId;
	// check if admin has called the route
	if (userId != null) {
		// check if the user who called it is really admin
		if (permissionLevel1.findIndex(elem => elem === req.user.role) === -1)
			return res.status(401).send();
		UserSchema.findOne({ _id: userId }, (err, user) => {
			if (err) return res.status(404).send();
			return res.status(200).send({ logs: user.mealLog });
		});
	} else {
		return res.status(200).send({ logs: req.user.mealLog });
	}
}

export function getUser(req, res) {
	const userId = req.params.userId;
	// check if admin has called the route
	if (userId != null) {
		// check if the user who called it is really admin
		if (permissionLevel2.findIndex(elem => elem === req.user.role) === -1)
			return res.status(401).send();
		UserSchema.findOne({ _id: userId }, (err, user) => {
			if (err) return res.status(404).send();
			return Utility.getUser(user, req, res);
		});
	} else {
		return Utility.getUser(req.user, req, res);
	}
}

export function editUser(req, res) {
	const userId = req.params.userId;
	// check if admin has called the route
	if (userId != null) {
		// check if the user who called it is really admin
		console.log(typeof req.user.role, permissionLevel2);
		if (permissionLevel2.findIndex(elem => elem === req.user.role) === -1)
			return res.status(401).send();
		UserSchema.findOne({ _id: userId }, (err, user) => {
			if (err) return res.status(404).send();
			return Utility.editUser(user, req, res, true);
		});
	} else {
		console.log('I am here...................');
		return Utility.editUser(req.user, req, res, false);
	}
}

export function deleteUser(req, res) {
	const userId = req.params.userId;
	// check if admin has called the route
	if (userId != null) {
		// check if the user who called it is really admin
		if (permissionLevel2.findIndex(elem => elem === req.user.role) === -1)
			return res.status(401).send();
		UserSchema.findByIdAndRemove({ _id: userId }, err => {
			if (err) return res.status(404).send();
			return res.status(200).send();
		});
	} else {
		return res.status(400).send();
	}
}