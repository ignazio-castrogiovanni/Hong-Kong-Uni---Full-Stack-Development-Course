/**
 * Created by user on 3/20/16.
 */
module.exports = function() {
    var express = require('express');
    var bodyParser = require('body-parser');
    var promotionsR = express.Router();
    promotionsR.use(bodyParser.json());

    promotionsR.route('/')
        .all(function(req, res, next) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            next();
        })

        .get(function(req, res, next) {
            res.end('Will send all the promotions to you!');
        })
        .post(function(req, res, next) {
            res.end('Will add the promotion ' + req.body.name + ' with details: ' + req.body.description);
        })

        .delete(function(req, res, next) {
            res.end('Deleting all promotions');
        });

    promotionsR.route('/:promotionId')
        .all(function(req,res, next) {
            res.writeHead(200, {'Content-Type' : 'text/plain' });
            next();
        })
        .get(function(req, res, next) {
            res.end('Will send details of the promotion: ' + req.params.promotionId + ' to you!');
        })
        .put(function(req, res, next) {
            res.write('Updating the promotion: ' + req.params.promotionId + '\n');
            res.end('Will update the promotion ' + req.body.name + ' with details: ' + req.body.description);
        })

        .delete(function(req, res, next) {
            res.end('Deleting promotion: ' + req.params.promotionId);
        });

    return promotionsR;
}