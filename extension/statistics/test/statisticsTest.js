﻿/*globals describe, it, beforeEach, afterEach */

var assert = require("assert"),
    path = require("path"),
    describeReporting = require("../../../test/helpers.js").describeReporting;


describeReporting(path.join(__dirname, "../../"), ["statistics"], function(reporter) {

    describe('statistics', function() {

        it('before should group and increase just amount', function (done) {
            
            var request = {
                reporter: reporter,
                context: reporter.context,
                template: { },
                options: { async: true}
            };
            
            reporter.templates.create({ content: "foo" }).then(function (t) {
                request.template = t;
                
                var response = {};

                reporter.statistics.handleBeforeRender(request, response).then(function () {
                    
                    reporter.statistics.handleBeforeRender(request, response).then(function () {
                        
                        reporter.context.statistics.toArray().then(function (stats) {
                            assert.equal(1, stats.length);
                            assert.equal(2, stats[0].amount);
                            assert.equal(0, stats[0].success);
                            done();
                        });
                    });
                });
            });
        });
        
        it('after should increase success', function (done) {
            
            var request = {
                reporter: reporter,
                context: reporter.context,
                template: { },
                options: { async: true }
            };
            
            reporter.templates.create({ content: "foo" }).then(function (t) {
                request.template = t;
                
                var response = {};

                reporter.statistics.handleBeforeRender(request, response).then(function () {
                    
                    reporter.statistics.handleAfterRender(request, response).then(function () {
                        
                        reporter.context.statistics.toArray().then(function (stats) {
                            assert.equal(1, stats.length);
                            assert.equal(1, stats[0].amount);
                            assert.equal(1, stats[0].success);
                            done();
                        });
                    });
                });
            });
        });
    });
});