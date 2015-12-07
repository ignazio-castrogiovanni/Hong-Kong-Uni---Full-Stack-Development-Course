(function() {
  var numberOfFaces = 5;
  var theLeftSide = document.getElementById('leftSide');

  function generateFaces() {
    for (i = 0; i < numberOfFaces; ++i) {
      var currImg = document.createElement("img");
      currImg.src = "smile.png";
      var rndY = Math.floor(Math.random() * 400) + "px";
      var rndX = Math.floor(Math.random() * 400) + "px";
      currImg.style.left = rndX;
      currImg.style.top = rndY;
      theLeftSide.appendChild(currImg);
    }
  }

  generateFaces();
})();
