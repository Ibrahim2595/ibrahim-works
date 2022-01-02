function showTime(){
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;

    var time = h + ":" + m;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").innerContent = time;

    setTimeout(showTime, 1000);
}

showTime();



