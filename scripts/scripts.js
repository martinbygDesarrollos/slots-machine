const SLOTS_PER_REEL = 12;
const SOUND_CONFETTI = "sounds/Confetti.mp3";
const SOUND_WIN = "sounds/Win.mp3";
const SOUND_SPIN_100RINGS = "sounds/Spin_100.mp3";
const SOUND_SPIN_010RINGS = "sounds/Spin_010.mp3";
const SOUND_SPIN_001RINGS = "sounds/Spin_001.mp3";
const SOUND_SPIN_101RINGS = "sounds/Spin_101.mp3";
const SOUND_SPIN_110RINGS = "sounds/Spin_110.mp3";
const SOUND_SPIN_011RINGS = "sounds/Spin_011.mp3";
const SOUND_SPIN_111RINGS = "sounds/Spin_111.mp3";
// const SLOTS_PER_REEL = 12;

var MEDIAS_LENGTH = 13;
var PINTAS_LENGTH = 61;
var REMERAS_LENGTH = 10;
var BUZOS_LENGTH = 3;
var GORROS_LENGTH = 13;

// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
console.log(Math.round( ( 120 / 2) / Math.tan( Math.PI / 12 ) )); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 150;

function createSlots (ring) {
	
	var slotAngle = 360 / SLOTS_PER_REEL;

	// var seed = getSeed();

	for (var i = 0; i < SLOTS_PER_REEL; i ++) {
		var slot = document.createElement('div');
		
		slot.className = 'slot';

		// compute and assign the transform for this slot
		var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

		slot.style.transform = transform;
		slot.style.display = "flex";
		slot.style.alignItems = "center";
		slot.style.justifyContent = "center";

		// var content = $(slot).append('<p>' + ((seed + i)%12)+ '</p>');
		// var content = $(slot).append('<p>' + ((i + 4)%12)+ '</p>');

		// var content = $(slot).append('<p>' + (i)+ '</p>');
		var content = $(slot).append('<img src="images/' + (i)+ '.png" style="width:80px; height: 60px"></img>');
        
		// add the poster to the row
		ring.append(slot);
	}
}


// Initialize an empty array to store the numbers
var numbersArray = [];
var gorrosArray = []; // lenght 13
var buzosArray = []; // lenght 3
var remerasArray = []; // lenght 10
var pintasArray = []; // lenght 61
var mediasArray = []; // lenght 13

// Shuffle numbersArray
shuffleArray(numbersArray);

// Function to randomly select and remove an index from the array
function getRandomIndexAndRemove() {
    // Check if there are indices left in the array
    if (numbersArray.length === 0) {
        return "000"; // If the array is empty, return null
    }
    // Generate a random index within the range of the array length
    var randomIndex = Math.floor(Math.random() * numbersArray.length);
    // Remove the selected index from the array and store its value
    var selectedNumber = numbersArray.splice(randomIndex, 1)[0];
    return selectedNumber;
}

// function getSeed() {
// 	// generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
// 	return Math.floor(Math.random()*(SLOTS_PER_REEL));
// }

function spin(timer) {
    let oldClass1 = $('#ring1').attr('class');
    let oldClass2 = $('#ring2').attr('class');
    let oldClass3 = $('#ring3').attr('class');
    let digits = [0,0,0];
    let digitsNew = [0,0,0];
    if(oldClass1.length > 4) {
        digits[0] = parseInt(oldClass1.slice(10));
        digits[1] = parseInt(oldClass2.slice(10));
        digits[2] = parseInt(oldClass3.slice(10));
    } else {
        digits[0] = 0;
        digits[0] = 0;
        digits[0] = 0;
    }
    
    var seed = getRandomIndexAndRemove().toString();
    // updateStore();
    if(seed.length < 3)
        seed = "0" + seed;
        if(seed.length < 3)     
            seed = "0" + seed;
    
    // Get the second digit by accessing the character at index 1 (since indexing starts from 0)
    digitsNew[0] = parseInt(seed[0]);
    digitsNew[1] = parseInt(seed[1]);
    digitsNew[2] = parseInt(seed[2]);
    
    // console.log("digits: " + digits[0] + " " + digits[1] + " " + digits[2]);
    console.log(seed);
    for(var i = 1; i < 4; i ++) {
        $('#ring'+i)
        .css('animation','back-spin 1s, spin-' + digitsNew[i-1] + ' ' + (timer + i*0.5) + 's')
        .attr('class','ring spin-' + digitsNew[i-1]);
    }

    if (digits[0] != seed[0] && digits[1] != seed[1] && digits[2] != seed[2]){ // 111
        play(SOUND_SPIN_111RINGS);
    } else if (digits[0] != seed[0] && digits[1] != seed[1] && digits[2] == seed[2]){ // 110
        play(SOUND_SPIN_110RINGS);
    } else if (digits[0] != seed[0] && digits[1] == seed[1] && digits[2] != seed[2]){ // 101
        // Add your action for this combination
        play(SOUND_SPIN_101RINGS);
    } else if (digits[0] != seed[0] && digits[1] == seed[1] && digits[2] == seed[2]){ // 100
        // Add your action for this combination
        play(SOUND_SPIN_100RINGS);
    } else if (digits[0] == seed[0] && digits[1] != seed[1] && digits[2] != seed[2]){ // 011
        // Add your action for this combination
        play(SOUND_SPIN_011RINGS);
    } else if (digits[0] == seed[0] && digits[1] != seed[1] && digits[2] == seed[2]){ // 010
        // Add your action for this combination
        play(SOUND_SPIN_010RINGS);
    } else if (digits[0] == seed[0] && digits[1] == seed[1] && digits[2] != seed[2]){ // 001
        // Add your action for this combination
        play(SOUND_SPIN_001RINGS);
    }

    console.log('=====');
    return seed;
}



