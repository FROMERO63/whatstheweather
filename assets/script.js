//var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?${lat}=35&${lon}=139&appid=a7176dcf77c86055b755f1dea4e0115a`;
// var geocodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=tokyo&limit=5&appid=a7176dcf77c86055b755f1dea4e0115a`;

var getLocalSorage=localStorage.getItem("searchedcities");
var searchedCities=JSON.parse(getLocalSorage);
console.log(searchedCities);
combinedCities=[];



var cityDate = document.getElementById('weatherCardTitle');
var todayTemp = document.getElementById('todayTemp');
var todayWind = document.getElementById('todayWind');
var todayHumidity = document.getElementById('todayHumidity');

var cardDate1 = document.getElementById('tomorrowCardTitle1');
var emoji1 = document.getElementById('tomorrowEmoji1');
var temp1 = document.getElementById('tomorrowTemp1');
var wind1 = document.getElementById('tomorrowWind1');
var humidity1 = document.getElementById('tomorrowHumidity1');

var today = dayjs().format('MMM D, YYYY');
var currentDay = document.getElementById('weatherCardTitle');
var cityName = document.querySelector("#theSearch").value;
var container = document.getElementById("historyContainer");


var search = document.getElementById('searchBtn')

search.addEventListener("click", searchFunction)


function searchFunction() {
  var searchResults = document.getElementById('theSearch').value;
  console.log(searchResults);

  var geocodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=${searchResults}&limit=5&appid=a7176dcf77c86055b755f1dea4e0115a`;
  fetch(geocodeApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    //getting Latitude and Longitude to input in API request
    var long = data[0].lon;
    var later =data[0].lat;
    var lo= long;
    var la= later;
    localStorage.setItem("citylon", lo);
    localStorage.setItem("citylat", la);
  })
  var longitude= localStorage.getItem("citylon");
  var lateral= localStorage.getItem("citylat");
  console.log(lateral);
  console.log(longitude);

  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lateral}&lon=${longitude}&appid=a7176dcf77c86055b755f1dea4e0115a`;
  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
               
    var getLocalSorage=localStorage.getItem("searchedcities");
    var searchedCities=JSON.parse(getLocalSorage);

    //if(!searchedCities.includes(searchResults)){
      var searches= document.createElement("div");
      var searchedCity = document.createTextNode(`${searchResults}`);
      container.appendChild(searches);
      searches.appendChild(searchedCity);
      searches.classList.add("historyButton");
      var searchArea = document.getElementById('theSearch');
      var combinedSearch = [];
      combinedSearch = JSON.parse(localStorage.getItem('searchedcities')) || [];
      combinedSearch.push(searchResults);
      localStorage.setItem('searchedcities', JSON.stringify(combinedSearch));
      searchArea.value='';
      
    //}else{
      var searchArea = document.getElementById('theSearch');
      searchArea.value='';
      console.log(combinedSearch);
    
    
    //temp,wind,humidity,emoji-loop through, increment class and textcontent to each
    var emoji = data.list[0].weather[0].icon;;
    var img=`https://openweathermap.org/img/wn/${emoji}@2x.png`;
    var temp = data.list[0].main.temp;
    var wind = data.list[0].wind.speed;
    var humid = data.list[0].main.humidity;
    //local storage
    currentDay.textContent = `${searchResults}  ${today}  ${img}`;
    todayTemp.textContent= 'Temp: ' + temp + ' deg F'
    todayWind.textContent= 'Wind: ' + wind + ' MPH'
    todayHumidity.textContent= 'Humidity: ' + humid + ' %'


  
for (let i = 1; i <6; i ++) {
    var cardDate1 = document.getElementById('tomorrowCardTitle'+ [i]);
    var emoji1 = document.getElementById('tomorrowEmoji'+ [i]);
    var temp1 = document.getElementById('tomorrowTemp'+ [i]);
    var wind1 = document.getElementById('tomorrowWind'+ [i]);
    var humidity1 = document.getElementById('tomorrowHumidity'+ [i]);

    var futureDate = dayjs().add( [i],'day');
    var emoji0 = data.list[i].weather[0].icon;
    var emoji2 = `https://openweathermap.org/img/wn/${emoji0}@2x.png`;
    var temp = data.list[i].main.temp;
    var wind = data.list[i].wind.speed;
    var humid = data.list[i].main.humidity;

    cardDate1.textContent= futureDate.format('MMM D, YYYY');
    emoji1.textContent=emoji2
    temp1.textContent= 'Temp: ' + temp + ' deg F';
    wind1.textContent= 'Wind: ' + wind + ' MPH';
    humidity1.textContent= 'Humidity: ' + humid + ' %';
   }})};

