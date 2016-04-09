/*
	Title / Purpose: Control ATX power supply to run a landscape light
	Author: Will.allen%%gmail.com
	TODO: 
		rename global variables (or put into a hashmap?)
		implement reset / deepsleep?
	Created: April 2016
	Modified:
	REQUIRED:  Must have set all wifi properties manually on your Esprunio (tested on version 1.84)
*/

var nPageLoads = 0;
var sVersion = 'V18 (2016-04-09) - by Will Allen';
var weather = {};
var sWeather = "";
var SURLAPI = 'http://api.wunderground.com/api/13db05c35598dd93/astronomy/q/va/vienna.json';
var fIsOn = false;
var nMilisPerHour = 3600000;
var durationForLights = 5;  //hours
var nSleepToDateMillis = 0;
var sMode = "nothing";
var PINOUT = D4;
var favicon = "\x89PNG\r\n\32\n\0\0\0\rIHDR\0\0\0\20\0\0\0\20\10\3\0\0\0(-\17S\0\0\0\1sRGB\0\xae\xce\34\xe9\0\0\0\4gAMA\0\0\xb1\x8f\13\xfca\5\0\0\3\0PLTE\r\16\t\20\23\13\20\22\14\21\25\14\24\25\r\21\32\16\26\21\21\34\25\24\27%\16\30'\17\31&\20 \n\16&\t\17#\23\21%\23\21%\26\23 \30\20%\37\25#\34\30$\34\30'\35\31$\35\33(\26\23,\26\23+\33\26/\34\25(\37\x1b6\33\x1b6\36\33!(\26.#\33/%\33/&\34(.\30-(\35.*\36\"6\24 9\27!;\32)6\x182%\x1c2$\x1f6 \x194$\x1f2)\37;!\339#\33+\"!1. 9)\"8,\"<( =/\"64\":4#<5'?7'>7(>8&>;*?>.*A\33;C%A\6\24G\10\25E\14\27Q\5\27R\6\30W\n\33F%\35B) G-\"D/)I* L-#E4&E4'F7)C>&H<+R/%Y/*Q2&S7+U5(P8)T=)]3)X:+^:-\\>.\\>/S?4Z=0`\n\35b\13\37k\7\37i\13\37\x7f\13%v\23+}\22(}\31*d 'a:.m01j?4x'1r;0AA$KA1O@0NI6LN6OO=XA/PB6WH<UH=YB3^B7\\E4]F6\\K6]M?RT<TS>YS=YS>b@1cD3dA2fC6eF6gG9fN=nC3nB4kF8lA9iH7oJ;oH>oN9oN;dR?hS<rC8qF9qN:uH9tJ:wJ<yH9zL=tS>_N@_NAR^A_`F^hJbO@cQBfXJhR@kZEi\\Bj\\Gm[Gm_KuLAqR@vQAuVEs^LvZHv_JyQA~TB}UEyXG\x7fZF|\\D\x7f]Gy]I~[H}\\I\x7f]JfeGkaEkfMlcJlpRpeLqdNucLufN\x7f`K}dLqoSwjRxeTyiV{kTzlRrtUzrTyuX{~\\\x9f\13.\x9c=:\xa3\n/\xaf%>\x9a3A\xac @\x83P@\x82QB\x83RD\x85UC\x84UD\x83WH\x82ZF\x87_J\x89WG\x8dVA\x8fWG\x8c\\G\x8dZI\x8fZJ\x97^J\x98_K\x83dO\x80iN\x8adK\x8dbM\x8ceN\x83gV\x81nQ\x8bjS\x8fiW\x8elQ\x87vW\x80vY\x88wY\x92`L\x83q`\xa2@I\xbecd\x96\x81`\x94\x95e\xa8\x88t\xb4\x87i\xa4\xae\x80\xce\xa5\x89\0\0\0\0\0\0\0\0\0\6\xbbW\xcf\0\0\0\tpHYs\0\0\16\xc3\0\0\16\xc3\1\xc7o\xa8d\0\0\0\30tEXtSoftware\0paint.net 4.0.9l3~N\0\0\1\33IDAT(S\1\20\1\xef\xfe\0iQ\34\32c\xd2\xd3\xf5hf\xd5jdbaD\x001\\\xa1\xfb\xf6\xdb\xf0\xec\xe7\x92\xd4\xd0`B^\13\x002\x9ct\xf8\xef\x84\xb8\xb9xL3eC?@\14\0us{\xed\x8b\x81[K86\"\33_A\27\4\0\xc1\xa5\xf7\xb4\x8c\xdd\x9a\x91\xbc\xbb|0\20\0\0\2\0\xc9\xa7\xaeTR\x87\xb1\xc5\xcd\xcf\xccp\35\5\1\3\0\xf4\xc8\xeb\x83J\x98\xd9\xba\xcb\xce\xcc\x9e!\t\10\n\0\xa2\x9b\xacgI\xd6\xd7\x85\xa3\xc7\x7fo5'$&\0\25\23]gW\xe3\xd8Hw\xc2<q:>=%\0\7\24SEk\xe4\xf3\xb7\xaf\xe6\xbf\xc6mzlN\0\22\36\x80*P\x88\xe5\xe9\xc4\xb2\xc0\xc37v\x8f\xe8\0\6)\xab\31\17\26\xe0\xde\x93\x8a\x90\xa4#\xa0\x94\xea\0/+\x89F\r\16\x99\xda\xdc\xb3\xbe9\21M\x8e\xb6\0\xe1\30GZ.-\x97\x95\x96\xaa~ \37\x86V4\0\xdf\xee\xf9YX\x82\xb0\xa9\x8d\xa6},(U\xb5n\0\xd1\xe2\xfc\xfa\xf2\xf1\xca\xad\xa8\xbd\x9f\x9d;Ory\xd38}\xbaL&\xc45\0\0\0\0IEND\xaeB`\x82";
var dBootTime = new Date();
var nMaxRetriesForGetInitDate = 30;

