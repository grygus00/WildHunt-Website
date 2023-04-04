
let music = document.querySelector('#gameMusic');
music.volume = 0.1;
// _________________start the GAME _________________
let startScreen = document.querySelector("#start");
let startSkyMoving = document.querySelector("#game_sky");
let bgDark = document.querySelectorAll(".black_bord");
let timeS;
let myTimeout;
let timeContainer = 0;

let game_bg = document.querySelector("#game_bg");
let game_mg = document.querySelector("#game_mg");
let game_fg2 = document.querySelector("#game_fg2");
let game_fg1_grass = document.querySelector("#game_fg1_grass");
let game_fg1_tree = document.querySelector("#game_fg1_tree");



let eliteScreenAction = document.querySelector("#eliteScreen");
let wonScreenAction = document.querySelector("#wonScreen");
let loseScreenAction = document.querySelector("#loseScreen");
let cruelScreenAction = document.querySelector("#cruelScreen");
let hideStartScreen = document.querySelector("#start_interface");
let showInstructions = document.querySelector("#instruction_interface");



let points;
//DEFINE DOG
let myDog = document.querySelector("#game_dog_sprite");
myDog.addEventListener("click", shootDog);
//DEFINE DUCK
let shootDuck = document.querySelector("#game_duck");
let shootDuckSprite = document.querySelector("#game_duck_sprite");
//DEFINE DUCK2
let shootDuck2 = document.querySelector("#game_duck2");
let shootDuckSprite2 = document.querySelector("#game_duck_sprite2");

//SHOOT THE DUCK + ANIMATE + ADD POINT
shootDuckSprite.addEventListener("click", clickGoodObjectDuck);
shootDuckSprite2.addEventListener("click", clickGoodObjectDuck2);
//RESTART DUCK ANIMATION WHEN IT FINISHED
shootDuckSprite.addEventListener("animationiteration", resetDuckIteration);
shootDuckSprite2.addEventListener("animationiteration", resetDuckIteration2);



//DEFINE DISC
let shootDisc = document.querySelector("#game_disc");
let shootDiscSprite = document.querySelector("#game_disc_sprite");
//DEFINE DISC2
let shootDisc2 = document.querySelector("#game_disc2");
let shootDiscSprite2 = document.querySelector("#game_disc_sprite2");

//SHOOT THE DISC + ANIMATE + ADD POINT
shootDiscSprite.addEventListener("click", clickBadObjectDisc);
shootDiscSprite2.addEventListener("click", clickBadObjectDisc2);
//RESTART DISC ANIMATION WHEN IT FINISHED
shootDiscSprite.addEventListener("animationiteration", resetDiscIteration);
shootDiscSprite2.addEventListener("animationiteration", resetDiscIteration2);





//DEFINE RABBIT
let shootRabbitSprite = document.querySelector("#game_rabbit_sprite");
let shootRabbit = document.querySelector("#game_rabbit");
//SHOOT THE RABBIT + ANIMATE + ADD POINT
shootRabbitSprite.addEventListener("click", clickGoodObjectRabbit);
//RESTART Rabbit ANIMATION WHEN IT FINISHED
shootRabbitSprite.addEventListener("animationiteration", resetRabbitIteration);

let showPoints = document.querySelector("#pointscontainer_h2");

// DEFINE BUTTON OPTIONS
let options_button = document.querySelector("#options_button");
let options_button_click = document.querySelector("#option");
//lives COUNTER
let lives;
// let img = document.createElement("img");
let src = document.querySelector("#heartcontainer");


let startTheGame = document.querySelector("#start_b_1");
startTheGame.addEventListener("click", startGame);
let startTheGame2 = document.querySelector("#start_b_2");
startTheGame2.addEventListener("click", startGame);
// startTheGame.addEventListener("click", console.log("CLICK1"));
let showTheInstructions = document.querySelector("#instruction_b_1");
showTheInstructions.addEventListener("click", showInstructionsScreen);


let startButton1 = document.querySelector("#start_button");
let instructiontButton1 = document.querySelector("#instruction_button");



