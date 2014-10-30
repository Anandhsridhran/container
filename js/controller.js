angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $http) {
            
            })

.controller('loginCtrl', function($scope, $http, $ionicPopup) {
           
            var logdata=[];
            $scope.name = {text:''};
            $scope.password = {text:''};
            $scope.submitbutton = function($window){
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
                          window.localStorage['first_name']=data.first_name;
                          window.localStorage['last_name']=data.last_name;
                          //alert(JSON.stringify(data));
                          location.href = '#/app/dashboard';
                          
                          });
            login.error(function (data, status, headers) {
                        alert(data);
                        $ionicPopup.alert({
                                          title: 'Invalid username or password',
                                          template: '',
                                          buttons:[{text:"OK",type:"button button-clear button-positive"}]
                                          
                                          });
//                        alert("Invalid username or password");
                        //<base_uri>/companies/<company_id>/sites.json?user_credentials=<single_access_token>
                        });
            }
            })

.controller('dashCtrl', function($scope, $http,$timeout, $ionicLoading,$ionicPopup) {
            
            // Setup the loader
            $ionicLoading.show({
                               content: 'Loading',
                               animation: 'fade-in',
                               showBackdrop: true,
                               maxWidth: 200,
                               showDelay: 0
                               });
            $timeout(function () {
                     $ionicLoading.hide();
                     },3000);
            //Farm GET http request
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            var company_id = window.localStorage["company_id"];
            $scope.title = name;
            var url = 'http://containers.softimum.com/companies/'+company_id+'/sites.json?user_credentials='+window.localStorage['login_token'];
            var config = {
            headers: {
            'Content-Type': 'application/json',
             'timeout':'1000',
          
            }
            }
         
            var SitesJson = $http.get(url,config)
            SitesJson.success(function (data, status, headers) {
                             $scope.sites = data;
                              //alert($scope.site);
                             var i = 0;
                             angular.forEach(data, function (count) {
                                    $scope.getContainer(data[i].site_id,data[i].name);
                                    i++;
                                });
                             });
            SitesJson.error(function (data, status, headers) {
                           $ionicPopup.alert({
                                             title: 'Cannot Load the content Due to network Problem',
                                             template: '',
                                             buttons:[{text:"OK",type:"button button-clear button-positive"}]
                                    });
                           });
            //Sites GET http request
            $scope.getContainer = function (id,name) {
            var sname = name;
            var sit_id = id;
            //<base_uri>/sites/<site_id>/containers.json?user_credentials=<single_access_token>
            var url2 = 'http://containers.softimum.com/sites/'+sit_id+'/containers.json?user_credentials='+window.localStorage['login_token'];
            //alert("ss");
            var ContainerJson = $http.get(url2,config)
            ContainerJson.success(function (data, status, headers) {
                                  //alert(JSON.stringify(data));
                                  var ele=angular.element(document.getElementById("sitesli"+id));
                                  
                             var result;
                             result = "<ul  id='containerul"+id+"'>";
                             var j=0;
                             angular.forEach(data, function (count) {
                                             //alert(j+" "+data.length);
                                             if((j+1)==data.length)
                                             {
                                             //var s = "#/app/ContainerHome/"+data[j].container_id+"/"+data[j].name+"/"+sname
                                             //alert(s);
                                             result += "<li  id='containerli" + data[j].container_id + "' style='width:100%;float:left;padding:5%;padding-left:25px;text-decoration:none;color:gray;'><a style='width:100%;float:left;text-decoration:none;color:gray;' href='#/app/ContainerHome/"+data[j].container_id+"/"+data[j].name+"/"+sname+"/"+sit_id+"' class='locationanch'><img src='img/OK1.png' style='margin-right:8px;float:left;margin-top:3px;'/>" + data[j].name + "</a></li>";
                                             
                                             }
                                             else
                                             {
                                             result += "<li  id='containerli" + data[j].container_id + "' style='width:100%;float:left;border-bottom:1px solid #c3c3c3;padding:5%;padding-left:25px;text-decoration:none;color:gray;'><a style='width:100%;float:left;text-decoration:none;color:gray;' href='#/app/ContainerHome/"+data[j].container_id+"/"+data[j].name+"/"+sname+"/"+sit_id+"' class='locationanch'><img src='img/OK1.png' style='margin-top:3px;margin-right:8px;float:left;'/>" + data[j].name + "</a></li>";
                                             }
                                             //$scope.getBarrns(data[j].location_id,data[j].system_status,data[j].name,fname);
                                            // $scope.getValuesofBarns(data[j].location_id,data[j].system_status);
                                             j++;
                                             });
                             result += "</ul>";
                             
                             ele.append(result);
                             });
            ContainerJson.error(function (data, status, headers) {
                           $ionicPopup.alert({
                                             title: 'Cannot Load the content Due to network Problem',
                                             template: '',
                                             buttons:[{text:"OK",type:"button button-clear button-positive"}]
                                             
                                             });
                           });
            
            }
            
            
        })


