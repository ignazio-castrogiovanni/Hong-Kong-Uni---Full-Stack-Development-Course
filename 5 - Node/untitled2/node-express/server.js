/**
 * Created by user on 3/20/16.
 */
var dishRouter = require('./dishRouter');
var promotionRouter =  require('./promoRouter');
var leaderRouter =  require('./leaderRouter');

var express = require('express');
var morgan = require('morgan');


var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

var dishR = dishRouter();
var promotionR = promotionRouter();
var leaderR = leaderRouter();


app.use('/dishes', dishR);
app.use('/promotions', promotionR);
app.use('/leaders', leaderR);

app.listen(port, hostname, function(){
    console.log('Server running at http://${hostname}:${port}/');
});
