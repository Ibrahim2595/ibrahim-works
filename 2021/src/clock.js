function showTime(){
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;

    var time = h + ":" + m + " " + " " + "LocalTime";
    document.getElementById("MyClockDisplay2").innerText = time;
    document.getElementById("MyClockDisplay2").innerContent = time;

    setTimeout(showTime, 1000);
}

showTime();

