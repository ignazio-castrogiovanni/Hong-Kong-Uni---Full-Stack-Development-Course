angular.module('conFusion.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = $localStorage.getObject('userinfo','{}');

  $ionicModal.fromTemplateUrl('templates/reserve.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.reserveform = modal;
  });

  $scope.closeReserve = function() {
    $scope.reserveform.hide();
  };

  $scope.reserve = function() {
    $scope.reserveform.show();
  };

  $scope.doReserve = function() {
    console.log('Doing reservation', $scope.reservation);

    $timeout(function() {
      $scope.closeReserve();
    }, 1000);
  };
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
        $localStorage.storeObject('userinfo',$scope.loginData);


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

///
.controller('IndexController', ['$scope', 'menuFactory', 'promotionFactory', 'corporateFactory', 'baseURL', 'dish', 'promotion', 'leader',
function ($scope, menuFactory, promotionFactory, corporateFactory, baseURL, dish, promotion, leader) {

    $scope.baseURL = baseURL;
    $scope.leader = leader;

    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.dish = dish;

    $scope.promotion = promotion;
}])
      .controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', 'baseURL', 'dishes',
       function($scope, menuFactory, favoriteFactory, baseURL, dishes) {

                  $scope.baseURL = baseURL;
                  $scope.tab = 1;
                  $scope.filtText = '';
                  $scope.showDetails = false;
                  $scope.showMenu = false;
                  $scope.message = "Loading ...";
                  $scope.addFavorite = function(index) {
                    console.log("index is " + index);
                    favoriteFactory.addToFavorites(index);
                    $ionicListDelegate.closeOptionButtons();
                  };

                  $scope.dishes = dishes;


                  $scope.select = function(setTab) {
                      $scope.tab = setTab;

                      if (setTab === 2) {
                          $scope.filtText = "appetizer";
                      }
                      else if (setTab === 3) {
                          $scope.filtText = "mains";
                      }
                      else if (setTab === 4) {
                          $scope.filtText = "dessert";
                      }
                      else {
                          $scope.filtText = "";
                      }
                  };

                  $scope.isSelected = function (checkTab) {
                      return ($scope.tab === checkTab);
                  };

                  $scope.toggleDetails = function() {
                      $scope.showDetails = !$scope.showDetails;
                  };
              }])

              .controller('ContactController', ['$scope', function($scope) {

                  $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

                  var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

                  $scope.channels = channels;
                  $scope.invalidChannelSelection = false;

              }])

              .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {

                  $scope.sendFeedback = function() {

                      console.log($scope.feedback);

                      if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                          $scope.invalidChannelSelection = true;
                          console.log('incorrect');
                      }
                      else {
                          $scope.invalidChannelSelection = false;
                          feedbackFactory.save($scope.feedback);
                          $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                          $scope.feedback.mychannel="";
                          $scope.feedbackForm.$setPristine();
                          console.log($scope.feedback);
                      }
                  };
              }])

              .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicPopover', '$ionicModal', function($scope, $stateParams, menuFactory, favoriteFactory, baseURL, $ionicPopover, $ionicModal) {

                  $scope.baseURL = baseURL;
                  $scope.dish = {};
                  $scope.showDish = false;
                  $scope.message="Loading ...";

                  $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
                    scope: $scope
                  }).then(function(popover) {
                    $scope.popover = popover;
                  });
                  $scope.openPopover = function($event) {
                    console.log(parseInt($stateParams.id,10));
                    $scope.lastDishDetailId = parseInt($stateParams.id,10);
                  $scope.popover.show($event);
                  }
                  $scope.closePopover = function() {
                    $scope.popover.hide();
                  };

                  $scope.addFavorite = function() {
                    favoriteFactory.addToFavorites($scope.lastDishDetailId);
                  }

                  $scope.mycomment = {rating:5, comment:"Iggy", author:"Boom", date:""};
                  $ionicModal.fromTemplateUrl('templates/dish-comment.html', {
                    scope: $scope
                  }).then(function(modal) {
                    $scope.commentModal = modal;
                  });

                  $scope.openCommentModal = function() {
                    $scope.commentModal.show();
                  }

                  $scope.closeCommentModal = function() {
                    $scope.commentModal.hide();
                  }

                  $scope.addComment = function() {

                    $scope.mycomment.date = new Date().toISOString();
                    console.log($scope.mycomment);
                    $scope.dish.comments.push($scope.mycomment);
                    menuFactory.update({id:$scope.lastDishDetailId},$scope.dish);

                  }


                $scope.dish = menuFactory.get({id:parseInt($stateParams.id,10)})
                  .$promise.then(
                                  function(response){
                                      $scope.dish = response;
                                      $scope.showDish = true;
                                  },
                                  function(response) {
                                      $scope.message = "Error: "+response.status + " " + response.statusText;
                                  }
                  );


              }])

              .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {

                  $scope.mycomment = {rating:5, comment:"", author:"", date:""};

                  $scope.submitComment = function () {

                      $scope.mycomment.date = new Date().toISOString();
                      console.log($scope.mycomment);

                      $scope.dish.comments.push($scope.mycomment);
              menuFactory.update({id:$scope.dish.id},$scope.dish);

                      $scope.commentForm.$setPristine();

                      $scope.mycomment = {rating:5, comment:"", author:"", date:""};
                  }
              }])

              .controller('AboutController', ['$scope', 'corporateFactory', 'baseURL', 'leaders',
               function($scope, corporateFactory, baseURL, leaders) {

                          $scope.baseURL = baseURL;
                          $scope.leaders = leaders;
                          console.log($scope.leaders);

                          }])


                      .controller('FavoritesController', ['$scope', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', function ($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout) {

                      $scope.baseURL = baseURL;
                      $scope.shouldShowDelete = false;

                      $ionicLoading.show({
                        template: '<ion-spinner></ion-spinner> Loading...'
                      });

                      $scope.favorites = favoriteFactory.getFavorites();

                      $scope.dishes = menuFactory.query(
                          function (response) {
                              $scope.dishes = response;
                              $timeout(function() {
                                $ionicLoading.hide();
                              }, 1000);
                          },
                          function (response) {
                              $scope.message = "Error: " + response.status + " " + response.statusText;
                              $timeout(function() {
                                $ionicLoading.hide();
                              }, 1000);
                          });
                      console.log($scope.dishes, $scope.favorites);

                      $scope.toggleDelete = function () {
                          $scope.shouldShowDelete = !$scope.shouldShowDelete;
                          console.log($scope.shouldShowDelete);
                      }

                      $scope.deleteFavorite = function (index) {

                        var confirmPopup = $ionicPopup.confirm({
                          title: 'Confirm Delete',
                          template: 'Are you sure you want to delete this item?'
                        });

                        confirmPopup.then(function(res) {
                          if(res) {
                            console.log('OK to delete');
                            favoriteFactory.deleteFromFavorites(index);
                          } else {
                            console.log('Canceled delete');
                          }
                        });
                        $scope.shouldShowDelete = false;
                      }
                    }])

                .filter('favoriteFilter', function () {
    return function (dishes, favorites) {
        var out = [];
        for (var i = 0; i < favorites.length; i++) {
            for (var j = 0; j < dishes.length; j++) {
                if (dishes[j].id === favorites[i].id)
                    out.push(dishes[j]);
            }
        }
        return out;

    }});