//get the past history searched and append them as buttons
  function getSearches(){
    if (getLocalSorage=""){
      return;
    }
    else {
      var unique=getUniqueArray(searchedCities);
      for (j=0; j< unique.length; j++){
      var pastSearch= document.createElement("div");
      var pastSearchedCity = document.createTextNode(unique[j]);
      container.appendChild(pastSearch);
      pastSearch.appendChild(pastSearchedCity);
      pastSearch.classList.add("historyButton");
      localStorage.setItem('searchedcities', JSON.stringify(unique));

      pastSearch.addEventListener('click', function (){
        searchSavedCities ();
      })
    }
  }};

  const getUniqueArray = (arr) =>  {
    var result = [];
    for (var i=0, l=arr.length; i<l; i++)
        if (result.indexOf(arr[i]) === -1 && arr[i] !== '')
            result.push(arr[i]);
    return result;
}


function searchSavedCities (){
  window.onclick = e => {
    var searchResults= e.target.innerText;
    var geocodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=${searchResults}&limit=5&appid=a7176dcf77c86055b755f1dea4e0115a`;
fetch(geocodeApi)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
  var long = data[0].lon;
  var later =data[0].lat;
  var lo= long;
  var la= later;
  localStorage.setItem("citylon", lo);
  localStorage.setItem("citylat", la);
})
var longitude= localStorage.getItem("citylon");
var lateral= localStorage.getItem("citylat");

var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lateral}&lon=${longitude}&appid=a7176dcf77c86055b755f1dea4e0115a`;
fetch(requestUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
  
  var emoji = data.list[0].weather[0].icon;
  var emoji0 = `<div><img src="https://openweathermap.org/img/wn/${emoji}@2x.png"/> </div>`;
  var temp = data.list[0].main.temp;
  var wind = data.list[0].wind.speed;
  var humid = data.list[0].main.humidity;
  console.log(emoji0);
  currentDay.textContent = `${searchResults}  ${today} <div><img src="https://openweathermap.org/img/wn/${emoji}@2x.png"/> </div>`;
  todayTemp.textContent= 'Temp: ' + temp + ' deg F'
  todayWind.textContent= 'Wind: ' + wind + ' MPH'
  todayHumidity.textContent= 'Humidity: ' + humid + ' %'


for (let i = 1; i <6; i ++) {
  var cardDate1 = document.getElementById('tomorrowCardTitle'+ [i]);
  var emoji1 = document.getElementById('tomorrowEmoji'+ [i]);
  var temp1 = document.getElementById('tomorrowTemp'+ [i]);
  var wind1 = document.getElementById('tomorrowWind'+ [i]);
  var humidity1 = document.getElementById('tomorrowHumidity'+ [i]);

  var futureDate = dayjs().add( [i],'day');
  var emoji0 = data.list[i].weather[0].icon;
  var emoji2 = `https://openweathermap.org/img/wn/${emoji[i]}@2x.png`;
  var temp = data.list[i].main.temp;
  var wind = data.list[i].wind.speed;
  var humid = data.list[i].main.humidity;

  cardDate1.textContent= futureDate.format('MMM D, YYYY');
  emoji1.textContent=emoji2;
  temp1.textContent= 'Temp: ' + temp + ' deg F';
  wind1.textContent= 'Wind: ' + wind + ' MPH';
  humidity1.textContent= 'Humidity: ' + humid + ' %';
}})
}};

