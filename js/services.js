angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Farms', function() {

       var farms = [
      { id: 0, name: 'Farm1' },
      { id: 1, name: 'Farm2' },
      { id: 2, name: 'Farm3' },
      { id: 3, name: 'Farm4' }
    ];
  
  return {
            all: function() {
              return farms;
            },
            get: function(farmId) {
              // Simple index lookup
              return farms[farmId];
            }
          }
  // Some fake testing data
         
//         
//.factory('myService', function($http) {
//                  var myService = {
//                  get: function(id,loginid) {
//         var url4 = 'http://nano.amfnano.com/barns/'+id+'/last_reading.json?user_credentials='+loginid;
//         $http.get(url4).then(function(resp) {
//                              //alert(JSON.stringify(resp));
//                              return resp;
//                              });
//                  }
//                  
//    return myService;
//                  });

 
});