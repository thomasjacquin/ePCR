angular.module('ePCR.services', [])

    .service('Reports', function ($q, $webSql, DB_CONFIG) {
        var reports = {};

        return {

            all: function () {
                reports = {};
                var dfd = $q.defer()
                this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);

                this.db.selectAll("report").then(function (results) {
                    var rec;
                    moment().local();
                    for (var i = 0; i < results.rows.length; i++) {
                        rec = angular.copy(results.rows.item(i));
                        rec.created = moment(moment.utc(rec.created).toDate()).format("YYYY-MM-DD hh:mm:ss A");
                        reports[results.rows.item(i).id] = rec;
                    }
                    dfd.resolve(reports);
                });
                return dfd.promise;
            },

            get: function (reportId) {
                var dfd = $q.defer()
                this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);

                this.db.select("report", {
                    "id": {
                        "value": reportId
                    }
                }).then(function (results) {
                    dfd.resolve(results.rows.item(0));
                });
                return dfd.promise;
            }

        }
    })

    .service('Records', function ($q, $webSql, DB_CONFIG) {
        var list = {};
        return {

            all: function (tableName, itemId) {
                list = {};
                var dfd = $q.defer()
                this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
                this.db.select(tableName, {
                    "report_id": itemId
                }).then(function (results) {
                    var rec;
                    moment().local();
                    for (var i = 0; i < results.rows.length; i++) {
                        rec = angular.copy(results.rows.item(i));
                        rec.created = moment(moment.utc(rec.created).toDate()).format("YYYY-MM-DD hh:mm:ss A");
                        list[results.rows.item(i).id] = rec;
                    }
                    dfd.resolve(list);
                });
                return dfd.promise;
            },

            get: function (tableName, itemId) {
                var dfd = $q.defer()
                this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);

                this.db.select(tableName, {
                    "id": {
                        "value": itemId
                    },
                }).then(function (results) {
                    dfd.resolve(results.rows.length > 0 ? results.rows.item(0) : {});
                })
                return dfd.promise;
            }
        }
    })