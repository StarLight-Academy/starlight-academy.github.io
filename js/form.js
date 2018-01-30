// Initialize Firebase
var config = {
apiKey: "AIzaSyBl9zI9Hn8D70-GBX9nPU05DnmSuQpZKHk",
authDomain: "starlight-0494.firebaseapp.com",
databaseURL: "https://starlight-0494.firebaseio.com",
projectId: "starlight-0494",
storageBucket: "starlight-0494.appspot.com",
messagingSenderId: "377384810896"
};
firebase.initializeApp(config);

// Reference messages collections
var messagesRef = firebase.database().ref('messages');

// Listen for form Submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
    e.preventDefault();
    var name = getInputVal('name');
    var course = getInputVal('course');
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var message = getInputVal('message');

    // Save message
    saveMessage(name, course, email, phone, message);

    // Show alert
    document.querySelector('.alert').style.display='block';

    // Hide alert after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').style.display='none';
    }, 3000);

    // Clear form
    document.getElementById('contactForm').reset();

	if(document.getElementById('modalLabel') != null){
		document.querySelector('input[name="course"]').value = document.querySelector('#modalLabel').innerText;
	}
}

// to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

// Save messages to firebase
function saveMessage(name, course, email, phone, message){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        'name': name,
        'course': course,
        'email': email,
        'phone': phone,
        'message': message
    })
}