function sunSetAdd() {
    game_bg.classList.add("sun_down");
    game_mg.classList.add("sun_down");
    game_fg2.classList.add("sun_down");
    game_fg1_grass.classList.add("sun_down");
    game_fg1_tree.classList.add("sun_down");
    // shootDuckSprite.classList.add("sun_down");
    // shootRabbitSprite.classList.add("sun_down");
    // shootDisc.classList.add("sun_down");

}
function sunSetRemove() {
    game_bg.classList.remove("sun_down");
    game_mg.classList.remove("sun_down");
    game_fg2.classList.remove("sun_down");
    game_fg1_grass.classList.remove("sun_down");
    game_fg1_tree.classList.remove("sun_down");
    // shootDuckSprite.classList.remove("sun_down");
    // shootRabbitSprite.classList.remove("sun_down");
    // shootDisc.classList.remove("sun_down");

}
//=================================================================================================================
var Timer = function (callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function () {
        window.clearTimeout(timerId);
        timerId = null;
        remaining -= Date.now() - start;
    };

    this.resume = function () {
        if (timerId) {
            return;
        }

        start = Date.now();
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
};

// supporting code

let timer;

//=================================================================================================================
function startGame() {
    shootSound();
    // timeS = 30000;
    // myTimeout = setTimeout(gameOver, timeS);
    // console.log(timeS);

    timer = new Timer(() => {
        gameOver();
    }, 30000)

    //Hide BUTTONS
    startButton1.classList.add("hide");
    instructiontButton1.classList.add("hide");
    //SHOW OPTIONS BUTTON
    options_button.classList.remove("hide");
    // SHOW ANIMALS
    document.querySelector('#animals').classList.remove('hide');
    // START SCREEN OPACITY
    eliteScreenAction.classList.add("hide");
    startScreen.classList.add("startOpacity");
    wonScreenAction.classList.add("hide");
    loseScreenAction.classList.add("hide");
    cruelScreenAction.classList.add("hide");
    showInstructions.classList.add("hide");


    resetDuckIteration();
    resetDuckIteration2();
    resetRabbitIteration();
    resetDiscIteration();
    resetDiscIteration2();
    //MOVE SKY
    startSkyMoving.classList.add("skyMove");
    sunSetAdd();
    //Time animation
    document.querySelector("#timecontainer").classList.remove("hide");

    //RESET STATS EVERY ROUND
    points = 0;
    ammo = 10;
    lives = 3;

    // REMOVE BG BLUR & DARKER

    for (i = 0; i < bgDark.length; i++) {
        bgDark[i].classList.remove('black_bord');
    }





    // SHOWING THE HEARTS WHEN THE GAME STARTS
    for (let i = lives; i > 0; i--) {
        // console.log("heart");
        src.innerHTML = src.innerHTML + "<img src=\"images/Stats/Heart_1.svg\">";
    }



    // SHOWING THE AMMO WHEN THE GAME STARTS
    for (let i = ammo; i > 0; i--) {
        // console.log("ammo");
        srcAmmo.innerHTML = srcAmmo.innerHTML + "<img src=\"images/Stats/Ammo.svg\">";
    }

    // SHOWING POINTS WHEN THE GAME STARTS
    showPoints.textContent = `Points: ${points}`;


}

function shootSound() {
    let shootSound = document.querySelector('#shoot_sound');
    shootSound.play();
    shootSound.volume = 0.15;
    shootSound.currentTime = 0;
}
// _________________ DECREASE AMMO _________________
let ammo = 10;
let srcAmmo = document.querySelector("#ammocontainer");

//munusAmmo function
function minusAmmo() {
    shootSound();
    ammo--;
    // console.log("THIS IS AMMO" + ammo);

    srcAmmo.innerHTML = "";
    for (let i = ammo; i > 0; i--) {
        // console.log("ammo");
        srcAmmo.innerHTML = srcAmmo.innerHTML + "<img src=\"images/Stats/Ammo.svg\">";
    }

    if (ammo == 0) {
        gameOver();
    }

}
// _________________ CLICK DUCK OBJECT _________________

let random_pos_number;
let random_ani_number;

function resetDuck1() {

    shootDuck.classList.add("duck_falling_anim");
    shootDuckSprite.classList.remove("duck_flying_img");
    shootDuckSprite.classList.add("duck_falling_img");
    setTimeout(resetDuck2(), 2000);

    //AFTER 2S DELITE FALLING IMAGE

}
function resetDuck12() {


    shootDuck2.classList.add("duck_falling_anim");
    shootDuckSprite2.classList.remove("duck_flying_img_2");
    shootDuckSprite2.classList.add("duck_falling_img_2");
    setTimeout(resetDuck22(), 2000);
    //AFTER 2S DELITE FALLING IMAGE

}

function resetDuck2() {
    random_pos_number = getARandomNumber(14);
    random_ani_number = getARandomNumber(4);

    setTimeout(() => {
        shootDuckSprite.classList.value = "";
        shootDuck.classList.value = "";
        shootDuckSprite.offsetWidth;
        shootDuckSprite.classList.add("duck_position_l");
        shootDuckSprite.classList.add("duck_flying_img");
        shootDuckSprite.classList.add("duck_animation_l" + random_ani_number);
        shootDuck.classList.add("duck_position" + random_pos_number);
    }, "2000")
}

function resetDuck22() {
    random_pos_number = getARandomNumber(14);
    random_ani_number = getARandomNumber(4);

    setTimeout(() => {
        shootDuckSprite2.classList.value = "";
        shootDuck2.classList.value = "";
        shootDuckSprite2.offsetWidth;

        shootDuckSprite2.classList.add("duck_position_r");
        shootDuckSprite2.classList.add("duck_flying_img_2");
        shootDuckSprite2.classList.add("duck_animation_r" + random_ani_number);
        shootDuck2.classList.add("duck_position" + random_pos_number);
    }, "2000")
}



function resetDuckIteration() {
    shootDuckSprite.classList.value = "";
    shootDuck.classList.value = "";
    shootDuckSprite.offsetWidth;
    random_pos_number = getARandomNumber(14);
    random_ani_number = getARandomNumber(4);
    shootDuck.classList.add("duck_position_l");
    shootDuckSprite.classList.add("duck_flying_img");
    shootDuckSprite.classList.add("duck_animation_l" + random_ani_number);
    shootDuck.classList.add("duck_position" + random_pos_number);
}
function resetDuckIteration2() {
    shootDuckSprite2.classList.value = "";
    shootDuck2.classList.value = "";
    shootDuckSprite2.offsetWidth;
    random_pos_number = getARandomNumber(14);
    random_ani_number = getARandomNumber(4);
    shootDuck2.classList.add("duck_position_r");
    shootDuckSprite2.classList.add("duck_flying_img_2");
    shootDuckSprite2.classList.add("duck_animation_r" + random_ani_number);
    shootDuck2.classList.add("duck_position" + random_pos_number);
}

function clickGoodObjectDuck() {
    points++;
    resetDuck1();
    let duckSound1 = document.querySelector('#duckShoot1');
    duckSound1.play();
    duckSound1.volume = 0.13;
    duckSound1.currentTime = 0;
    console.log("Thats the points" + points);
    showPoints.textContent = `Points: ${points}`;

    minusAmmo();
}
function clickGoodObjectDuck2() {
    points++;
    resetDuck12();
    let duckSound2 = document.querySelector('#duckShoot1');
    duckSound2.play();
    duckSound2.volume = 0.13;
    duckSound1.currentTime = 0;
    // console.log("Thats the points" + points);
    showPoints.textContent = `Points: ${points}`;

    minusAmmo();
}



// _________________ CLICK RABBIT OBJECT _________________

function resetRabbit1() {
    shootRabbit.classList.add("rabbit_falling_anim");

    //AFTER 2S DELITE FALLING IMAGE
    setTimeout(resetRabbit2, 2000);
}

function resetRabbit2() {
    shootRabbitSprite.classList.value = "";
    shootRabbit.classList.value = "";
    shootRabbitSprite.offsetHeight;
    random_pos_number = getARandomNumber(5);
    shootRabbit.classList.add("game_rabbit_position" + random_pos_number);
    random_anim_number = getARandomNumber(2);
    shootRabbitSprite.classList.add("game_rabbit_animation" + random_anim_number);
}

function resetRabbitIteration() {
    shootRabbitSprite.classList.value = "";
    shootRabbit.classList.value = "";
    shootRabbitSprite.offsetHeight;
    random_pos_number = getARandomNumber(5);
    shootRabbit.classList.add("game_rabbit_position" + random_pos_number);
    random_anim_number = getARandomNumber(2);
    shootRabbitSprite.classList.add("game_rabbit_animation" + random_anim_number);
}

function clickGoodObjectRabbit() {
    points++;
    resetRabbit1();
    // console.log("Thats the points" + points);
    showPoints.textContent = `Points: ${points}`;

    minusAmmo();
}


// _________________ CLICK BAD OBJECT _________________


function resetDisc1() {

    shootDisc.classList.add("disc_falling_anim");
    shootDiscSprite.classList.remove("disc_flying_img");
    shootDiscSprite.classList.add("disc_falling_img");
    setTimeout(resetDisc2(), 2000);
}

function resetDisc2() {
    random_pos_number = getARandomNumber(14);
    random_ani_number = getARandomNumber(4);

    setTimeout(() => {
        shootDiscSprite.classList.value = "";
        shootDisc.classList.value = "";
        shootDiscSprite.offsetWidth;
        shootDiscSprite.classList.add("duck_position_r");
        shootDiscSprite.classList.add("disc_flying_img");
        shootDiscSprite.classList.add("duck_animation_r" + random_ani_number);
        shootDisc.classList.add("duck_position" + random_pos_number);
    }, "2000")
}
function resetDiscIteration() {
    shootDiscSprite.classList.value = "";
    shootDisc.classList.value = "";
    shootDiscSprite.offsetWidth;
    random_pos_number = getARandomNumber(14);
    random_ani_number = getARandomNumber(4);
    shootDisc.classList.add("duck_position_r");
    shootDiscSprite.classList.add("disc_flying_img");
    shootDiscSprite.classList.add("duck_animation_r" + random_ani_number);
    shootDisc.classList.add("duck_position" + random_pos_number);
}



function resetDisc12() {

    shootDisc2.classList.add("disc_falling_anim");
    shootDiscSprite2.classList.remove("disc_flying_img2");
    shootDiscSprite2.classList.add("disc_falling_img2");
    setTimeout(resetDisc22(), 2000);
}

function resetDisc22() {
    random_pos_number = getARandomNumber(14);
    random_ani_number = getARandomNumber(4);

    setTimeout(() => {
        shootDiscSprite2.classList.value = "";
        shootDisc2.classList.value = "";
        shootDiscSprite2.offsetWidth;
        shootDiscSprite2.classList.add("duck_position_l");
        shootDiscSprite2.classList.add("disc_flying_img2");
        shootDiscSprite2.classList.add("duck_animation_l" + random_ani_number);
        shootDisc2.classList.add("duck_position" + random_pos_number);
    }, "2000")
}
function resetDiscIteration2() {
    shootDiscSprite2.classList.value = "";
    shootDisc2.classList.value = "";
    shootDiscSprite2.offsetWidth;
    random_pos_number = getARandomNumber(14);
    random_ani_number = getARandomNumber(4);
    shootDisc2.classList.add("duck_position_l");
    shootDiscSprite2.classList.add("disc_flying_img2");
    shootDiscSprite2.classList.add("duck_animation_l" + random_ani_number);
    shootDisc2.classList.add("duck_position" + random_pos_number);
}





function clickBadObjectDisc() {

    lives--;

    resetDisc1();

    // It is makeing the header elememnt empty every time function is starting (without is 6 previous lives would still be on the screen)
    src.innerHTML = "";
    for (let i = lives; i > 0; i--) {
        src.innerHTML = src.innerHTML + "<img src=\"images/Stats/Heart_1.svg\">";
    }

    minusAmmo();

    if (lives == 0) {
        gameOver();
    } else {
        return lives;
    }
}
function clickBadObjectDisc2() {

    lives--;

    resetDisc12();

    // It is makeing the header elememnt empty every time function is starting (without is 6 previous lives would still be on the screen)
    src.innerHTML = "";
    for (let i = lives; i > 0; i--) {
        src.innerHTML = src.innerHTML + "<img src=\"images/Stats/Heart_1.svg\">";
    }

    minusAmmo();
    if (lives == 0) {
        gameOver();
    } else {
        return lives;
    }
}
// _________________ CLICK DOG _________________

function shootDog() {
    points = -1;
    gameOver();
}

// _________________ SOUNDS _________________
let soundOn = document.querySelector('#sound_on');
let soundOff = document.querySelector('#sound_off');

soundOff.addEventListener('click', soundOffF);
soundOn.addEventListener('click', soundOnF);
let AllSounds = document.querySelector('#sounds');


function soundOffF() {
    soundOn.classList.remove('hide');
    soundOff.classList.add('hide');

    document.querySelector('#gameMusic').muted = false;
    document.querySelector('#duckShoot1').muted = false;
    document.querySelector('#duckSound1').muted = false;
    document.querySelector('#gameOver1').muted = false;
    document.querySelector('#gameOver2').muted = false;
    document.querySelector('#gameWon1').muted = false;
    document.querySelector('#gameWon2').muted = false;
    document.querySelector('#shoot_sound').muted = false;

}
function soundOnF() {
    soundOn.classList.add('hide');
    soundOff.classList.remove('hide');
    document.querySelector('#gameMusic').muted = true;
    document.querySelector('#duckShoot1').muted = true;
    document.querySelector('#duckSound1').muted = true;
    document.querySelector('#gameOver1').muted = true;
    document.querySelector('#gameOver2').muted = true;
    document.querySelector('#gameWon1').muted = true;
    document.querySelector('#gameWon2').muted = true;
    document.querySelector('#shoot_sound').muted = true;
    AllSounds.children.muted = true;


}
// _________________ SHOW INSTRUCTION _________________
function showInstructionsScreen() {
    //Hide BUTTONS
    startButton1.classList.add("hide");
    instructiontButton1.classList.remove("hide");
    shootSound()

    hideStartScreen.classList.add("hide");

    eliteScreenAction.classList.add("hide");
    wonScreenAction.classList.add("hide");
    loseScreenAction.classList.add("hide");
    cruelScreenAction.classList.add("hide");




    showInstructions.classList.remove("hide");

}
// _________________ SHOW OPTIONS IN GAME_________________
let options_bg = document.querySelector("#options_screen_bg");
let optionScreen = document.querySelector("#options_screen");
options_button_click.addEventListener("click", showOptions);
function showOptions() {
    options_bg.classList.remove("hide");
    optionScreen.classList.remove("hide");
    options_button_click.classList.add("hide");
    timer.pause();
    // window.clearTimeout();
    shootDuck.style.animationPlayState = 'paused';
    shootDuck2.style.animationPlayState = 'paused';
    shootDuckSprite.style.animationPlayState = 'paused';
    shootDuckSprite2.style.animationPlayState = 'paused';
    game_dog_sprite.style.animationPlayState = 'paused';
    game_dog.style.animationPlayState = 'paused';
    shootDisc.style.animationPlayState = 'paused';
    shootDiscSprite.style.animationPlayState = 'paused';
    shootDisc2.style.animationPlayState = 'paused';
    shootDiscSprite2.style.animationPlayState = 'paused';
    shootRabbit.style.animationPlayState = 'paused';
    shootRabbitSprite.style.animationPlayState = 'paused';
    game_bg.style.animationPlayState = 'paused';
    game_mg.style.animationPlayState = 'paused';
    game_fg2.style.animationPlayState = 'paused';
    game_fg1_grass.style.animationPlayState = 'paused';
    game_fg1_tree.style.animationPlayState = 'paused';
    startSkyMoving.style.animationPlayState = 'paused';
    document.querySelector("#time").style.animationPlayState = 'paused';
}
let escapeButton = document.querySelector("#escape");
escapeButton.addEventListener("click", escapeOptions);
let returnButton = document.querySelector("#return");
returnButton.addEventListener("click", escapeOptions);
let optionInstructions = document.querySelector("#option_Instructions");
optionInstructions.addEventListener("click", optionInstructionsFunction);
let endgamenButton = document.querySelector("#endgame");
endgamenButton.addEventListener("click", EndFunction);
let resumeTimer;
function escapeOptions() {
    shootSound()
    options_bg.classList.add("hide");
    optionScreen.classList.add("hide");
    options_button_click.classList.remove("hide");
    // document.querySelector("#game").classList.remove('hide');
    resumeTimer = timer.resume();
    timer = new Timer(function () {
        gameOver;
    }, resumeTimer);
    // console.log(timer.resume);

    shootDuck.style.animationPlayState = 'running';
    shootDuck2.style.animationPlayState = 'running';
    shootDuckSprite.style.animationPlayState = 'running';
    shootDuckSprite2.style.animationPlayState = 'running';
    game_dog_sprite.style.animationPlayState = 'running';
    game_dog.style.animationPlayState = 'running';
    shootDisc.style.animationPlayState = 'running';
    shootDiscSprite.style.animationPlayState = 'running';
    shootDisc2.style.animationPlayState = 'running';
    shootDiscSprite2.style.animationPlayState = 'running';
    shootRabbit.style.animationPlayState = 'running';
    shootRabbitSprite.style.animationPlayState = 'running';
    game_bg.style.animationPlayState = 'running';
    game_mg.style.animationPlayState = 'running';
    game_fg2.style.animationPlayState = 'running';
    game_fg1_grass.style.animationPlayState = 'running';
    game_fg1_tree.style.animationPlayState = 'running';
    startSkyMoving.style.animationPlayState = 'running';
    document.querySelector("#time").style.animationPlayState = 'running';
    document.querySelectorAll(".sun_down").style.animationPlayState = 'running';


    // myTimeout = setTimeout(gameOver, timeContainer)
    // // timeS = 0;
    // console.log(timeContainer);
    // game_bg.classList.remove("hide");
    // game_mg.classList.remove("hide");
    // game_fg2.classList.remove("hide");
    // game_fg1_grass.classList.remove("hide");
    // game_fg1_tree.classList.remove("hide");
}

function stopTime() {
    // game_bg.classList.add("hide");
    // game_mg.classList.add("hide");
    // game_fg2.classList.add("hide");
    // game_fg1_grass.classList.add("hide");
    // game_fg1_tree.classList.add("hide");
    // document.querySelector("#black_b").classList.add('hide');

}

function optionInstructionsFunction() {
    document.querySelector("#option_Instructions_screen").classList.remove("hide");
    optionScreen.classList.add("hide");
}
document.querySelector("#escape_interuction").addEventListener("click", optionQuitInstructionsFunction);
function optionQuitInstructionsFunction() {
    document.querySelector("#option_Instructions_screen").classList.add("hide");
    optionScreen.classList.remove("hide");
}
document.querySelector("#escape_return").addEventListener("click", optionInstructionsReturn);
function optionInstructionsReturn() {
    document.querySelector("#option_Instructions_screen").classList.add("hide");
    optionScreen.classList.remove("hide");
    escapeOptions();
}
function EndFunction() {
    shootSound();
    window.location.reload();
}

function gameOver() {
    // timeS = 0;
    // clearTimeout(myTimeout);
    timer.pause();

    //STOP SKY
    startSkyMoving.classList.remove("skyMove");
    sunSetRemove();
    //Hide Stats
    document.querySelector("#timecontainer").classList.add("hide");
    srcAmmo.innerHTML = "";
    src.innerHTML = "";
    music.volume = 0.008;
    setTimeout(normalSound, 5000);

    function normalSound() {
        music.volume = 0.1;
    }
    //SHOW OPTIONS BUTTON
    options_button.classList.add("hide");
    // src.classList.add("hide");
    // srcAmmo.classList.add("hide");
    // showPoints.classList.add("hide");

    // REMOVE BG BLUR & DARKER
    for (i = 0; i < bgDark.length; i++) {
        bgDark[i].classList.add('black_bord');
    }


    document.querySelector('#animals').classList.add('hide');




    startButton1.classList.remove("hide");

    if (points > 9) {
        // console.log("elite");
        let gameWon1Sound = document.querySelector('#gameWon1');
        gameWon1Sound.play()
        gameWon1Sound.volume = 0.3;
        eliteScreen();
    } else if (points >= 6) {
        // console.log("won");
        let gameWon2Sound = document.querySelector('#gameWon2');
        gameWon2Sound.play()
        gameWon2Sound.volume = 0.2;
        wonScreen();
    } else if (points < 6 && points > -1) {
        // console.log("lose");
        let gameOver1Sound = document.querySelector('#gameOver2');
        gameOver1Sound.play()
        gameOver1Sound.volume = 0.1;
        loseScreen();
    } else {
        // console.log("dog shooted");
        let gameOver2Sound = document.querySelector('#gameOver1');
        gameOver2Sound.play()
        gameOver2Sound.volume = 0.1;
        cruelScreen();
    }

}


function eliteScreen() {
    eliteScreenAction.classList.remove("hide");
}
function wonScreen() {
    wonScreenAction.classList.remove("hide");
}
function loseScreen() {
    loseScreenAction.classList.remove("hide");
}
function cruelScreen() {
    cruelScreenAction.classList.remove("hide");
}

function getARandomNumber(number) {
    return Math.floor(Math.random() * number) + 1;
}



