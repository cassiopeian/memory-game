let headcount = 0;
let abandonedTiles = 0;
let mismatchedPairs = 0;
let matchedPairs = 0;
let totalMoves = 0;
let selectedPair = [];
let progNum = 0;
let whole;
let percentage;
let gameTile;
let cardImg;
let thirdCardClicked;

let cardFaces = [
    {
        item: '35mm camera',
        image: 'images/card-faces/35mm-camera.svg'
    },
    {
        item: 'polaroid',
        image: 'images/card-faces/polaroid-camera.svg'
    },
    {
        item: 'craft beer',
        image: 'images/card-faces/craft-beer.svg'
    },
    {
        item: 'rosé',
        image: 'images/card-faces/rose-wine-bottle.svg'
    },
    {
        item: 'cactus',
        image: 'images/card-faces/bunny-ear-cactus.svg'
    },
    {
        item: 'snake plant',
        image: 'images/card-faces/snake-plant.png'
    },
    {
        item: 'fixie',
        image: 'images/card-faces/fixie-bike.svg'
    },
    {
        item: 'loveseat',
        image: 'images/card-faces/midcentury-sofa.svg'
    },
    {
        item: 'avocado toast',
        image: 'images/card-faces/avocado-toast.svg'
    },
    {
        item: 'açai bowl',
        image: 'images/card-faces/acai-bowl.svg'
    },
    {
        item: '35mm camera',
        image: 'images/card-faces/35mm-camera.svg'
    },
    {
        item: 'polaroid',
        image: 'images/card-faces/polaroid-camera.svg'
    },
    {
        item: 'craft beer',
        image: 'images/card-faces/craft-beer.svg'
    },
    {
        item: 'rosé',
        image: 'images/card-faces/rose-wine-bottle.svg'
    },
    {
        item: 'cactus',
        image: 'images/card-faces/bunny-ear-cactus.svg'
    },
    {
        item: 'snake plant',
        image: 'images/card-faces/snake-plant.png'
    },
    {
        item: 'fixie',
        image: 'images/card-faces/fixie-bike.svg'
    },
    {
        item: 'loveseat',
        image: 'images/card-faces/midcentury-sofa.svg'
    },
    {
        item: 'avocado toast',
        image: 'images/card-faces/avocado-toast.svg'
    },
    {
        item: 'açai bowl',
        image: 'images/card-faces/acai-bowl.svg'
    }
];

let catDeck = [
    {
        item: 'tuxedo Neko',
        image: 'images/cat-deck/neko-tuxedo.svg'
    },
    {
        item: 'ginger Neko',
        image: 'images/cat-deck/neko-ginger.svg'
    },
    {
        item: 'grey Neko',
        image: 'images/cat-deck/neko-grey.svg'
    },
    {
        item: 'tortie Neko',
        image: 'images/cat-deck/neko-tortie.svg'
    },
    {
        item: 'calico Neko',
        image: 'images/cat-deck/neko-calico.svg'
    },
    {
        item: 'black Neko',
        image: 'images/cat-deck/neko-black.svg'
    },
    {
        item: 'white Neko',
        image: 'images/cat-deck/neko-white.svg'
    },
    {
        item: 'red Neko',
        image: 'images/cat-deck/neko-red.svg'
    },
    {
        item: 'yellow Neko',
        image: 'images/cat-deck/neko-yellow.svg'
    },
    {
        item: 'green Neko',
        image: 'images/cat-deck/neko-green.svg'
    },
    {
        item: 'tuxedo Neko',
        image: 'images/cat-deck/neko-tuxedo.svg'
    },
    {
        item: 'ginger Neko',
        image: 'images/cat-deck/neko-ginger.svg'
    },
    {
        item: 'grey Neko',
        image: 'images/cat-deck/neko-grey.svg'
    },
    {
        item: 'tortie Neko',
        image: 'images/cat-deck/neko-tortie.svg'
    },
    {
        item: 'calico Neko',
        image: 'images/cat-deck/neko-calico.svg'
    },
    {
        item: 'black Neko',
        image: 'images/cat-deck/neko-black.svg'
    },
    {
        item: 'white Neko',
        image: 'images/cat-deck/neko-white.svg'
    },
    {
        item: 'red Neko',
        image: 'images/cat-deck/neko-red.svg'
    },
    {
        item: 'yellow Neko',
        image: 'images/cat-deck/neko-yellow.svg'
    },
    {
        item: 'green Neko',
        image: 'images/cat-deck/neko-green.svg'
    }
];