function onInit()
{
	setTimeout(initializeLightingSystem, 5500);
	setTimeout(getWeather, 30000);  //wait o call out and get latest weather
}

function initializeLightingSystem()
{
	setMode("initializing System", 2000);
	require("ESP8266").setCPUFreq(80);	//save power?
	setPin(false);	//turn off the light
	setSnTP();	//set the time server (not actually used?)
	startWebserver();
	dBootTime = new Date();
}


function setSnTP()
{
	var sHost = 'us.pool.ntp.org';
	console.log("set SNTP:" + sHost);
	require("Wifi").setSNTP(sHost, -5);
	setTimeout(setBootTime, 5000);
}

//set the initialization time, but has to be after the NTP is successful
function setBootTime()
{
	var systDate = new Date();
	if(systDate.getFullYear() < 2000 && nMaxRetriesForGetInitDate-- > 0)
	{
		setTimeout(setBootTime, 5000);
	}
	else
	{
		nMaxRetriesForGetInitDate = 30;
		dBootTime = systDate;
	}
}

function startWebserver()
{
 // require("Wifi").setSNTP('us.pool.ntp.org', -5);
  console.log("startWebserver");
  require("http").createServer(getPage).listen(80);  
}

//populate the weather variable with the sunset, etc
function getWeather()
{
  setMode("getting Weather", 2000);
  require("http").get(SURLAPI, function(res) 
   {
    res.on('data', function(wunderString) {
      sWeather += wunderString;
    });
    res.on('close', function(wunderString) {
      console.log("Connection to wunder closed");
      //console.log("HTTP> "+data);
      //weather = JSON.parse( wunderString);
      //var q = wunderString.replace("\n", " " );
      //console.log(">>>>" + wunderString + "<<<<");
      weather = JSON.parse( sWeather);
      sWeather = "";
      sleepTilSunset();	//wait until you get the weather, then sleep until the sunset
    });
  });
  //what to do if didnt get?
}

function sleepTilSunset()
{
      try  //try due to possibility weather didnt get loaded.
      {
        //if sunset is still coming (ignore minutes)
		var nHoursTilSunset = weather.moon_phase.sunset.hour - weather.moon_phase.current_time.hour; 
        if(nHoursTilSunset > 0)
        {
			//add 15 minutes from sunset
			var nMinutesTilSS = weather.moon_phase.sunset.minute - weather.moon_phase.current_time.minute + 15;
			var nSleepTime = (nHoursTilSunset*nMilisPerHour) + (nMinutesTilSS*60000);
			setMode("sleeping until sunset", "Turn on lights", nSleepTime);
			setTimeout(turnOnLights, nSleepTime);
        }
		//should lights be on?
        else if((nHoursTilSunset + durationForLights) > 1)
        {
			turnOnLights();
        }
		else
		{
            //its already after dark, so turn off the lights
            turnOffLights();
		}
      }
      catch(e)
      {
		console.log("there was an issue reading the weather data:" + e);
        //try using the system time
		var nSystemSleepTime= getMillisTilSunsetFromSystem();
		if(nSystemSleepTime > 0)
		{
			setMode("sleeping until sunset (manual)", "Turn on lights", nSystemSleepTime);
			setTimeout(turnOnLights, nSystemSleepTime);
		}
		else  //even system time didnt work, so try again in 12 hrs
		{
			turnOffLights("sys and wunder fail");
		}
      }
}

function turnOnLights()
{
  setPin(true);
  var nMilisForLights = durationForLights*nMilisPerHour
  setMode("after sunset, running lights", "Turn off Lights", nMilisForLights);
  setTimeout(turnOffLights, (nMilisForLights));
}

