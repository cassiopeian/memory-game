let cardFaces = [
    {
        image: 'images/card-faces/35mm-camera.svg'
    },
    {
        image: 'images/card-faces/polaroid-camera.svg'
    },
    {
        image: 'images/card-faces/craft-beer-bottle.svg'
    },
    {
        image: 'images/card-faces/rose-wine-bottle.svg'
    },
    {
        image: 'images/card-faces/bunny-ear-cactus.svg'
    },
    {
        image: 'images/card-faces/snake-plant.png'
    },
    {
        image: 'images/card-faces/midcentury-armchair.svg'
    },
    {
        image: 'images/card-faces/midcentury-sofa.svg'
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
}

randomizeCards(cardFaces);

// for each array element, create a game tile
cardFaces.forEach(element => {
    let gameTile = $('<figure class="tile"></figure>');
    let cardImg = $('<img class="card-faces" src="" />');

    $(cardImg).attr('src', element.image);  

    $(gameTile).append(cardImg);
    $('#container').append(gameTile);
});

// make tile border "disappear"
$('.tile').on('mousedown', function() {
    $(this).css('borderColor', '#6f8aa8');
});

$('.tile').on('mouseup', function() {
    $(this).css('borderColor', 'darkslategray');
});

// when tiles are clicked, replace tile bg with the card face img
$('.tile').on('click', function() {
    $(this).css('backgroundImage', 'none');
    $(this).children('img').css('display', 'block');
});



// function randomizeCards(object) {
//     let arrKey = Object.keys(object);
//     return arrKey[Math.floor(Math.random() * arrKey.length)];
// }

// $('.card-faces').each(function() {
//     randomCard = cardFaces[randomizeCards(cardFaces)];
//     $(this).attr('src', randomCard.image);
// });

// cardFaces.forEach(element => {
//     element = cardFaces[randomizeCards(cardFaces)];
    
//     let gameTile = $('<figure class="tile"></figure>');
//     let cardImg = $('<img class="card-faces" src="" />');

//     $(cardImg).attr('src', element.image);  

//     $(gameTile).append(cardImg);
//     $('#container').append(gameTile);
// });