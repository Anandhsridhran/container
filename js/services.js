var fa1 = [];
var si = [];
var ba = [];
var ra = [];
var reading = [];
angular.module('starter.services', [])


/**
 * A simple example service that returns some data.
 */
//var fa1 = [];

.factory('db', function($http, $ionicLoading,$timeout) {
        
         var dev_id = window.localStorage['dev_id'];
         var company_id = window.localStorage['company_id'];
         var sync = function (){
         var createDB = window.sqlitePlugin.openDatabase({name : "Assist"});
         var container = [];
         var sites = [];
         var barns = [];
         var barn_reading = [];
         var ids = [];
         var urlf = 'http://containers.softimum.com/companies/'+company_id+'/sites.json?user_credentials='+window.localStorage['login_token'];
         var config = {
         headers: {
         'Content-Type': 'application/json'
         }
         }
         var sitesjson = $http.get(urlf,config)
         sitesjson.success(function (data1, status, headers) {
                          sites = data1;
                          container_db();
                          });
         sitesjson.error(function (data, status, headers) {
                        alert("error");
                        });
         
         function container_db(){
         for (var index=0; index<sites.length; index++)
         {
         var urls = ' http://containers.softimum.com/sites/'+sites[index].site_id+'/containers.json?user_credentials='+window.localStorage['login_token'];
         var request = new XMLHttpRequest();
         request.open('GET', urls, false);  // `false` makes the request synchronous
         request.setRequestHeader('Content-Type', 'application/json');
         request.send(null);
         if (request.status === 200) {

         var locJson=JSON.parse(request.responseText);
         container = container.concat(locJson);

        }
         }
         createDatabase();
         }
         
         
        function createDatabase() {
         alert("Data Sync");
         createDB.transaction(createfarm, errorHandler, successHandler);
         }
         function createfarm(tx)
         {
         tx.executeSql('DROP TABLE IF EXISTS sites');
         tx.executeSql('DROP TABLE IF EXISTS container');
       
         tx.executeSql('CREATE TABLE IF NOT EXISTS sites (`site_id` ,`sname`, `saddress`)');
         
         tx.executeSql('CREATE TABLE IF NOT EXISTS container (`container_id` ,`cname`, `ctype`, `caddress`)');
         
         for (var index=0; index<sites.length; index++)
         {
         tx.executeSql('INSERT INTO sites (site_id, sname, saddress) VALUES (?, ?, ?)',
                       [sites[index].site_id,sites[index].name,sites[index].address]);
         }
         
         for (var index=0; index<container.length; index++)
         {
         tx.executeSql('INSERT INTO container (container_id, cname, ctype, caddress) VALUES (?, ?, ?, ?)',
                       [container[index].container_id,container[index].name,container[index].type,container[index].address]);
         }
         
         
         tx.executeSql('SELECT * FROM sites', [], function(tx,results)
                       {
                       fa1 = [];
                       var len = results.rows.length;
                       for(var c=0; c<len; c++){
                       fa1.push(results.rows.item(c))
                       }
                       });
         tx.executeSql('SELECT * FROM container', [], function(tx,results){
                       si = [];
                       var len = results.rows.length;
                       for(var c=0; c<len; c++){
                       si.push(results.rows.item(c))
                       }
                       });
        }
         
         function errorHandler(error)
         {
         alert(error);
         alert("Low Network Connectivity. Reopen the application with good connectivity111");
         }
         
         function successHandler()
         {
         
         location.href = '#/app/list';
         
         }

         
         
         };
         
         return {
         sync: sync
         };
         
         })

.factory('frms', function($interval) {
         var createDB = window.sqlitePlugin.openDatabase({name : "Assist"});
         var ids = [];
                 function errorHandler(error)
         {
         alert(error);
         }
         
         function successHandler()
         {
//         alert("done");
         createDB.transaction(read, errorHandler, success);
         }
         function success()
         {
//         alert("done2");
         }
         
      
         var sites = function(){

         createDB.transaction(function selectsite(tx){
                              
                              tx.executeSql('SELECT * FROM sites', [], function(tx,results)
                                            {
                                            var len = results.rows.length;
                                            fa1 = [];
                                            for(var c=0; c<len; c++){
                                            fa1.push(results.rows.item(c))
                                            }
                                        });
                              }, errorHandler, success);
         return fa1;
         };
         var container = function(){
         createDB.transaction(function selectcontainer(tx){
                              tx.executeSql('SELECT * FROM container', [], function(tx,results){
                                            var len = results.rows.length;
                                            si = [];
                                            for(var c=0; c<len; c++){
                                            si.push(results.rows.item(c))
                                            }
                                            });
                              }, errorHandler, success);
         return si;

         };
         
         return{
            alls:sites,
            allc:container
         }
         })

.factory('app', function() {
//         alert("1");
         var createDB = window.sqlitePlugin.openDatabase({name : "Assist"});
         createDB.transaction(readata, errorHandler, successHandler);
         function readata(tx){
         tx.executeSql('SELECT * FROM sites', [], function(tx,results)
                       {
                       fa1 = [];
                       var len = results.rows.length;
                       for(var c=0; c<len; c++){
                       fa1.push(results.rows.item(c))
                       }
                       });
         tx.executeSql('SELECT * FROM container', [], function(tx,results){
                       si = [];
                       var len = results.rows.length;
                       for(var c=0; c<len; c++){
                       si.push(results.rows.item(c))
                       }
                       });
                 }
         function errorHandler(error)
         {
         alert(error);
         alert("Low Network Connectivity. Reopen the application with good connectivity2222");
         }
         
         function successHandler()
         {
         
         location.href = '#/app/list';
         
         }

         })

.factory('log', function() {

         })
.factory('barn',function(){
         return{
         allf:function(){
         return fa1;
         },
         alls:function(){
         return si;
         },
         allb:function(){
         return ba;
         },
         allr:function(){
         return ra;
         }
         }

         })

.factory('barnman',function(){
         return{
         allf:function(){
         return fa1;
         },
         alls:function(){
         return si;
         },
         allb:function(){
         return ba;
         },
         allr:function(){
         return ra;
         }
         }
         
         });

