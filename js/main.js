let randomCard;

cardFaces = [
    {
        image: 'images/card-faces/35mm-camera.svg'
    },
    {
        image: 'images/card-faces/polaroid-camera.svg'
    },
];

function randomizeCards(object) {
    let arrKey = Object.keys(object);
    return arrKey[Math.floor(Math.random() * arrKey.length)];
}

$('.card-faces').each(function() {
    randomCard = cardFaces[randomizeCards(cardFaces)];
    $(this).attr('src', randomCard.image);
});

$('.tile').on('click', function() {
    $(this).css('backgroundImage', 'none');
    $(this).children('img').css('display', 'block');
});