// add visible focus to the toggler oval
$('#toggle-announcement').on('focus', function() {
    $('#toggler-container label').addClass('pseudo-focus');
});

// remove visible focus from the toggler oval
$('#toggle-announcement').on('focusout', function() {
    $('#toggler-container label').removeClass('pseudo-focus');
});

// by default, display the match announcements
$('#toggle-announcement').prop('checked', true);

// enable enter key to select checkbox
$('input:checkbox').keypress(function(e) {
    e.preventDefault();
    if ((e.keyCode ? e.keyCode : e.which) == 13) {
        $(this).trigger('click');
    }
});

function randomizeCards(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // while the array has unshuffled elements
    while (0 !== currentIndex) {
        // choose an unshuffled element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // and replace it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

randomizeCards(cardFaces);

// for each array element, create a game tile
cardFaces.forEach(element => {
    gameTile = $('<button class="tile" type="button"></button>');
    cardImg = $('<img class="card-faces" src="" />');

    // add an array image to each img tag's src attribute
    $(cardImg).attr('src', element.image);  

    // set an img inside each button (i.e., game tile)
    $(gameTile).append(cardImg);

    // place all the game tiles inside the gameboard
    $('#gameboard').append(gameTile);
});

// selectedPair.length reverts to 0 when a match is made, so . . .
function countMoves() {
    // if selectedPair.length == 2 and a third card hasn't been clicked . . .
    if (selectedPair.length == 2 && thirdCardClicked == false) {
        // increase mismatchedPairs by 1
        mismatchedPairs++;
    }

    totalMoves = abandonedTiles + matchedPairs + mismatchedPairs;
    
    // update the moves counter
    $('#moves-num').html(totalMoves);
};

function resetSelectionAndCount() {
    // empty the array
    selectedPair.splice(0);

    // reset headcount to zero
    headcount = 0;
};

// since there are ten pairs, advance the progress bar by using the progNum as a percentage of the progress container (e.g., progNum 1 is 10%)
function advanceProgress() {
    whole = $('#progress-container').width();
    percentage = whole * `.${progNum}`;

    if (progNum <= 9) {
        $('#progress-bar').css('width', `${percentage}px`);
    } else if (progNum == 10) {
        $('#progress-bar').css('width', whole);
    }
};

// announce the name of the matched item
function announceMatch() {
    if ($('#toggle-announcement').is(':checked') === true) {
        // by looping through the game array
        cardFaces.forEach(matched => {
            // to check whether the object's image property matches the image paths currently sitting in the selectedPair array (at this point in pairChecker, index items 0 and 1 are the same)
            if (matched.image == selectedPair[0]) {
                $('#match-type').html(`${matched.item}!`);
                $('#match-announcement').fadeIn(400, function() {
                    $('#match-announcement').delay(1500).fadeOut(200);
                });
            }
        });

        catDeck.forEach(matched => {
            if (matched.image == selectedPair[0]) {
                $('#match-type').html(`${matched.item}!`);
                $('#match-announcement').fadeIn(400, function() {
                    $('#match-announcement').delay(1500).fadeOut(200);
                });
            }
        });
    } else {
        return;
    }
};

function pairChecker() {
    if (selectedPair.length == 2 && selectedPair[0] !== selectedPair[1]) {
        // the pair is mismatched, so the cards will turn back over in 2.5s
        setTimeout(function() {
            resetSelectionAndCount();

            // switch the .heads-up pair to .mismatch 
            $('.heads-up').addClass('mismatch').removeClass('heads-up');

            // "turn" the mismatched cards back over
            $('.mismatch').css('backgroundImage', 'url("images/pink-moroccan-tile.png")');
            $('.mismatch').children('img').css('display', 'none');
        }, 2500);
    } else if (selectedPair.length == 2 && selectedPair[0] == selectedPair[1]) {
        announceMatch();
        
        resetSelectionAndCount();

        // a match was made, so increase matchedPairs by 1
        matchedPairs++;
        
        // switch the .heads-up pair to .match and remove possible .mismatch class
        $('.heads-up').addClass('match').removeClass('heads-up mismatch');
        
        // ensure matched cards remain faceup
        $('button.tile.match').prop('disabled', 'true');
        $('.match').css({'backgroundImage': 'none', 'borderColor': 'rgb(156 45 81)'});
        $('.match').children('img').css('display', 'block');

        // increase the user's progress number by 1, and update #progress-x 
        progNum++;
        $('#progress-x').html(progNum);
    }
};

$(document).on('mousedown', '.tile', pressedButton);

// create a pressed-button effect
function pressedButton() {
    $(this).css('borderColor', 'rgb(222 167 167)');
    $('.tile').on('mouseup', function() {
        $(this).css('borderColor', 'rgb(167 83 77)');
    });
};

$(document).on('click', '.tile', selectTile);

function selectTile() {
    if ($(this).css('backgroundImage') == 'none') {
        // a single tile is faceup and needs to be turned back over, because the user has changed their mind before selecting a second tile 
        thirdCardClicked = false;
        $(this).removeClass('heads-up');
        $(this).css('backgroundImage', 'url("images/pink-moroccan-tile.png")');
        $(this).children('img').css('display', 'none');
        
        // remove the tile from headcount
        headcount--;

        // when headcount is reduced by 1, increase abandonedTiles by 1
        abandonedTiles++;

        // clear the selectedPair array
        selectedPair.splice(0);
    } else if (headcount == 2 && $(this).css('backgroundImage') !== 'none') {
        // a third card has been clicked, so it should remain unturned
        thirdCardClicked = true;
        $(this).css('backgroundImage', 'url("images/pink-moroccan-tile.png")');
        $(this).children('img').css('display', 'none');
        headcount = headcount;
    } else {
        // turn over a first or second selection
        thirdCardClicked = false;
        $(this).addClass('heads-up');
        $(this).css('backgroundImage', 'none');
        $(this).children('img').css('display', 'block');
        headcount++;
    }

    console.log(`headcount: ${headcount}`);
    console.log(`abandoned tiles: ${abandonedTiles}`);
    
    // if a tile is faceup 
    if ($(this).hasClass('heads-up') == true) {
        // push its img src path into the selectedPair array
        selectedPair.push($(this).children('img').attr('src'));
        console.log(selectedPair);
    } 

    pairChecker();

    countMoves();
    console.log(`moves: ${totalMoves}`);

    advanceProgress();
};

// ensure the progress bar is accurate, on window resize 
$(window).on('resize', advanceProgress);

// reset the game
$(document).on('click', '#reset-icon', function() {
    location.reload(true);
});

// open the settings 
$('#settings-icon').on('click', function() {
    $('aside').css('display', 'block');
});

function cleanSlate() {
    // clear the number of moves and the progress bar
    headcount = 0;
    abandonedTiles = 0;
    mismatchedPairs = 0;
    matchedPairs = 0;
    totalMoves = 0;
    progNum = 0;
    $('#moves-num').html(totalMoves);
    $('#progress-x').html(progNum);
    advanceProgress();

    // close the settings box
    $('aside').css('display', 'none');

    // clear the gameboard
    $('#gameboard').children('button').remove();
};

// selects the "lifestyle trends" theme
$('#trends').on('click', function() {
    cleanSlate();

    randomizeCards(cardFaces);

    cardFaces.forEach(element => {
        gameTile = $('<button class="tile" type="button"></button>');
        cardImg = $('<img class="card-faces" src="" />');

        // add an array image to each img tag's src attribute
        $(cardImg).attr('src', element.image);  

        // set an img inside each button (i.e., game tile)
        $(gameTile).append(cardImg);

        // place all the game tiles inside the gameboard
        $('#gameboard').append(gameTile);
    });

    selectTile();
});

// selects the "lucky cats" theme
$('#cats').on('click', function() {
    cleanSlate();

    randomizeCards(catDeck);

    catDeck.forEach(cat => {
        gameTile = $('<button class="tile" type="button"></button>');
        cardImg = $('<img class="card-faces" src="" />');

        // add an array image to each img tag's src attribute
        $(cardImg).attr('src', cat.image);  

        // set an img inside each button (i.e., game tile)
        $(gameTile).append(cardImg);

        // place all the game tiles inside the gameboard
        $('#gameboard').append(gameTile);
    });

    selectTile();
});

$('.close').on('click', function() {
    // close the settings box
    $('aside').css('display', 'none');
});