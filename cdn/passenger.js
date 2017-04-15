 //https://developers.google.com/apps-script/articles/mail_merge#section-3-exercise-modifying-the-form-and-the-personalized-email
 //https://github.com/dwyl/html-form-send-email-via-google-script-without-server
 
 //https://docs.google.com/spreadsheets/d/1oVxrXhJ_VeEPyr2ph4NAB9erEqq6E-okW5pg_kpkMrE/edit#gid=0
 
 // https://script.google.com/macros/s/AKfycbwoGiaYGuQ1B9EY1v0Va-r8kKUQedzay-zWIdVx4PmhY_MMo4M/exec     email verification
 
 //https://angular-ui.github.io/bootstrap/  date picker 
 
 var app=angular.module("travelApplication",['ngAnimate','ngSanitize','ui.bootstrap']);
 app.controller('passengerCtrl',function($scope,$http,$log,$filter){
	$scope.lat = undefined;
    $scope.lng = undefined;
	$scope.vehicleformdata={vname:'',vmobile:'',vjdate:'',vsource:'',dlicence:'',vdestination:'',vnumberseats:'',vcomments:'',vvehicletype:'',vvehiclenumber:''};		
    $scope.searchvehicle={jdate:'',source:'',destination:'',jdate1:''};
	$scope.searchpassenger={pjdate:'',psource:'',pdestination:''};	
	$scope.otp=Math.floor(1000 + Math.random() * 9000);
	$scope.firstTimeLogin=true;
	$scope.passengerformdata={pname:'',pmobile:'',pjdate:'',psource:'',pdestination:'',pnumberpassenger:'',pcomments:''};	
	$scope.vehicleformdata.vjdate = new Date();
	$scope.vgender={};
	$scope.pgender={};
	$scope.menuname='';
	$scope.email={'vholderemail':"",'pasengermail':""};
	/* Declaring Menu Value  Start*/
		$scope.homeData=true;
		$scope.displaypassengerform=false;
		$scope.displayvehicleform=false;
		$scope.displaypassengerdata=false;
		$scope.displayvehicledata=false;
		$scope.otpvalidation=false;
		$scope.displayemailvalidation=false;
	/* Declaring Menu Value  End*/
		$scope.phoneNumber = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
	/* Code For displaying Complete details of passenger and also Vehicle Start */
		$scope.activePassenger = {};
		$scope.activeVehicle  = {};  
		$scope.changeActiveVehicle=function(index){
			$scope.activeVehicle = index;
		}  
		$scope.changeActivePassenger=function(index){
			$scope.activePassenger = index;
		}  
    /* Code For displaying Complete details of passenger and also Vehicle End */
	
	/*Code For Change Cursor as pointer Start */
		$(".hometile").hover(function() {
			$(this).css('cursor','pointer');
		}, function() {
			$(this).css('cursor','auto');
		});
	/*Code For Change Cursor as pointer End */
	
	/*Bootstrap Email verification with OTP Start */
		$scope.displayValidateEmail=function(){      		
			$scope.homeData=false;
			$scope.displaypassengerform=false;
			$scope.displayvehicleform=false;
			$scope.displaypassengerdata=false;
			$scope.displayvehicledata=false;
			$scope.otpvalidation=false;
			$scope.displayemailvalidation=true;
		}
		$scope.displayVerifyOTP=function(){		   
				document.getElementById('emailverifyform').style.display = 'block';
				$scope.homeData=false;
				$scope.displayemailvalidation=false;
				$scope.otpvalidation=true;	
		}
		$scope.validatingOTP=function(){
			document.getElementById('otpvalidattion').style.display = 'block';
			var otpvalidationUrl='https://docs.google.com/spreadsheets/d/1GRa7mdCnBI9Jmc3Se2M_dhGfbBBYi4vB0LXj3Wu6V5Q/edit?usp=sharing';	
				Tabletop.init({ key:otpvalidationUrl,
				   callback: function(data, tabletop) { 
					 var invalid=true;
					 for(var i in data){
						 if(data[i].otp==$scope.userotp && data[i].email==$scope.verificationemail){
							invalid=false;
							$scope.firstTimeLogin=false;	
                            $scope.email.vholderemail=$scope.verificationemail;
							$scope.email.pasengermail=$scope.verificationemail;							
							$scope.selectMenuItem();
							document.getElementById('otpvalidattion').style.display = 'block';
							 break;
						 }
					 }
					 if(invalid){
						$scope.invalidOTP=true;
						document.getElementById('otpvalidattion').style.display = 'none';
					 }
					 $scope.$apply();
				   },
				   simpleSheet: true 
				});
			
		}	
		$scope.resetOTPValidation=function(){
			$scope.invalidOTP=false;
		}
	/*Bootstrap Email verification with OTP Start */
	$scope.displayMenu=function(menuitem){		
		$scope.menuname=menuitem;
		if($scope.menuname=="home"){
			$scope.selectMenuItem();
		}else if($scope.firstTimeLogin){
				$scope.displayValidateEmail();
		}else{
			$scope.selectMenuItem();
		}
	}
	$scope.selectMenuItem=function(){
		var menu=$scope.menuname;
		document.getElementById('vehiclesearch').reset();
		document.getElementById('passengersearch').reset();
		$scope.passengerformdata={pname:'',pmobile:'',pjdate:'',psource:'',pdestination:'',pnumberpassenger:'',pcomments:''};
		$scope.vehicleformdata={vname:'',vmobile:'',vjdate:'',vsource:'',vdestination:'',vnumberseats:'',vcomments:'',vvehicletype:'',vvehiclenumber:''};
		$scope.pgender={};
		$scope.vgender={};
		$scope.searchvehicle={jdate:'',source:'',destination:''};
		$scope.searchpassenger={pjdate:'',psource:'',pdestination:''};	
		document.getElementById('success').style.display = 'none';		
		$scope.homeData=false;
		$scope.displaypassengerform=false;
		$scope.displayvehicleform=false;
		$scope.displaypassengerdata=false;
		$scope.displayvehicledata=false;
		$scope.otpvalidation=false;
	    $scope.displayemailvalidation=false;
		document.getElementById('otpvalidattion').style.display = 'none';
		if(menu=="home"){
			$scope.homeData=true;
		}
		else if(menu=="vehicle"){
			$scope.displayvehicleform=true;
			document.getElementById('gform').style.display = 'block';
		}
		else if(menu=="passenger"){
			$scope.displaypassengerform=true;
			document.getElementById('gform2').style.display = 'block';
		}
		else if(menu=="searchpassenger"){
			document.getElementById('passgif').style.display = 'block'; 
			$scope.displaypassengerdata=true;
			$scope.passengerData=[];
			var passengerUrl='https://docs.google.com/spreadsheets/d/1MFUcIU6w-yH-J9BeYs29MLAdm6y62zMsp0eGMu_RPhA/edit?usp=sharing';	
			Tabletop.init({ key:passengerUrl,
			   callback: function(data, tabletop) { 
				 $scope.passengerData=data;
				 document.getElementById('passgif').style.display = 'none'; 
				 $scope.$apply();
			   },
			   simpleSheet: true 
			});
			}else if(menu=="searchvehicle"){
				$scope.myData=[];
				document.getElementById('gif').style.display = 'block'; 
				$scope.displayvehicledata=true;
				var vehicledataurl='https://docs.google.com/spreadsheets/d/1oVxrXhJ_VeEPyr2ph4NAB9erEqq6E-okW5pg_kpkMrE/edit?usp=sharing';
				Tabletop.init({ key:vehicledataurl,
				   callback: function(data, tabletop) { 
					 $scope.myData=data;
					 document.getElementById('gif').style.display = 'none'; 
					 $scope.$apply();
				   },
				   simpleSheet: true 
				});
			}
	}
/* Date picker Code Start Here */
  $scope.today = function() {
    $scope.searchpjdate = new Date();
    $scope.searchvjdate = new Date();
  };
  $scope.clear = function() {
    $scope.searchpjdate = null;
    $scope.searchvjdate = null;
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };
  $scope.toggleMin = function() {
    $scope.dateOptions.minDate = $scope.dateOptions.minDate ? null : new Date();
  };
  $scope.toggleMin();
  $scope.passengerSearch = {
		opened: false
	  };
  $scope.vehicleSearch = {
		opened: false
	  };
  $scope.passengerForm={
  		opened: false
  }
  $scope.open = function(formname) {
    $scope.dateOptions.minDate = $scope.dateOptions.minDate ? null : new Date()
    if(formname=="passengerSearch"){
    	$scope.passengerSearch.opened=true;
    }
	else if(formname=="vehicleSearch"){
		$scope.vehicleSearch.opened=true
	}else if(formname=="passengerForm"){
		 $scope.passengerForm.opened=true;
	}
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];
/*============= Set Tomorrow date End =============*/
// Date picker ends here 
  //Time picker starts here
  	$scope.vjourneytime = new Date();
  	$scope.pjourneytime = new Date();
  	$scope.pjtime = $filter('date')($scope.pjourneytime, 'shortTime');
  	$scope.vjtime = $filter('date')($scope.vjourneytime, 'shortTime');
  	$scope.hstep = 1;
  	$scope.mstep = 15;
  	$scope.options = {
    	hstep: [1, 2, 3],
    	mstep: [1, 5, 10, 15, 25, 30]
  	};
  	var d = new Date();
  	d.setHours( 2 );
  	d.setMinutes( 0 );
  	$scope.min = d;
  
  	$scope.ismeridian = true;
  	$scope.toggleMode = function() {
    	$scope.ismeridian = ! $scope.ismeridian;
  	};

  	$scope.update = function() {
	    var d = new Date();
	    d.setHours( 14 );
	    d.setMinutes( 0 );
	    $scope.vjourneytime = d;
  	};

  	$scope.changed = function (formname) {
  		if(formname=='vehicle'){
  			$scope.vjtime = $filter('date')($scope.vjourneytime, 'shortTime');
  		}else{
  			$scope.pjtime = $filter('date')($scope.pjourneytime,'shortTime');
  		}
  	};
/*    $scope.cleartimer=function(){
    	if(!$scope.passengerformdata.pjdate){
    		$scope.pjourneytime =null;
    	}
    };*/
  	$scope.clear = function() {
    	$scope.vjourneytime = null;
    	$scope.pjourneytime =null;
  	};
  	$scope.filterdate=function(fieldfrom){
	  	if(fieldfrom=="vehicle"){
	  		$scope.searchvehicle.jdate = $filter('date')($scope.searchvjdate, 'dd-MMMM-yyyy');
	  	}else if(fieldfrom=="passenger"){
	  		$scope.searchpassenger.pjdate = $filter('date')($scope.searchpjdate, 'dd-MMMM-yyyy');
	  	}
  	}
 });
 app.directive('googleplace', function() {
	return {
		require: 'ngModel',
		restrict:'C',
		link: function(scope, element, attrs, model) {
			var options = {
				types: [],
				componentRestrictions: {'country': []}   // google address api options
			};
			scope.addresslist = new google.maps.places.Autocomplete(element[0], options);
			google.maps.event.addListener(scope.addresslist, 'place_changed', function() {
				scope.$apply(function() {
					model.$setViewValue(element.val());                
				});
			});
		}
	};
});

	