$(document).ready(function() {
    llenarArrays();
    const jsConfetti = new JSConfetti()
    if(localStorage.getItem('numbersArray') !== null)
        numbersArray = JSON.parse(localStorage.getItem('numbersArray'));
    if(localStorage.getItem('gorrosArray') !== null)
        gorrosArray = JSON.parse(localStorage.getItem('gorrosArray'));
    if(localStorage.getItem('remerasArray') !== null)
        remerasArray = JSON.parse(localStorage.getItem('remerasArray'));
    if(localStorage.getItem('buzosArray') !== null)
        buzosArray = JSON.parse(localStorage.getItem('buzosArray'));
    if(localStorage.getItem('mediasArray') !== null)
        mediasArray = JSON.parse(localStorage.getItem('mediasArray'));
    if(localStorage.getItem('pintasArray') !== null)
        pintasArray = JSON.parse(localStorage.getItem('pintasArray'));
	// initiate slots 
 	createSlots($('#ring1'));
 	createSlots($('#ring2'));
 	createSlots($('#ring3'));
    
    updateInfo();

    console.log("REMERAS: " + remerasArray.length + " BUZOS: " + buzosArray.length + " GORROS: " + gorrosArray.length + " MEDIAS: " + mediasArray.length + " PINTAS: " + pintasArray.length)
 	
    // hook start button
 	$('.go').on('click',function(){
        // Disable the button
        $(this).prop('disabled', true);
 		var timer = 2;
 		var result = spin(timer);
        console.log(result);
        console.log(parseInt(result))
        // Enable the button after 3.5 seconds
        setTimeout(function() {
            if(numbersArray.length > 0)//{
                //Game over
                $('.go').prop('disabled', false);
            // } else {
                // console.log("HOLA HOLA")
                let prize  = won(parseInt(result));
                updateStore();
                if(prize != false){
                    switch(prize){
                        case 'buzo':
                            prize = 'UN BUZO CANGURO';
                            break;
                        case 'pinta':
                            prize = 'UNA PINTA DE CERVEZA';
                            break;
                        case 'remera':
                            prize = 'UNA REMERA';
                            break;
                        case 'gorro':
                            prize = 'UN GORRO JAMESTON';
                            break;
                        case 'medias':
                            prize = 'UNAS MEDIAS JAMESTON';
                            break;
                        default:
                            break;
                    }
                    play(SOUND_CONFETTI);
                    play(SOUND_WIN);
                    console.log("ganaste!")
                    $('#message').html('<p> ¡GANASTE ' + prize + '!</p>');
                    $('#message p').css('color','#fff021');
                    jsConfetti.addConfetti({
                        emojis: ['🍺', '🍀', '☘️', '🍻', '🍾'],
                        emojiSize: 30,
                        confettiNumber: 200,
                    })
                } else {
                    $('#message').html('<p> ¡MÁS SUERTE LA PROXIMA VEZ!  </p>');
                    $('#message p').css('color','#ff4221')
                    console.log("Sigue intentando!")
                }
                updateInfo();
            // }
        }, 3500);
 	})
 });
$(document).keydown(function(event) {
    // Check if the pressed key is either space or enter
    if (event.keyCode === 32 || event.keyCode === 13) {
        // This block of code will be executed when space or enter is pressed
        if(!$('.go').prop('disabled'))
            $('.go').click();
    }
});

