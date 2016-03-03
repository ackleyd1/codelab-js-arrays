var games = []
var clearAll = document.getElementById('clear')
var randomGame = document.getElementById('random')
var newGameInput = document.getElementById('input')
var gamesList = document.getElementById('games')

function renderTodos() {
    gamesList.innerHTML = games.map(function(game, index) {
        return '<li>' + game + '<button class="clear" data-index="' + index +
        '">X</button>' + '<button class="up" data-index="' + index +
        '">↑</button>' + '<button class="down" data-index="' + index +
        '">↓</button>' + '</li>'
    }).join('')
}
gamesList.onclick = function(event) {
    var clickedElement = event.target
    if (clickedElement.className === 'clear') {
        games.splice(clickedElement.dataset.index, 1)
        renderTodos()
    }
    else if (clickedElement.className === 'up') {
        // Check to make sure it isn't first otherwise it can't move up
        // index returns a string so to perform a subtraction we need to convert to int
        if (clickedElement.dataset.index > 0) {
            var tempGame = games[parseInt(clickedElement.dataset.index) - 1]
            games[parseInt(clickedElement.dataset.index) - 1] = games[parseInt(clickedElement.dataset.index)]
            games[parseInt(clickedElement.dataset.index)] = tempGame
            renderTodos()
        }
    }
    else if (clickedElement.className === 'down') {
        // Check to make sure it isn't last otherwise it can't move down
        if (clickedElement.dataset.index < games.length - 1) {
            var tempGame = games[parseInt(clickedElement.dataset.index) + 1]
            games[parseInt(clickedElement.dataset.index) + 1] = games[parseInt(clickedElement.dataset.index)]
            games[parseInt(clickedElement.dataset.index)] = tempGame
            renderTodos()
        }
    }
}
clearAll.onclick = function() {
    games = []
    renderTodos()

}
randomGame.onclick = function() {
    var max = games.length - 1
    alert("You should play " + games[parseInt((Math.random() * (max + 1)), 10)])
}
newGameInput.onkeypress = function(event) {
    if (event.which === 13) {
        games.push(this.value)
        this.value = ''
        renderTodos()
    }
}
