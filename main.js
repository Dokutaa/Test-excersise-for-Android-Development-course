// Ввод переменных
var baseVal = 60;

var clockTimer, 
	dateObj, 
	hrReadings, 
	minReadings, 
	secReadings, 
	milsec;

var readings = '';

var hr = 1, 
	min = 1, 
	tMin = 1, 
	sec = 0, 
	tSec = 0, 
	milsec = 0, 
	init = 0;

// Функция с рабочим алгоритмом
function startTimer() {

	var currentDateObj = new Date();

	var timeDiff = (currentDateObj.getTime() - dateObj.getTime()) - (sec*1000);

	if (timeDiff > 999) {
		sec++;
	}

	if (sec >= (min * baseVal)) {

		tSec = 0;
		min++;

	} else {

		tSec = parseInt((milsec / 100) + sec);

		if (tSec >= baseVal) {
			tSec = tSec - ((min - 1) * baseVal);
		}
	}

	if (min >= (hr * baseVal)) {

		tMin = 1;
		hr++;

	} else {

		tMin = parseInt((milsec / 100) + min);

		if (tMin >= baseVal) {
			tMin = tMin - ((hr - 1) * baseVal);
		}
	}

	milsec = Math.round(timeDiff / 10);

	if (milsec > 99) {
		milsec = 0;
	}

	if (milsec == 0) {
		milsec = '00';
	}

	if (milsec > 0 && milsec <= 9) {
		milsec = '0' + milsec;
	}

	if (tSec > 0) {

		secReadings = tSec;

		if (tSec < 10) {
			secReadings = '0' + tSec;
		}

	} else {
		secReadings = '00';
	}

	minReadings = tMin - 1;

	if (minReadings > 0) {

		if (minReadings < 10) {
			minReadings = '0' + minReadings;
		}

	} else {
		minReadings = '00';
	}

	hrReadings = hr - 1;

	if (hrReadings > 0) {

		if (hrReadings < 10) {
			hrReadings = '0' + hrReadings;
		}

	} else {
		hrReadings = '00';
	}

	readings = `${hrReadings}:${minReadings}:${secReadings}.${milsec}`;
	document.stopwatch.clock.value = readings;
	clockTimer = setTimeout("startTimer()", 1);
}

// Функция запуска и остановки секундомера
function startStop() {

	if (init == 0) {

		dateObj = new Date();

		clearClock();
		startTimer();

		document.stopwatch.startstopbtn.value = "Стоп";
		document.stopwatch.refreshbtn.disabled = true;

		init = 1;

	} else {

		clearTimeout(clockTimer);

		document.stopwatch.startstopbtn.value = "Старт";
		document.stopwatch.refreshbtn.disabled = false;

		init = 0;

	}
}

// Функция обнуления показаний
function clearClock() {

	clearTimeout(clockTimer);

	hr = 1;
	min = 1;
	tMin = 1;
	sec = 0;
	tSec = 0;
	milsec = 0;
	readings = '00:00:00.00';
	init = 0;

	document.stopwatch.clock.value = readings;
	document.stopwatch.startstopbtn.value = "Старт";
}