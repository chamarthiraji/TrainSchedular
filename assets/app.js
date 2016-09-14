// Initialize Firebase
  var config = {
    apiKey: "AIzaSyACieSoOZYL3O33lutnogvlg63qjqGXFOo",
    authDomain: "trainschedulerhw-b12de.firebaseapp.com",
    databaseURL: "https://trainschedulerhw-b12de.firebaseio.com",
    storageBucket: "",
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrainBtn").on("click",function(){

  		//grabs user input
  		var trainName = $("#trainName").val().trim();
  		var destin = $("#destination").val().trim();
  		var firstTrainTime = $("#firstTrTime").val().trim();
  		var frequency = $("#frequency").val().trim();

  		//creates a local temporary variable for holding train data

  		var newTrain = {
  			trainName: trainName,
  			destination: destin,
			firstTrainTime: firstTrainTime,
			frequency: frequency
		}
		
		//uploads train data to the database
		database.ref().push(newTrain);

		console.log(newTrain.trainName);	
		console.log(newTrain.destination);
		console.log(newTrain.firstTrainTime);
		console.log(newTrain.frequency);	

		return false;

  });

  //creates firebase event for adding train details to the database and html page when anew train data added
  database.ref().on("child_added",function(childSnapshot){

  	console.log(childSnapshot.val());

  	var trainName = childSnapshot.val().trainName;
	var destin = childSnapshot.val().destination;
	var firstTrainTime = childSnapshot.val().firstTrainTime;
	var frequency = childSnapshot.val().frequency; 

	console.log(trainName);
	console.log(destin);
	console.log(firstTrainTime);
	console.log(frequency);

	var currentTime = moment();
	console.log("CT:"+currentTime);
	console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
	console.log("first train time:"+firstTrainTime);
	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(firstTrainTime,"HH:mm").subtract(1, "years");
	console.log("firstTimeConvertd: "+ firstTimeConverted);

	console.log(moment(firstTrainTime,"HH:mm"));
	// Current Time
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % frequency;
	console.log(tRemainder);

	// Minute Until Train----------------
	var tMinutesTillTrain = frequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next Train---------------------------------
	var nextTrainArrivalTime = moment().add(tMinutesTillTrain, "minutes")
	console.log("ARRIVAL TIME: " + moment(nextTrainArrivalTime).format("HH:mm"));

	// Add each train's data into the table
	$("#trainTableId > tbody").append("<tr><td>" + trainName + "</td><td>" + destin + "</td><td>" + frequency +
		"</td><td>" + moment(nextTrainArrivalTime).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");


	}, 
	function (errorObject) {

  	console.log("The read failed: " + errorObject.code);

});



