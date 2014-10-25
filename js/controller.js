angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $http, $ionicPopup) {
            $scope.logout = function(){
            window.localStorage.removeItem('login_token');
            window.localStorage.removeItem('id');
            window.localStorage.removeItem('email');
            window.localStorage.removeItem('farm');
            window.localStorage.removeItem('barn_id');
            window.localStorage.removeItem('location');
//            alert("sdd");
//            window.sqlitePlugin.deleteDatabase({name : "Assist"});
//            alert("sdd");
            }
            if(window.localStorage['role']=="BarnManager"){
            $scope.menudisplay={text:"none"};
//            $scope.backbutton={text:"none"};
            }

            else{
            $scope.menudisplay={text:"block"};
//            $scope.backbutton={text:"block"};
            }
            $scope.setti = function() {
            $ionicPopup.confirm({
                              title: 'Sync',
                              template: 'Are you sure you want to sync data from server?',
                                buttons: [
                                          {
                                          text: 'Yes',
                                          onTap: function(e) {
                                          location.href = '#/app/settings';
                                          }
                                          },
                                          { text: 'No' },
                                          ]
                                })
                        }

            })

.controller('loginCtrl', function($scope, $http, $ionicPopup) {
            $scope.tes = "Log In";
            $scope.mid = window.localStorage['dev_id'];
            $scope.butcolor = "rgb(145,165,211)";
            var logdata=[];
            $scope.name = {text:''};
            $scope.password = {text:''};
            $scope.submitbutton = function($window){
            $scope.butcolor = "rgb(90,120,189)";
            $scope.tes = "Loading......";
            $scope.click = true;
            var postData =  {
            "username": $scope.name.text,
            "password": $scope.password.text
            };
            var config = {
            headers: {
            'Content-Type': 'application/json',
            }
            }
            var login = $http.post('http://containers.softimum.com/user_sessions.json',JSON.stringify(postData),config)
            login.success(function (data, status, headers) {
                          window.localStorage['login_token']= data.single_access_token;
                          window.localStorage['company_id']= data.company_id;
                          alert();
                          location.href = '#/app/settings';
                        });
            login.error(function (data, status, headers) {
                        $scope.butcolor = "rgb(145,165,211)";
                        $scope.tes = "Log In";
                        $scope.click = false;
                        $ionicPopup.alert({
                                          title: 'Invalid username or password',
                                          template: '',
                                          buttons:[{text:"OK",type:"button button-clear button-positive"}]
                                          
                                          });
                        });
            }
        })
.controller('loadCtrl', function($scope, $stateParams, app) {
            
            })
.controller('setCtrl', function($scope, $stateParams, db) {
            $scope.sync = db.sync();
            })


.controller('listCtrl', function($scope, $stateParams, frms, app) {

        
            var siteli = frms.alls();
            var containerli = frms.allc();
            alert(JSON.stringify(siteli));
            $scope.tit = "Anand";
            $scope.sitelists = siteli;
            $scope.containerlists = containerli;
        })

.controller('barnCtrl', function($scope, $stateParams,$http, barn) {
            $scope.backlist = function(){
            location.href = '#/app/list';
            }
            var config = {
            headers: {
            'Content-Type': 'application/json',
            }
            }
            var bid= $stateParams.barn_id;
            var nameb= $stateParams.barn_name;
            var namel= $stateParams.loc_name;
            var namef= $stateParams.farm_name;

            $scope.id = bid;
            $scope.bname = nameb;
            $scope.lname = namel;
            $scope.fname = namef;
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            $scope.title = name;
            var barid = [];
            var frmsli = barn.allf();
            var siteli = barn.alls();
            var barnli = barn.allb();
            var readli = barn.allr();
            var curbarid = "";
            var curlocid = "";
            var curfarid = "";
            var curid = '';
            var j = 0;
            angular.forEach(barnli, function (count) {
                            barid.push(barnli[j].barn_id);
                            if(barnli[j].barn_id == bid){
                            $scope.barname = barnli[j].bname;
                            curlocid = barnli[j].blocation_id;
                            }
                            j++;
                            });
            var k =0;
            angular.forEach(siteli, function (count) {
                            if(siteli[k].location_id == curlocid){
                            $scope.locname = siteli[k].lname;
                            curfarid = siteli[k].lfarm_id;
                            }
                            else{
                            k++;
                            }
                            });
            
            var l =0;
            angular.forEach(frmsli, function (count) {
                            if(frmsli[l].farm_id == curfarid){
                            $scope.farname = frmsli[l].fname;
                            }
                            l++;
                            });
            
            
            var i = 0;
            angular.forEach(readli, function (count) {
                            if(readli[i].barn_id == bid){
                            $scope.read = readli[i];
                            curid = i;
                            }
                            else{
                            i++;
                            }
                            });
            $scope.farmlists = frmsli;
            $scope.sitelists = siteli;
            $scope.barnlists = barnli;
            $scope.readlists = readli;
            var urla='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/inventory_report.json?user_credentials='+window.localStorage["login_token"];
            var urlb='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/last_inventory_report.json?user_credentials='+window.localStorage["login_token"];
            var urlc='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/last_event_report.json?user_credentials='+window.localStorage["login_token"];
            var barninfo1 = $http.get(urla,config);
            var pig_death = 0;
            barninfo1.success(function (data, status, headers) {
                              var cum = data;
                              var d = 0;
                              angular.forEach(cum, function (count) {
                                              if(cum[d].pig_deaths.length==0){
                                              var coun = 0;
                                              pig_death = pig_death + 0;
                                              }
                                              else{
                                              var le = cum[d].pig_deaths.length;
                                              le = le-1;
                                              var co = cum[d].pig_deaths[le].count;
                                              pig_death = pig_death + co;
                                              }
                                              d++;
                                            });
                              $scope.pig = pig_death;
                              });
            
            var barninfo2 = $http.get(urlb,config);
            barninfo2.success(function (data, status, headers) {
                              $scope.total_inventory=data.total_inventory;
                              if(data.pig_deaths.length==0){
                              $scope.pig_death=0;
                              }
                              else
                              {
                              $scope.pig_death=data.pig_deaths.length;
                              }
                              if(data.pig_treatments.length==0){
                              $scope.pig_sick=0;
                              }
                              else
                              {
                              $scope.pig_sick=data.pig_treatments.length;
                              }
                              $scope.report_date=data.report_date;
                              });
            var barninfo3 = $http.get(urlc,config);
            barninfo3.success(function (data, status, headers) {
                              $scope.eventshistory = data;
                              $scope.eventdescription=data.description;
                              $scope.eventreported_at=data.reported_at;
                              });
            
            if(curid == 0){
            $scope.baclas = true;
            }
            else{
            $scope.baclas = false;
            }
            if(curid == barid.length-1){
            $scope.nexlas = true;
            }
            else{
            $scope.nexlas = false;
            }
            
            $scope.bac_barn = function(){
            if(curid == 0){
//            $scope.baclas = true;
            }
            else{
            
            var bacid = curid - 1;
            var curbarid = barid[bacid];
            location.href = "#/app/barn/"+curbarid+"/"+curbarid+"/"+curbarid+"/"+curbarid;
            }
            };
            $scope.nex_barn = function(){
            if(curid == barid.length-1){
//            $scope.nexlas = true;
            }
            else{
            var nexid = curid + 1;
            var curbarid = barid[nexid];
            location.href = "#/app/barn/"+curbarid+"/"+curbarid+"/"+curbarid+"/"+curbarid;
            }
            };
            })





