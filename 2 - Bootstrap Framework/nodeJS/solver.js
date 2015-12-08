var quad = require('./quadratic');
var prompt = require('prompt');

prompt.get(['a', 'b', 'c'], function (err, result) {
  if(err) { return onErr(err); }
  console.log('Command-line input received:');
  console.log("a: " + result.a);
  console.log("b: " + result.b);
  console.log("c: " + result.c);

  quad(result.a, result.b, result.c, function(err, quadsol) {
    if(err) {
      console.log('Error: ', err);
    } else {
      console.log("Roots are " + quadsol.root1() + " and " + quadsol.root2());
    }
  });
});
