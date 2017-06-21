// load firebase
var config = {
    apiKey: "AIzaSyBIPiRHA76NsuvFuAVEVVPxgm9tTwQ9mb0",
    authDomain: "employee-data-management-6b883.firebaseapp.com",
    databaseURL: "https://employee-data-management-6b883.firebaseio.com",
    projectId: "employee-data-management-6b883",
    storageBucket: "employee-data-management-6b883.appspot.com",
    messagingSenderId: "73155569419"
  };

// initialize app
firebase.initializeApp(config);

// reference database
var database = firebase.database();

// global variables
var trainName;
var destination; 
var trainTime;
var frequency;

// gather user input
$('submitBtn').on('click', function(e) {
  e.preventDefault();

  trainName = $('#trainName').val();
  $('trainName').val('');

  destination = $('#trainDestination').val();
  $('trainDestination').val('');

  trainTime = $('#trainTime').val();
  $('trainTime').val('');

  frequency = $('#trainFrequency').val();
  $('trainFrequency').val('');
})

var convertedTime = moment(trainTime, 'hh:mm').subtract(1, 'years');
  console.log(convertedTime);

var timeBetween = moment().diff(moment(convertedTime), "minutes");
  console.log('Time between: ${timeBetween}');

var timeRemaining = timeBetween % frequency;
  console.log(timeRemaining);

var minutesAway = frequency - timeRemaining;
  console.log('Minutes away: ${minutesAway}');

var nextArrivingTrain = moment().add(minutesAway, "minutes");

var nextTrain = moment(nextArrivingTrain).format("hh:mma");
  console.log('Next Train Arrives at: ${nextTrain}');

// ensure user entry then push to database
  
  if (trainName !== '' && destination !== '' && trainTime !== '' && frequency !== '') {
    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      trainTime: trainTime,
      minutesAway: minutesAway,
      nextTrain: nextTrain
    });
  } else {
      alert('ENTER INFORMATION PLEASE');
  };

database.ref().on('child_added', function(childSnapshot) {
  var sv = childSnapshot.val();

  convertedTime = moment(sv.trainTime, 'hh:mm').subtract(1, 'years');
    console.log(convertedTime);

  timeDifference = moment().diff(moment(convertedTime), "minutes");
      console.log(timeDifference);

  timeRemaining = timeDifference % sv.frequency;
    console.log(timeRemaining);

  minutesAway = sv.frequency - timeRemaining;
    console.log(minutesAway);

  nextArrivingTrain = moment().add(minutesAway, "minutesAway");
  nextTrain = moment(nextArrivingTrain).format("hh:mma");
    console.log(nextTrain);

  $('.table').append('<tbody><tr><td class="tableData">${sv.trainTime}</td><td class="tableData>${sv.destination}</td><td class="tableData">${sv.frequency}</td><td class="tableData">${nextTrain}</td><td class="tableData">${minutesAway}</td></tbody>');
});














