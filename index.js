// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric
let apiid = '771d0d5e791ad933891fd0e6fe0838ef';

let city = document.getElementById('inputCity');

let dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

let monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];

city.addEventListener('keypress',(e)=>{
    if(e.key=='Enter'){
        // console.log(city.value);
        let xhr = new XMLHttpRequest();

        xhr.open('GET',`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=771d0d5e791ad933891fd0e6fe0838ef&units=metric`,true)


        xhr.onload = function(){
            // console.log(JSON.parse(this.responseText));
            let content = JSON.parse(this.responseText);

            
            let location = document.getElementById('location');
            let locationCity = content.name;
            let locationCountry = content.sys.country;
            location.innerText = `${locationCity}/${locationCountry}`;

            let date = document.getElementById('date');
            let today = new Date();
            let tDate = today.getDate();
            let tDay = today.getDay();
            let tMonth = today.getMonth();
            let tYear = today.getFullYear();
            date.innerText = `${dayList[tDay]}  ${tDate}-${monthList[tMonth]}-${tYear}`;

            let temp = document.getElementById('temp');
            let tempData = Math.round(content.main.temp);
            temp.innerHTML = `${tempData} &degC`;

            let type = document.getElementById('type');
            let typeData = content.weather[0].main;
            type.innerText = `${typeData}`;
        

            let minMax = document.getElementById('minMax');
            let minData = content.main.temp_min;
            let maxData = content.main.temp_max;
            minMax.innerText = `${minData}/${maxData}`;

            let changeLogo = document.getElementById('changeLogo');
            if(typeData == 'Clouds'){
                changeLogo.innerHTML = `
                <img src="animated/cloudy.svg" alt="" id="weatherLogo">
                `;

            }
            else if(typeData == 'Clear'){
                changeLogo.innerHTML = `
                <img src="animated/day.svg" alt="" id="weatherLogo">
                `;

            }
            else if(typeData == 'Rain'){
                changeLogo.innerHTML = `
                <img src="animated/rainy-6.svg" alt="" id="weatherLogo">
                `;

            }
            else if(typeData == 'Haze'){
                changeLogo.innerHTML = `
                <img src="animated/cloudy-day-1.svg" alt="" id="weatherLogo">
                `;

            }
        }


        xhr.send();

        city.value = '';

    }
    
})
