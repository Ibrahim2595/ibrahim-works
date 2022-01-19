function showTime(){
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;

    var time = h + ":" + m + " " + " " + "LocalTime";




    // CONVERT TO UTC
    utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    // EST
    nd = new Date(utc + (3600000*-5));

    var ESTh = nd.getHours();
    var ESTm = nd.getMinutes();

    ESTh = (ESTh < 10) ? "0" + ESTh : ESTh;
    ESTm = (ESTm < 10) ? "0" + ESTm : ESTm;

    var ESTtime = ESTh + ":" + ESTm + " " + " "+ "EST";
    
    var combinedTime =  ESTh + ":" + ESTm + " " + " "+ "EST" + '\n' + h + ":" + m + " " + " " + "LocalTime";



    if (ESTh == h && ESTm == m){
        document.getElementById("MyClockDisplay2").innerText = ESTtime;
        document.getElementById("MyClockDisplay2").innerContent = ESTtime;
    } else {  
        document.getElementById("MyClockDisplay2").innerText = combinedTime;
        document.getElementById("MyClockDisplay2").innerContent = combinedTime; 
    }
    

    setTimeout(showTime, 1000);
}

showTime();

