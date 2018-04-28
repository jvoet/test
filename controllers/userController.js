const _orm = require('orm');
const _dbconfig = require('../db_config');

function getModel(db) {
    return db.define("users", {
        id: Number,
        name: String,
        surname: String,
        date_added: Number
    });
}

function successResponse(method_name, res, obj) {
    console.log("[userController][" + method_name + "] | Success: " + JSON.stringify(obj));
    return res.status(200).send(obj);
}

function errorResponse(method_name, res, err) {
    // throw err;
    console.log("[userController][" + method_name + "] | Error: " + err);
    return res.status(500).send(err);
}

exports.getAll = function (req, res) {
    var method_name = "getAll";

    _orm.connect(_dbconfig, function (err, db) {
        if (err)
            return errorResponse(method_name, res, err);

        var userModel = getModel(db);
        // add the table to the database
        userModel.sync(function (err) {
            if (err)
                return errorResponse(method_name, res, err);

            // query the person table by surname
            userModel.find(function (err, dbUsers) {
                if (err)
                    return errorResponse(method_name, res, err);

                return successResponse(method_name, res, dbUsers);
            });
        });
    });
};

// exports.getPage = function (req, res) {
//     var method_name = "getPage";

//     _orm.connect(_dbconfig, function (err, db) {
//         if (err)
//             return errorResponse(method_name, res, err);

//         var page = Number(req.params.page);
//         var pageSize = Number(req.params.pageSize);
//         var orderBy = req.params.orderBy;

//         console.log("Page: " + page + " Page-Size: " + pageSize + " Order-By: " + orderBy);

//         db.use(_paging);

//         var userModel = getModel(db);
//         // add the table to the database
//         userModel.sync(function (err) {
//             if (err)
//                 return errorResponse(method_name, res, err);

//             userModel.count({}, function (err, count) {
//                 if (err)
//                     return errorResponse(method_name, res, err);

//                 console.log("Count: " + count);
//                 var totalPages = Math.round(count / pageSize);
//                 console.log("Total pages: %d", totalPages);

//                 var offset = 0;
//                 if (page > 1)
//                     offset = page * pageSize;

//                 var limit = pageSize;

//                 userModel.find({}, ['name', 'surname']).limit(limit).offset(offset).get(function (err, dbUsers) {
//                     if (err)
//                         return errorResponse(method_name, res, err);

//                     return successResponse(method_name, res, dbUsers);
//                 });

//                userModel.offset(offset).limit(limit).find({}, ['name', 'surname'], function (err, dbUsers) {
//                    if (err)
//                        return errorResponse(method_name, res, err);
//
//                    return successResponse(method_name, res, dbUsers);
//                });
            // });




//            userModel.settings.set("pagination.perpage", pageSize); // default is 20
//
//            userModel.pages(function (err, pages) {
//                if (err)
//                    return errorResponse(method_name, res, err);
//
//                console.log("Total pages: %d", pages);
//
//                userModel.find({}, ['name', 'surname'], function (err, dbUsers) {
//                    if (err)
//                        return errorResponse(method_name, res, err);
//
//                    return successResponse(method_name, res, dbUsers);
//                });

//                userModel.page(page).order(["-name", "surname"]).find({}, function (err, dbUsers) {
//                    if (err)
//                        return errorResponse(method_name, res, err);
//
//                    return successResponse(method_name, res, dbUsers);
//                });

//                userModel.page(page).order("name").run(function (err, dbUsers) {
//                    if (err)
//                        return errorResponse(method_name, res, err);
//
//                    return successResponse(method_name, res, dbUsers);
//                });
//         });
//     });
// };

exports.getById = function (req, res) {
    var method_name = "getById";

    _orm.connect(_dbconfig, function (err, db) {
        if (err)
            return errorResponse(method_name, res, err);

        var id = req.params.id;
        var userModel = getModel(db);
        // add the table to the database
        userModel.sync(function (err) {
            if (err)
                return errorResponse(method_name, res, err);

            // query the person table by surname
            userModel.get(id, function (err, dbUser) {
                if (err)
                    return errorResponse(method_name, res, err);

                return successResponse(method_name, res, dbUser);
            });
        });
    });
};

exports.create = function (req, res) {
    var method_name = "create";

    _orm.connect(_dbconfig, function (err, db) {
        if (err)
            return errorResponse(method_name, res, err);

        var user = req.body;
        var userModel = getModel(db);
        // add the table to the database
        userModel.sync(function (err) {
            if (err)
                return errorResponse(method_name, res, err);

            // add a row to the person table
            userModel.create(user, function (err, dbUser) {
                if (err)
                    errorResponse(method_name, res, err);

                return successResponse(method_name, res, dbUser);
            });
        });
    });
};

exports.update = function (req, res) {
    var method_name = "update";

    _orm.connect(_dbconfig, function (err, db) {
        if (err)
            return errorResponse(method_name, res, err);

        var user = req.body;
        var userModel = getModel(db);
        // add the table to the database
        userModel.sync(function (err) {
            if (err)
                return errorResponse(method_name, res, err);

            // query the person table by surname
            userModel.get(user.id, function (err, dbUser) {
                if (err)
                    return errorResponse(method_name, res, err);

                dbUser.name = user.name;
                dbUser.surname = user.surname;
                dbUser.date_added = user.date_added;
                dbUser.save(function (err) {
                    if (err)
                        return errorResponse(method_name, res, err);

                    return successResponse(method_name, res, dbUser);
                });
            });
        });
    });
};

exports.delete = function (req, res) {
    var method_name = "delete";

    _orm.connect(_dbconfig, function (err, db) {
        if (err)
            return errorResponse(method_name, res, err);

        var id = req.params.id;
        var userModel = getModel(db);
        // add the table to the database
        userModel.sync(function (err) {
            if (err)
                return errorResponse(method_name, res, err);

            // query the person table by surname
            userModel.get(id, function (err, dbUser) {
                if (err)
                    return errorResponse(method_name, res, err);

                dbUser.remove(function (err) { // callback optional
                    if (err)
                        return errorResponse(method_name, res, err);

                    return successResponse(method_name, res, dbUser);
                });
            });
        });
    });
};
