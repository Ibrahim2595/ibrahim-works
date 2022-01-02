function calcTime() {

    // create Date object for current location
    d = new Date();
   
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
   
    // create new Date object for different city
    // using supplied offset
    nd = new Date(utc + (3600000*-5));


    var h = nd.getHours();
    var m = nd.getMinutes();

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;

    var time = h + ":" + m + " " + " "+ "EST";
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").innerContent = time;

    setTimeout(calcTime, 1000);

    // // return time as a string
    // return "The local time in " + city + " is " + nd.toLocaleString();


}

calcTime();