.controller('ContainerHomeCtrl', function($scope, $stateParams, $http,$timeout,$filter, $ionicLoading,$ionicPopup) {
            //alert();
            // Setup the loader
            $ionicLoading.show({
                               content: 'Loading',
                               animation: 'fade-in',
                               showBackdrop: true,
                               maxWidth: 200,
                               showDelay: 0
                               });
            $timeout(function () {
                     $ionicLoading.hide();
                     },2000);
            var config = {
            headers: {
            'Content-Type': 'application/json',
            }
            }
            //var cid= $stateParams.container_id;
            
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            $scope.sname = $stateParams.site_name;
            $scope.cname = $stateParams.container_name;
            var sit_id =$stateParams.site_id;
            
            $scope.title = name;
            var siteslis = "";
            $scope.containerli = [];
            var url2 = 'http://containers.softimum.com/sites/'+sit_id+'/containers.json?user_credentials='+window.localStorage['login_token'];
            var ContainerJson = $http.get(url2,config)
            ContainerJson.success(function (data, status, headers) {
                                  siteslis = data;
                                  //alert(siteslis);
                                  for (var index=0; index<siteslis.length; index++)
                                  {
                                  var cid = siteslis[index].container_id;
                                  var urlr='http://containers.softimum.com/containers/'+cid+'/last_reading.json?user_credentials=' +window.localStorage["login_token"];
                                  var containerinfo = $http.get(urlr,config);
                                  containerinfo.success(function (data, status, headers) {
                                                        if(data == null || data == "null"){
                                                        data = {
                                                        "container_name":"NA",
                                                        "percent_full":"NA",
                                                        "battery_voltage":"NA",
                                                        "reported_at":"NA"
                                                        }
                                                        $scope.containerli.push(data);
                                                        }
                                                        else{
                                                        $scope.containerli.push(data);
                                                        }
                                                        });
                                  containerinfo.error(function (data, status, headers) {
                                                      alert(data);
                                                      });
                                  }
                                  
                                  });
            ContainerJson.error(function (data, status, headers) {
                                
                                  alert(data);
                                  });
            
            
            
            
            })

