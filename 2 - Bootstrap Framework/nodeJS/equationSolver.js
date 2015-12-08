var a = 1;
var b = 4;
var c = 1;

var discriminant = b * b - 4 * a * c;
var root1 = (-b + Math.sqrt(discriminant)) / 2*a;
var root2 = (-b - Math.sqrt(discriminant)) / 2*a;

console.log("Roots are " + root1 + " and " + root2);
