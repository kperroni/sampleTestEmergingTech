// Load the 'Task' Mongoose model
var Task = require('mongoose').model('Task');

// Create a new 'createTask' controller method
exports.createTask = function (req, res, next) {
    // Create a new instance of the 'Task' Mongoose model
    var task = new Task(req.body);
    // Use the 'Task' instance's 'save' method to save a new task document
    task.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(task);

        }
    });
};

exports.readTasks = function (req, res, next) {
    console.log('in readTasks')
    // Use the 'Task' static 'find' method to retrieve the list of items
    Task.find({}, function (err, tasks) {
        console.log(tasks)
        if (err) {
            // Call the next middleware with an error message
            console.log('some error in readTask method')
            return next(err);
        } else {
            //
            res.render('tasks', {
                title: 'Tasks',
                tasks: tasks
            });
        }
    });
};

exports.editTask = function (req, res, next) {

    //read the items from request's body
    req.item = req.body;

    var itemIndex = req.body.taskId.indexOf(req.params.taskId);
    console.log('item index ' + req.body.taskId[itemIndex]);
    console.log(req.body.taskId[itemIndex]);

    var query = { "taskId": req.params.taskId };
    var update =
        {
            "taskId": req.body.taskId[itemIndex],
            "taskName": req.body.taskName[itemIndex],
            "taskDescription": req.body.taskDescription[itemIndex],
            "startDate": req.body.startDate[itemIndex],
            "endDate": req.body.endDate[itemIndex],
            "owner": req.body.owner[itemIndex]

        };
    update.startDate = new Date(update.startDate);
    update.endDate = new Date(update.endDate);
    var options = { new: true };

    Task.findOneAndUpdate(query, update, options, (err, task) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            //res.json(user);
            res.render('index');
        }
    });
};

exports.taskById = function (req, res, next, username) {
    // Use the 'User' static 'findOne' method to retrieve a specific user
    User.findOne({
        username: username //using the username instead of id
    }, (err, user) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.user' property
            req.user = user;
            console.log(user);
            // Call the next middleware
            next();
        }
    });
};