.controller('inventoryCtrl', function($scope, $stateParams, $http,$filter,$rootScope,$timeout,$ionicPopup) { //, $ionicLoading
            //focus('focusMe');
            // Setup the loader
//            $ionicLoading.show({
//                               content: 'Loading',
//                               animation: 'fade-in',
//                               showBackdrop: true,
//                               maxWidth: 200,
//                               showDelay: 0
//                               });
//            $timeout(function () {
//                     $ionicLoading.hide();
//                     },1000);
            var PigdetailsObject=[];
            $scope.bname = $stateParams.barn_name;
            $scope.lname = $stateParams.loc_name;
            $scope.fname = $stateParams.farm_name;
            $scope.barn_id=$stateParams.barn_id;
            
            $scope.pignoshipment = {text:''};
            $scope.supplier = {text:''};
            $scope.pignodeath = {text:''};
            $scope.pigntreated = {text:''};
            if($rootScope.pigarrayDeaths!=undefined)
            {
            
            if(window.localStorage["PigDeathsCount"]>0)
            {
//            alert(JSON.stringify($rootScope.pigarrayDeaths));
            $scope.pignodeath ={text: window.localStorage["PigDeathsCount"]};
            var Divele = angular.element(document.getElementById("deathPigDiv"));
            var result='';
            $scope.LoadPoints =  [{ Id: '1', Text:'Scrotal Rupture' },
                                  
                                  { Id: '2', Text: 'Lame/BadLeg' },
                                  
                                  { Id: '3', Text: 'Humpback' },
                                  
                                  { Id: '4', Text: 'Strep' },
                                  
                                  { Id: '5', Text: 'Greasy pig' },
                                  
                                  { Id: '6', Text: 'Tail Bite' },
                                  
                                  { Id: '7', Text: 'Prolapse' },
                                  
                                  { Id: '8', Text: 'Abcess' },
                                  
                                  { Id: '9', Text: 'Hematoma Ear' },
                                  
                                  { Id: '10', Text: 'Euthanized' },
                                  
                                  { Id: '11', Text: 'Dead On Arrival' },
                                  
                                  { Id: '12', Text: 'Dead within 24 hrs' }
                                  
                                  
                                  
                                  ];
            var cargo={CargoItems:[]};
            
            
            for (var m=0; m<window.localStorage["PigDeathsCount"]; m++)
            {
            var tempIpigDetails={};
            var tempReason;
            if($rootScope.pigarrayDeaths[m].cause=="Scrotal Rupture")
            {
            tempReason=0;
            }
            if($rootScope.pigarrayDeaths[m].cause=="Lame/BadLeg")
            {
            tempReason=1;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Humpback")
            {
            tempReason=2;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Strep")
            {
            tempReason=3;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Greasy pig")
            {
            tempReason=4;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Tail Bite")
            {
            tempReason=5;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Prolapse")
            {
            tempReason=6;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Abcess")
            {
            tempReason=7;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Hematoma Ear")
            {
            tempReason=8;
            }
            
            if($rootScope.pigarrayDeaths[m].cause==">Euthanized")
            {
            tempReason=9;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Dead On Arrival")
            {
            tempReason=10;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Dead within 24 hrs")
            {
            tempReason=11;
            }
            tempIpigDetails={count:(m+1),LoadPoint: $scope.LoadPoints[tempReason]};
            cargo.CargoItems.push(tempIpigDetails);
            //tempIpigDetails={"count":(m+1),"myReason":tempReason};
            // PigdetailsObject.push(tempIpigDetails);
            }
           // alert(JSON.stringify(cargo));
            $scope.PigDetails=PigdetailsObject;
            $scope.cargo =cargo;
            
            
            }
            }
            if($rootScope.pigarrayTreatments!=undefined)
            {
            
            if(window.localStorage["PigTreatsCount"]>0)
            {
            var pigtreatementsTempObect=[];
            for (var m=0; m<window.localStorage["PigTreatsCount"]; m++)
            {
            var subtempTreatObject={};
            subtempTreatObject={"medicine_given": $rootScope.pigarrayTreatments[m].medicine_given,"count":(m+1), "dosage": $rootScope.pigarrayTreatments[m].dosage.split("mg")[0], "how_administered": $rootScope.pigarrayTreatments[m].how_administered};
            pigtreatementsTempObect.push(subtempTreatObject);
            }
            $scope.pigntreated={text:window.localStorage["PigTreatsCount"]};
            $scope.pigtreatDetails=pigtreatementsTempObect;
            
            }
            }
            $scope.date ={text: $filter("date")(Date.now(), 'yyyy-MM-dd')};
             $scope.shipmentdate ={text: $filter("date")(Date.now(), 'yyyy-MM-dd')};
//            alert($scope.date.text);
            var bid= $stateParams.barn_id;
            
            
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            $scope.title = name;
            
            var urlb='http://nano.amfnano.com/barns/'+bid+'/last_inventory_report.json?user_credentials='+window.localStorage["login_token"];
            
            var config = {
            headers: {
            'Content-Type': 'application/json',
            }
            }
            var barninfo2 = $http.get(urlb,config);
            
            barninfo2.success(function (data, status, headers) {
                              //alert(data.reported_date);
                              //alert(JSON.stringify(data));
                              $scope.reported_at=data.report_date;
                              $scope.Intials=data.user_initials;
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
                              
                              });
            
            $scope.submitShipment=function(){
            var ele = angular.element(document.getElementById("shipmentDate"));
            if($scope.supplier.text!=""){
           // alert($scope.shipmentdate.text);
            var bookData = {
            "barn_id": bid,
            "shipment_date": ele.val(),
            "total_pigs": $scope.pignoshipment.text,
            "total_doa":"",
            "pig_supplier":$scope.supplier.text
            
            };
            var shipmenturl= 'http://nano.amfnano.com/shipments.json?user_credentials='+window.localStorage["login_token"];
            var shipment= $http.post(shipmenturl,JSON.stringify(bookData),config);
            shipment.success(function (data, status, headers) {
                             $ionicPopup.alert({
                                               title: 'Shipment Succesfully inserted',
                                               template: '',
                                               buttons:[{text:"OK",type:"button button-clear button-positive"}]
                                               
                                               });
                             location.href="#/app/barnHome/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
                             });
            }
            else
            {
            $ionicPopup.alert({
                              title: 'Please enter the shipment details',
                              template: '',
                              buttons:[{text:"OK",type:"button button-clear button-positive"}]
                              
                              });
            }
            
            
            }
            $scope.saveDate=function(){
            var ele = angular.element(document.getElementById("inventoryDate"));
           // alert(ele.val());
            if(ele.val()!="")
            {
            $rootScope.inventorydate={text:ele.val()};
            location.href="#/app/inventory3/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
            }
            else
            {
            $ionicPopup.alert({
                              title: 'Please select date by clicking on date column beside',
                              template: '',
                              buttons:[{text:"OK",type:"button button-clear button-positive"}]
                              
                              });
            
          
            }
            }
            $scope.pigdeathsonchange=function()
            {
            
            var ele = angular.element(document.getElementById("deathPigDiv"));
            var result='';
            for (var i=0; i<$scope.pignodeath.text; i++)
            {
            result+='<label class="item item-input item-select">';
            result+='<div class="input-label">Pig '+(i+1)+'</div><select id="reason'+(i+1)+'">';
            
            result+='<options selected>Belly Rupture</option>';
            result+='<option >Scrotal Rupture</option>';
            result+='<option>Lame/BadLeg</option>';
            result+='<option>Humpback</option>';
            result+='<option>Strep</option>';
            result+='<option>Greasy pig</option>';
            result+='<option>Tail Bite</option>';
            result+='<option>Prolapse</option>';
            result+='<option>Abcess</option>';
            result+='<option>Hematoma Ear</option>';
            result+='<option>Euthanized</option>';
            result+='<option>Dead On Arrival</option>';
            result+='<option>Dead within 24 hrs.</option>';
            result+='</select>';
            result+='</label>';
            }
            window.localStorage["PigDeathsCount"]=$scope.pignodeath.text;
            
            ele.html(result);
            
            }
            
            
            $scope.pigtreatedonchange=function()
            {
            
            var ele = angular.element(document.getElementById("treatPigDiv"));
            var result='';
            for (var i=0; i<$scope.pigntreated.text; i++)
            {
            result+='<div class="item">';
            result+='<div class="input-label">Pig '+(i+1)+'</div>';
            result+='<input type="text" placeholder="Name of Medicine" id="medicine'+(i+1)+'" style="border:1px solid #c3c3c3;margin-top:2%;" required />';
            result+='<input type="text" placeholder="Dosage" id="dosage'+(i+1)+'" style="border:1px solid #c3c3c3;margin-top:2%;" required />';
            result+='<input type="text" placeholder="Route of Adminstration" id="route'+(i+1)+'" style="border:1px solid #c3c3c3;margin-top:2%;" required />';
            result+='</div>';
            }
            
            window.localStorage["PigTreatsCount"]=$scope.pigntreated.text;
            ele.html(result);
            }
            
            $scope.savepigdeath=function()
            {
            var pig_array = [];
            if($scope.pignodeath.text!="")
            {
            
            for (var i=0; i<$scope.pignodeath.text; i++)
            {
            var tempPigarray={};
            var rea = angular.element(document.getElementById("reason"+(i+1)));
            var causeofdeath=rea.val();
            if(causeofdeath=="0")
            {
               causeofdeath="Scrotal Rupture";
            }
            if(causeofdeath=="1")
            {
                causeofdeath="Lame/BadLeg";
            }

            if(causeofdeath=="2")
            {
                causeofdeath="Humpback";
            }

            if(causeofdeath=="3")
            {
                causeofdeath="Strep";
            }
            if(causeofdeath=="4")
            {
               causeofdeath="Greasy pig";
            }
            if(causeofdeath=="5")
            {
               causeofdeath="Tail Bite";
            }
            if(causeofdeath=="6")
            {
               causeofdeath="Prolapse";
            }
            if(causeofdeath=="7")
            {
               causeofdeath="Abcess";
            }
            if(causeofdeath=="8")
            {
               causeofdeath="Hematoma Ear";
            }
            if(causeofdeath=="9")
            {
               causeofdeath="Euthanized";
            }
            if(causeofdeath=="10")
            {
               causeofdeath="Dead On Arrival";
            }
            if(causeofdeath=="11")
            {
               causeofdeath="Dead within 24 hrs";
            }

            tempPigarray={"count":(i+1),"cause":causeofdeath};
            //alert(JSON.stringify(tempPigarray));
            pig_array.push(tempPigarray);
            }
            //  alert(pig_array);
            $rootScope.pigarrayDeaths=pig_array;
            window.localStorage["pigarrayDeaths"]=pig_array;
            location.href="#/app/inventory5/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
            // alert(pig_array);
            }
            else{
            $ionicPopup.alert({
                              title: 'Please Enter number',
                              template: '',
                              buttons:[{text:"OK",type:"button button-clear button-positive"}]
                              
                              });
            
            }
            }
            
            $scope.savePigtreatments=function()
            {
            var pig_treatmentarray = [];
           var ChkValidation="No";

           //  alert($scope.pigntreated.text);
            if($scope.pigntreated.text!="")
            {
            // alert(ChkValidation);
            for (var i=0; i<$scope.pigntreated.text; i++)
            {
            var tempPigtreatarray={};
            var medText = angular.element(document.getElementById("medicine"+(i+1)));
            var dosText = angular.element(document.getElementById("dosage"+(i+1)));
            var routeText = angular.element(document.getElementById("route"+(i+1)));
            var medval=medText.val();
            var dosval=dosText.val();
            var routeval=routeText.val();
            //alert(medval+"-"+dosval+"-"+routeval);
            tempPigtreatarray={"medicine_given":medval,"count":(i+1), "dosage":dosval+" mg", "how_administered":routeval};
            //  alert(JSON.stringify(tempPigtreatarray));
            pig_treatmentarray.push(tempPigtreatarray);
            //if(medText.val()!="" && dosval.val()!="" && routeval.val()!="")
            //{
            //ChkValidation="True";
            //}
            }
            //alert(pig_treatmentarray);
           
            //if(ChkValidation=="True")
            //{
            $rootScope.pigarrayTreatments=pig_treatmentarray;
            window.localStorage["pigarrayTreatments"]=pig_treatmentarray;
            location.href="#/app/review/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
            //}
            //else
            //{
            //alert("Please fill all values");
            //}
            // alert(pig_array);
            }
            else{
            $ionicPopup.alert({
                              title: 'Please Enter number',
                              template: '',
                              buttons:[{text:"OK",type:"button button-clear button-positive"}]
                              
                              });
            

            }
            }
           // $rootScope.inventorydate=$scope.date;
            $scope.no_death = function(){
            $rootScope.pigarrayDeaths=[];
            window.localStorage["PigDeathsCount"]=null;
            location.href="#/app/inventory5/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
            
            }
            $scope.no_treats=function(){
            $rootScope.pigarrayTreatments=[];
            window.localStorage["PigTreatsCount"]=null;
            location.href="#/app/review/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
            }
            if(window.localStorage["PigDeathsCount"]>0)
            {
            $scope.pignodeath ={text: window.localStorage["PigDeathsCount"]};
            }
            $scope.goBack = function() {
           // alert('mm');
            history.back();
            scope.$apply();
            }
            //alert($scope.pignodeath.text);
            })
.controller('reviewCtrl', function($scope, $stateParams, $http,$filter,$rootScope,$timeout, $ionicLoading,$ionicNavBarDelegate,$ionicPopup) {
            
            if(window.localStorage["PigTreatsCount"]>0)
            {
            
            }
            
            // Setup the loader
            $ionicLoading.show({
                               content: 'Loading',
                               animation: 'fade-in',
                               showBackdrop: true,
                               maxWidth: 200,
                               showDelay: 0
                               });
            $timeout(function () {
                     $ionicLoading.hide();
                     },3000);
            $scope.bname = $stateParams.barn_name;
            $scope.lname = $stateParams.loc_name;
            $scope.fname = $stateParams.farm_name;

            $scope.pignodeath={text:""};
            $scope.pignotreat={text:""};
            $scope.pigDeathObject=[];
            $scope.PigTreatObject=[];
            var bid= $stateParams.barn_id;
            $scope.barn_id=bid;
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            $scope.title = name;
            // alert($rootScope.inventorydate);
            $scope.inventorydate=$rootScope.inventorydate.text;
            //alert($scope.inventorydate);
            var urlb='http://nano.amfnano.com/barns/'+bid+'/last_inventory_report.json?user_credentials='+window.localStorage["login_token"];
            
            var config = {
            headers: {
            'Content-Type': 'application/json',
            }
            }
            var barninfo2 = $http.get(urlb,config);
            
            barninfo2.success(function (data, status, headers) {
                              //alert(data.reported_date);
                              //alert(JSON.stringify(data));
                              $scope.reported_at=data.report_date;
                              $scope.Intials=data.user_initials;
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
                              
                              });
            
            $scope.inventorydate={text:$rootScope.inventorydate.text};
            $scope.pigdeathStatus="none";
            $scope.pigtreatStatus="none";
 
            if(window.localStorage["PigDeathsCount"]>0)
            {
            //alert("true");
            $scope.pignodeath={text:window.localStorage["PigDeathsCount"]};
            var tempJSON=[];
            var ele = angular.element(document.getElementById("pigdeathsDiv"));
            var Deathresult='';
            //alert(JSON.stringify($rootScope.pigarrayDeaths));
            for (var i=0; i<$scope.pignodeath.text; i++)
            {
            var tempObject={};
            
            tempObject={"pigname":"Pig"+(i+1),"reason":$rootScope.pigarrayDeaths[i].cause};
            tempJSON.push(tempObject);
            //              alert($rootScope.pigarrayDeaths[i].cause);
            }
            //            alert($rootScope.testValue);
            $scope.pigDeathObject=tempJSON;
            $scope.pigdeathStatus="block";
            }
            else
            {
            //   alert("flase");
            $scope.pignodeath={text:"No"};
            $scope.pigDeathObject=[];
            $scope.pigdeathStatus="none";
            
            }
            
            
            
            // alert(JSON.stringify(tempJSON));
            //  alert("alert treat");
            
            if(window.localStorage["PigTreatsCount"]>0)
            {
            $scope.pignotreat={text:window.localStorage["PigTreatsCount"]};
            $scope.pigtreatStatus="block";
            }
            else
            {
            $scope.pignotreat={text:"No"};
            $scope.pigtreatStatus="none";
            }
            //alert($scope.pignotreat.text);
            
            
            var tempTreatJSON=[];
            for (var k=0; k<$scope.pignotreat.text; k++)
            {
            var tempObject={};
            
            tempObject={"pigname":"Pig"+(k+1),"Treat":"Treated"};
            tempTreatJSON.push(tempObject);
            }
            $scope.PigTreatObject=tempTreatJSON;
            $scope.submitInventory=function(){
            var ini = angular.element(document.getElementById("review_init"));
            var invurl='http://nano.amfnano.com/inventory_reports.json?user_credentials='+window.localStorage["login_token"];
            var bookData;
//            alert($rootScope.pigarrayDeaths.length + "---"+$rootScope.pigarrayTreatments.length);
            if(ini.val()!="")
            {
            if($rootScope.pigarrayDeaths.length==0 && $rootScope.pigarrayTreatments.length==0)
            {
            bookData = {
            "barn_id": bid,
            "report_date": $scope.inventorydate.text,
            "user_initials":ini.val()
            };
            }
            else if($rootScope.pigarrayDeaths.length==0 && $rootScope.pigarrayTreatments.length!=0)
            {
            bookData = {
            "barn_id": bid,
            "report_date": $scope.inventorydate.text,
            "user_initials":ini.val(),
            "pig_treatments_attributes":$rootScope.pigarrayTreatments
            };
            
            }
            else if($rootScope.pigarrayTreatments.length==0 && $rootScope.pigarrayDeaths.length!=0)
            {
            bookData = {
            "barn_id": bid,
            "report_date": $scope.inventorydate.text,
            "user_initials":ini.val(),
            "pig_deaths_attributes":$rootScope.pigarrayDeaths
            
            };
            
            }
            else if($rootScope.pigarrayTreatments.length!=0 && $rootScope.pigarrayDeaths.length!=0)
            {
            bookData = {
            "barn_id": bid,
            "report_date": $scope.inventorydate.text,
            "user_initials":ini.val(),
            "pig_deaths_attributes":$rootScope.pigarrayDeaths,
            "pig_treatments_attributes":$rootScope.pigarrayTreatments
            
            };
            
            }
            //alert(JSON.stringify(bookData));
            var barninfo = $http.post(invurl,JSON.stringify(bookData),config);
            
            barninfo.success(function (data, status, headers) {
                             window.localStorage["PigTreatsCount"]=null;
                             window.localStorage["PigDeathsCount"]=null;
                             $ionicPopup.alert({
                                               title: 'Inventory Succesfully created',
                                               template: '',
                                               buttons:[{text:"OK",type:"button button-clear button-positive"}]
                                               
                                               });
                             

                            
                             location.href = "#/app/barnHome/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
                             });
            barninfo.error(function (data, status, headers) {
                           $ionicPopup.alert({
                                             title: 'Please Enter all Pig Treatment Details',
                                             template: '',
                                             buttons:[{text:"OK",type:"button button-clear button-positive"}]
                                             
                                             });
                           });
            }
            else
            {
            $ionicPopup.alert({
                              title: 'Please Enter Initials',
                              template: '',
                              buttons:[{text:"OK",type:"button button-clear button-positive"}]
                              
                              });
            
            }
            
            }
            $scope.goBack = function() {
            
            history.back();
            scope.$apply();
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
