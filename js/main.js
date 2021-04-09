let headcount = 0;
let abandonedTiles = 0;
let mismatchedPairs = 0;
let matchedPairs = 0;
let totalMoves = 0;
let selectedPair = [];
let progNum = 0;
let whole;
let percentage;

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
        item: 'beer',
        image: 'images/card-faces/craft-beer.svg'
    },
    {
        item: 'wine',
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
        item: 'armchair',
        image: 'images/card-faces/midcentury-armchair.svg'
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
        item: 'acai bowl',
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
        item: 'beer',
        image: 'images/card-faces/craft-beer.svg'
    },
    {
        item: 'wine',
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
        item: 'armchair',
        image: 'images/card-faces/midcentury-armchair.svg'
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
        item: 'acai bowl',
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
    let gameTile = $('<button class="tile" type="button"></button>');
    let cardImg = $('<img class="card-faces" src="" />');

    // add an array image to each img tag's src attribute
    $(cardImg).attr('src', element.image);  

    // set an img inside each button (i.e., game tile)
    $(gameTile).append(cardImg);

    // place all the game tiles inside the gameboard
    $('#gameboard').append(gameTile);
});

function countMoves() {
    // headcount and selectedPair.length revert to 0 when a match is made, so the num of matched pairs is increased in pairChecker
    if (selectedPair.length == 2) {
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

function pairChecker() {
    if (selectedPair.length == 2 && selectedPair[0] !== selectedPair[1]) {
        // the pair is mismatched, so the cards will turn back over in 2.5s
        setTimeout(function() {
            resetSelectionAndCount();

            // switch the .heads-up pair to .mismatch 
            $('.heads-up').addClass('mismatch').removeClass('heads-up');

            // "turn" the mismatched cards back over
            $('.mismatch').css('backgroundImage', 'url("images/mmg-tile-back.svg")');
            $('.mismatch').children('img').css('display', 'none');
        }, 2500);
    } else if (selectedPair.length == 2 && selectedPair[0] == selectedPair[1]) {
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

// create a pressed-button effect
$('.tile').on('mousedown', function() {
    $(this).css('borderColor', 'rgb(111, 138, 168)');
    $('.tile').on('mouseup', function() {
        $(this).css('borderColor', 'rgb(55, 69, 84)');
    });
});

$('.tile').on('click', function() {
    if ($(this).css('backgroundImage') == 'none') {
        // the tile is faceup and needs to be turned back over, because the user has changed their mind before selecting a second tile 
        $(this).removeClass('heads-up');
        $(this).css('backgroundImage', 'url("images/mmg-tile-back.svg")');
        $(this).children('img').css('display', 'none');
        
        // remove the tile from headcount
        headcount--;

        // when headcount is reduced by 1, increase abandonedTiles by 1
        abandonedTiles++;

        // clear the selectedPair array
        selectedPair.splice(0);
    } else if (headcount == 2 && $(this).css('backgroundImage') !== 'none') {
        $(this).css('backgroundImage', 'url("images/mmg-tile-back.svg")');
        $(this).children('img').css('display', 'none');
        headcount = headcount;
    } else {
        $(this).addClass('heads-up');
        $(this).css('backgroundImage', 'none');
        $(this).children('img').css('display', 'block');
        headcount++;
    }

    console.log(`headcount: ${headcount}`);
    console.log(`abandoned tiles: ${abandonedTiles}`);
    
    if ($(this).hasClass('heads-up') == true) {
        selectedPair.push($(this).children('img').attr('src'));
        console.log(selectedPair);
    } 

    pairChecker();
    
    countMoves();
    console.log(`moves: ${totalMoves}`);

    advanceProgress();
});

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