var body = document.getElementsByTagName("body")[0];
var ul = document.getElementsByTagName("ul")[0];
var USA = document.getElementById('USA')
var GB = document.getElementById('GB')
var male = document.getElementById('male')
var female = document.getElementById('female')
var submit = document.getElementById('submit')
var url = "http://api.randomuser.me/?";

// make a new html request and deal with the results
function ajaxGetQuote(){

	var results = parseInt(document.getElementById('results').value);

		if(results > 0) {query = url + "results=" + results};
		if(male.checked != false) {query = query + "&gender=male"};
		if(female.checked != false) {query = query + "&gender=female"};
		if(male.checked != false && female.checked != false) {query = randomUser + "results=" + results};
		if(GB.checked != false) {query = query + "&nat=gb"};
		if(USA.checked != false) {query = query + "&nat=us"};

		var xhr = new XMLHttpRequest();
		xhr.open("GET", query);
		xhr.addEventListener("load", function(){
			// xhr.response is what comes back from the api
		displayUser(xhr.response);
		});
		xhr.send();
}


// display the user on the page
function displayUser(JSONobject) {
	var randomUser = JSON.parse(JSONobject).results[0].user;
	var array = [randomUser.username, randomUser.location.street, randomUser.password, randomUser.cell]
	
	var img = document.createElement('img');
	img.setAttribute("img", src="")
	img.setAttribute("id","image");
	img.src = randomUser.picture.medium;
	body.appendChild(img);

	array.forEach(function(item){
	var li = document.createElement('li');
	li.setAttribute("list-style-type", "none");
	li.innerText = item;
	body.appendChild(li);
	});

	var button = document.createElement('button');
	button.innerText = "Dump";
	button.setAttribute("id", "dump");
	body.appendChild(button);
	var dump = document.getElementById('dump');

	var button = document.createElement('button');
	button.innerText = "Date";
	button.setAttribute("id", "date");
	body.appendChild(button);
	var date = document.getElementById('date');
	var br = document.createElement('br');
	body.appendChild(br);

	dump.addEventListener("click", dumpDate);
	date.addEventListener("click", dateDate);
}

// dump the person
function dumpDate(){
	var dump = document.getElementById('dump');
	var date = document.getElementById('date');
	var img = document.getElementById('image');
	var list = document.getElementsByTagName('li');
	for(i=0; i<list.length; i++) {
		for(j=list.length; j>0; j--) {
		list[0].remove();
		}
	}
	dump.remove();
	date.remove();
	img.remove();
	ajaxGetQuote();
}

function dateDate(){
	var url = "http://localhost:3000/date";
  	var xhr = new XMLHttpRequest();
  	xhr.open("POST", url);
  	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  	xhr.addEventListener("load", function(){
  		displayUser(xhr.response);
  });
  	var list = document.getElementsByTagName("li");
  	var image = document.getElementsByTagName("img")[0].src;
  	//console.log(list);
  	var newDate = {user_name: list[0].innerText, address: list[1].innerText, password: list[2].innerText, phone_number: list[3].innerText, pic: image};
  xhr.send(JSON.stringify(newDate));
}




submit.addEventListener("click", ajaxGetQuote);

