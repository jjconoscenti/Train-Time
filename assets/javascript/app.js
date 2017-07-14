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
// NONE... well not really

// gather user input
$('#submitBtn').on('click', function(e) {
  e.preventDefault();

  var trainName = $('#trainName').val();
  $('trainName').val('');

  var destination = $('#trainDestination').val();
  $('trainDestination').val('');

  var trainTime = $('#trainTime').val();
  $('trainTime').val('');

  var frequency = $('#trainFrequency').val();
  $('trainFrequency').val('');

  addItem(trainName,destination,trainTime,frequency);
})

database.ref().on('child_added', function(childSnapshot) {
  var sv = childSnapshot.val();
  console.log(sv);
  var convertedTime = moment(sv.trainTime, 'hh:mm').subtract(1, 'years');
    console.log(convertedTime);

  var timeDifference = moment().diff(moment(convertedTime), "minutes");
      console.log(timeDifference);

  var timeRemaining = timeDifference % sv.frequency;
    console.log(timeRemaining);

  var minutesAway = sv.frequency - timeRemaining;
    console.log(minutesAway);

  var nextArrivingTrain = moment().add(minutesAway, "minutesAway");
  var nextTrain = moment(nextArrivingTrain).format("hh:mma");
  console.log(nextTrain);

  renderItem(sv.trainName, sv.destination, sv.frequency, nextArrivingTrain, minutesAway);
});

function addItem (trainName,destination,trainTime,frequency) {
  if (trainName && destination && trainTime && frequency) {
    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      trainTime: trainTime
    });
  } else {
      alert('ENTER INFORMATION PLEASE');
  };
}

function renderItem (trainName,destination,frequency,nextArrival,minutesAway) {
  var row = [trainName,destination,frequency,nextArrival,minutesAway].map(function (val) {
    return '<td>' + val + '</td>'
  }).join('');
  $('#trainTable').append('<tr>'+row+'</tr>');
}
