var games = []
var clearAll = document.getElementById('clear')
var randomGame = document.getElementById('random')
var newGameInput = document.getElementById('input')
var gamesList = document.getElementById('games')
var gameNumber = document.getElementById('gameNumber')
// Displaying number of games to play before renderTodos is called
gameNumber.innerHTML = 'Number of games to play: 0'

function renderGames() {
    gamesList.innerHTML = games.map(function(game, index) {
        if (parseInt(index) === 0) {
            return '<li>' + game + '<button class="clear" data-index="' + index +
            '">X</button>' + '<button class="down" data-index="' + index +
            '">↓</button>' + '</li>'
        }
        else if (parseInt(index) === games.length - 1) {
            return '<li>' + game + '<button class="clear" data-index="' + index +
            '">X</button>' + '<button class="up" data-index="' + index +
            '">↑</button>' + '</li>'
        }
        else {
            return '<li>' + game + '<button class="clear" data-index="' + index +
            '">X</button>' + '<button class="up" data-index="' + index +
            '">↑</button>' + '<button class="down" data-index="' + index +
            '">↓</button>' + '</li>'
        }
    }).join('')
    gameNumber.innerHTML = 'Number of games to play: ' + games.length.toString()
}
gamesList.onclick = function(event) {
    var clickedElement = event.target
    if (clickedElement.className === 'clear') {
        games.splice(clickedElement.dataset.index, 1)
        renderGames()
    }
    else if (clickedElement.className === 'up') {
        // index returns a string so to perform a subtraction we need to convert to int
        var tempGame = games[parseInt(clickedElement.dataset.index) - 1]
        games[parseInt(clickedElement.dataset.index) - 1] = games[parseInt(clickedElement.dataset.index)]
        games[parseInt(clickedElement.dataset.index)] = tempGame
        renderGames()
    }
    else if (clickedElement.className === 'down') {
        var tempGame = games[parseInt(clickedElement.dataset.index) + 1]
        games[parseInt(clickedElement.dataset.index) + 1] = games[parseInt(clickedElement.dataset.index)]
        games[parseInt(clickedElement.dataset.index)] = tempGame
        renderGames()
    }
}
clearAll.onclick = function() {
    games = []
    renderGames()

}
randomGame.onclick = function() {
    var max = games.length - 1
    alert("You should play " + games[parseInt((Math.random() * (max + 1)), 10)])
}
newGameInput.onkeypress = function(event) {
    if (event.which === 13) {
        if (this.value.trim() === '') {
            // Do nothing
        }
        else {
            games.push(this.value)
            this.value = ''
            renderGames()
        }

    }
}