.controller('bmCtrl', function($scope, $stateParams,$http, barn) {
//            alert("1");
            var config = {
            headers: {
            'Content-Type': 'application/json',
            }
            }
            var frmsli = barn.allf();
            var siteli = barn.alls();
            var barnli = barn.allb();
            var readli = barn.allr();
            var bid= $stateParams.barn_id
            $scope.id = bid;
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            $scope.title = name;
            $scope.fname = frmsli[0].fname;
            $scope.lname = siteli[0].lname;
            var k = 0;
            angular.forEach(barnli, function (count) {
                            if(barnli[k].barn_id == bid){
                            $scope.bname = barnli[k].bname;
                            }
                            else{
                            k++;
                            }
                            });
            var i = 0;
            angular.forEach(readli, function (count) {
                            if(readli[i].barn_id == bid){
                            $scope.read = readli[i];
                            }
                            else{
                            i++;
                            }
                            });

            var urla='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/inventory_report.json?user_credentials='+window.localStorage["login_token"];
            var urlb='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/last_inventory_report.json?user_credentials='+window.localStorage["login_token"];
            var urlc='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/last_event_report.json?user_credentials='+window.localStorage["login_token"];
            
            var barninfo1 = $http.get(urla,config);
            var pig_death = 0;
            barninfo1.success(function (data, status, headers) {
                              var cum = data;
                              var d = 0;
                              angular.forEach(cum, function (count) {
                                              if(cum[d].pig_deaths.length==0){
                                              var coun = 0;
                                              pig_death = pig_death + 0;
                                              }
                                              else{
                                              var le = cum[d].pig_deaths.length;
                                              le = le-1;
                                              var co = cum[d].pig_deaths[le].count;
                                              pig_death = pig_death + co;
                                              }
                                              d++;
                                              });
                              $scope.pig = pig_death;
                              
                              });

            
            
            
            var barninfo2 = $http.get(urlb,config);
            barninfo2.success(function (data, status, headers) {
                              $scope.total_inventory=data.total_inventory;
                              if(data.pig_deaths.length==0){
                              $scope.pig_death=0;
                              }
                              else
                              {
                              $scope.pig_death=data.pig_deaths.length;
                              }
                              if(data.pig_treatments.length==0){
                              $scope.pig_sick=0;
                              }
                              else
                              {
                              $scope.pig_sick=data.pig_treatments.length;
                              }
                              $scope.report_date=data.report_date;
                            });
            var barninfo3 = $http.get(urlc,config);
            barninfo3.success(function (data, status, headers) {
                              $scope.eventshistory = data;
                              $scope.eventdescription=data.description;
                              $scope.eventreported_at=data.reported_at;
                              });
            
            $scope.dailyinventory = function(){
//            alert("2");
            location.href = "#/app/inventory/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
            }
            })

.directive('validNumber', function() {
          
          return {
          require: '?ngModel',
          link: function(scope, element, attrs, ngModelCtrl) {
          if(!ngModelCtrl) {
          return;
          }
          
          ngModelCtrl.$parsers.push(function(val) {
                                    var clean = val.replace( /[^0-9]+/g, '');
                                    if (val !== clean) {
                                    ngModelCtrl.$setViewValue(clean);
                                    ngModelCtrl.$render();
                                    }
                                    return clean;
                                    });
          
          element.bind('keypress', function(event) {
                       if(event.keyCode === 32) {
                       event.preventDefault();
                       }
                       });
          }
          };
          })
.filter('reverse', function() {
       return function(items) {
       return items.slice().reverse();
       };
       });
