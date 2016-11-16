window.onload = function(){
    
    var weatherForm = document.getElementById('weather-options');
    var wrapper = document.getElementById('weather-output');
		
	
	weatherForm.addEventListener('submit', onFormSubmit);
	
	function onFormSubmit(e){
		
		e.preventDefault();
        
	   var form = e.target,
		   APIkey = "APPID=b978d71282b6d09e267707cd3b0e098c",
           completeURL = form.action + generateURI(form) + APIkey;
        
            
        
		
            wrapper.innerHTML = "Loading..."

			var promise = new Promise(function(resolve, reject){
			var request = new XMLHttpRequest();

                request.open('GET', completeURL, true);
                request.send();
                wrapper.innerHTML = "Loading..";
                request.onreadystatechange = function(){
                    if(request.status === 200 && request.readyState === 4){
                        resolve(JSON.parse(request.responseText));
                  }else if(request.status === 502){
                    wrapper.innerHTML = "NOT FOUND"; 
                  }
            };
         });
        
	   promise.then(function(response){
        

        var output = "City: "+response.name+"<br>"+
                     "Country: "+response.sys.country+"<br>"+
                     "Temperature: "+convertToF(response.main.temp)+"<br>"+
                     "Humidity: "+response.main.humidity;
        
		wrapper.innerHTML = output;
           
        weatherForm.reset();
           
		
	   });
		
		console.log(completeURL);
		
		
	}
	
	function generateURI(form){
			var URI = "?q=",
				i = 0,
				len = form.length;
			
			for(i; i<len; i++){
				var currentInput = form[i];
				if(currentInput.name && currentInput.value){
					URI += currentInput.name + "=" + currentInput.value + "&";
				}
			}
			
			return URI;
		}
	
	
	function convertToF(temp){
		return Math.floor(temp*(9/5)-459.67);
	}
    
    
    
};