function turnOffLights(sMessage)
{
  setPin(false);
  var nSleepTilMorning = (12*nMilisPerHour);
  setMode(("Lights off" + (sMessage ? sMessage : "")), "Get Weather", nSleepTilMorning);
  setTimeout(getWeather, nSleepTilMorning);
}

function dateString(a_dDate)
{
	var aMonths = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
	return aMonths[a_dDate.getMonth()] + " " + a_dDate.getDate() + " " + (a_dDate.getHours()) + ":" + a_dDate.getMinutes();
}

function setMode(a_sMode, a_sNext , a_sSleepDuration)
{
  //set global variable with the date that next action happens
  var nSleepToDateMillis = (new Date()).getTime() + a_sSleepDuration;
  // set global variable indicating what system is currently doing
  sMode = dateString(new Date()) + ": " + a_sMode + " (Next action: " +a_sNext + " " + (dateString(new Date(nSleepToDateMillis))) + ')';
  //log out what is going on
  console.log(sMode); 
}

function setPin(fSet)
{
  fIsOn = fSet;
//; digitalWrite(D4, 255); for(var x=0; x < 5000; x++){digitalWrite(D4, 0)}; digitalWrite(D4, 255);
  pinMode(PINOUT, "output"); 
  if(fIsOn)
  {
      //pull low to turn on
      digitalWrite(D4, 0);
  }
  else
  {
    digitalWrite(D4, 255);  
  }
}
//event for webserver
function getPage(req,res) 
{
  console.log("URL requested: " + req.url);
  switch(req.url)
  {
    case "/favicon.ico":
      {
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.write(favicon);
		res.end();
		return;
        break;
      }
     case "/on":
      {
        setPin(true);
        break;
      }
      case "/off":
      {
        setPin(false);
		break;
      }
      case "/toggle":
      {
        setPin(!fIsOn);
		break;
      }
	   case "/reset":
      {
        getWeather();
		break;
      }
	}
	var sContent = "<h2>Welcome to landscape light timer ("+sVersion+")</h2>";
	sContent +="<ul>";
	sContent += '<li><b>System time</b>: ' + dateString(new Date());
	sContent += '<li><b>Status</b>:' + sMode;
	sContent += '<li><b>Light</b> is ' + (fIsOn ? "ON" : "OFF");

	try
	{
		sContent += "<li><b>Sunset data was loaded</b>: " + weather.moon_phase.current_time.hour 
			+ ":" + weather.moon_phase.current_time.minute + "</li>";
		sContent += "<li><b>Sunset</b>: " + weather.moon_phase.sunset.hour 
			+ ":" + weather.moon_phase.sunset.minute + "</li>";
	}
	catch(e)
	{
		sContent += "<li><b>Issue loading the weather data or not yet available</b>";
	}
	if(req.url == "/status")
	{
		sContent += '<li><b>WebPage loads</b>:' + (nPageLoads++)
		//sContent += '<li><b>Init called</b>:' + "";
		sContent += '<li><b>Boot Time</b>:' + dBootTime.toUTCString();
		sContent += '<li><b>ESP debug:</b>'+(JSON.stringify((require("ESP8266").getState())))+'</ul>';
	}
	sContent +="</ul>";
	sContent += '<table style="width:90%"><tr>'
	sContent += '<td><button type="button" onclick="document.location=\'/on\'">Lights On</button></td>';
	sContent += '<td><button type="button" onclick="document.location=\'/off\'">Lights Off</button></td>';
	sContent += '<td><button type="button" onclick="document.location=\'/toggle\'">Toggle</button></td>';
	sContent += '<td><button type="button" onclick="document.location=\'/status\'">Status</button></td>';
	sContent += '</tr></table>'
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<html><body>'+ sContent +'</body></html>');
	res.end();
}

function getMillisTilSunsetFromSystem()
{
	var dSysDate = new Date();
	var nMillis = -1;  // -1 means sunset has either passed, or system time not set
	if(dSysDate.getFullYear() > 2000)
	{
		//ignore DST
		var aSunsetTimesForMonth = [17,18,18, 18, 19, 19,19,19,18,18,18,17 ];
		var nCurrentHour = dSysDate.getHours();
		var nSunsetTime = aSunsetTimesForMonth[dSysDate.getMonth()];
		if(nCurrentHour < nSunsetTime)
		{
			nMillis = nMilisPerHour * (nSunsetTime -nCurrentHour );
		}
	}
	else  //sysdate not set, so nothing we can do!
	{
		console.log("Unable to get system date: " + dSysDate.toUTCString());
	}
	return nMillis;
}

onInit();

//onloadinit();

//E.on('init', onInit);

//     onInit();