function won(numberToFind){
    // console.log("updating informacion")
    const buzosIndex = buzosArray.indexOf(numberToFind);
    if (buzosIndex !== -1) {
        buzosArray.splice(buzosIndex, 1);
        return 'buzo';
    }

    // Check pintasArray
    const pintasIndex = pintasArray.indexOf(numberToFind);
    if (pintasIndex !== -1) {
        pintasArray.splice(pintasIndex, 1);
        return 'pinta';
    }

    // Check remerasArray
    const remerasIndex = remerasArray.indexOf(numberToFind);
    if (remerasIndex !== -1) {
        remerasArray.splice(remerasIndex, 1);
        return 'remera';
    }

    // Check gorrosArray
    const gorrosIndex = gorrosArray.indexOf(numberToFind);
    if (gorrosIndex !== -1) {
        gorrosArray.splice(gorrosIndex, 1);
        return 'gorro';
    }

    // Check mediasArray
    const mediasIndex = mediasArray.indexOf(numberToFind);
    if (mediasIndex !== -1) {
        mediasArray.splice(mediasIndex, 1);
        return 'medias';
    }

    return false;
}

function llenarArrays(){
    numbersArray = []
    // Populate numbersArray with numbers from 0 to 400
    for (var i = 0; i < 400; i++) {
        numbersArray.push(i+1);
    }

    // Shuffle numbersArray
    shuffleArray(numbersArray);

    // Assign unique indices to each array
    for (var i = 0; i < numbersArray.length; i++) {
        if(gorrosArray.length < GORROS_LENGTH)
            gorrosArray.push(numbersArray[i]);
        else 
        {
            if(buzosArray.length < BUZOS_LENGTH)
                buzosArray.push(numbersArray[i]);
            else 
            {
                if(remerasArray.length < REMERAS_LENGTH)
                    remerasArray.push(numbersArray[i]);
                else 
                {
                    if(pintasArray.length < PINTAS_LENGTH)
                        pintasArray.push(numbersArray[i]);
                    else 
                    {
                        if(mediasArray.length < MEDIAS_LENGTH)
                            mediasArray.push(numbersArray[i]);
                    }
                }
            }
        }
    }  
}
// Function to shuffle an array (Mezclo el array)
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function updateInfo(){
    let aciertos = parseInt((REMERAS_LENGTH + BUZOS_LENGTH + PINTAS_LENGTH + GORROS_LENGTH + MEDIAS_LENGTH) - (remerasArray.length + buzosArray.length + pintasArray.length + gorrosArray.length + mediasArray.length));
    $('#info').html('<p> INTENTOS RESTANTES: ' + numbersArray.length +  
    '<br>REMERAS: ' + remerasArray.length +  
    '<br>BUZOS: ' + buzosArray.length +  
    '<br>PINTAS: ' + pintasArray.length +  
    '<br>GORROS: ' + gorrosArray.length+  
    '<br>MEDIAS: ' + mediasArray.length + 
    '<br>ACIERTOS: ' + aciertos + 
    '<br>FALLOS: ' + parseInt(400 - numbersArray.length - aciertos) + 
    '<br>PROBABILIDADES DE EXITO: ' + parseInt((remerasArray.length + buzosArray.length + pintasArray.length + gorrosArray.length + mediasArray.length) * 100 / numbersArray.length) + '%' +
    '</p>');
}

function play(audio) {
    var audio = new Audio(audio);
    audio.play();
}

function reiniciar(){
    llenarArrays();
    localStorage.setItem('numbersArray', JSON.stringify(numbersArray));
    localStorage.setItem('gorrosArray', JSON.stringify(gorrosArray));
    localStorage.setItem('remerasArray', JSON.stringify(remerasArray));
    localStorage.setItem('buzosArray', JSON.stringify(buzosArray));
    localStorage.setItem('mediasArray', JSON.stringify(mediasArray));
    localStorage.setItem('pintasArray', JSON.stringify(pintasArray));
    // Reload the current page
    location.reload();
}

function updateStore(){
    localStorage.setItem('numbersArray', JSON.stringify(numbersArray)); 
    localStorage.setItem('gorrosArray', JSON.stringify(gorrosArray)); 
    localStorage.setItem('remerasArray', JSON.stringify(remerasArray)); 
    localStorage.setItem('buzosArray', JSON.stringify(buzosArray)); 
    localStorage.setItem('mediasArray', JSON.stringify(mediasArray)); 
    localStorage.setItem('pintasArray', JSON.stringify(pintasArray)); 
}