var games = []
var clearAll = document.getElementById('clear')
var randomGame = document.getElementById('random')
var newGameInput = document.getElementById('input')
var gamesList = document.getElementById('games')
var gameNumber = document.getElementById('gameNumber')
// Displaying number of games to play before renderTodos is called
gameNumber.innerHTML = 'Number of games to play: 0'
randomGame.style.display = "none"
clearAll.style.display = "none"

function renderGames() {
    gamesList.innerHTML = games.map(function(game, index) {
        if (parseInt(index) === 0) {
            return '<li><span class="game">' + game + '</span><button class="clear" data-index="' + index +
            '">X</button>' + '<button class="down" data-index="' + index +
            '">↓</button>' + '</li>'
        }
        else if (parseInt(index) === games.length - 1) {
            return '<li><span class="game">' + game + '</span><button class="clear" data-index="' + index +
            '">X</button>' + '<button class="up" data-index="' + index +
            '">↑</button>' + '</li>'
        }
        else {
            return '<li><span class="game">' + game + '</span><button class="clear" data-index="' + index +
            '">X</button>' + '<button class="up" data-index="' + index +
            '">↑</button>' + '<button class="down" data-index="' + index +
            '">↓</button>' + '</li>'
        }
    }).join('')
    gameNumber.innerHTML = 'Number of games to play: ' + games.length.toString()
    if (games.length > 1){
        randomGame.style.display = "inline"
    }
    else if (games.length < 2) {
        randomGame.style.display = "none"
    }
    if (games.length > 0) {
        clearAll.style.display = "inline"
    }
    else {
        clearAll.style.display = "none"
    }
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
    else if (clickedElement.className === 'game') {
        var tempGame = clickedElement.innerHTML
        clickedElement.innerHTML = '<input id="edit" type="text" name="game" value="' + tempGame + '">'
        var newGameInput = document.getElementById('edit')
        newGameInput.focus()
        newGameInput.select()
        newGameInput.onkeyup = function(event) {
            console.log(event.keyCode)
            if (event.keyCode === 13) {
                if (this.value.trim() === '') {
                    //Do nothing
                }
                else {
                    games.splice(games.indexOf(tempGame), 1, this.value)
                    renderGames()

                }
            }
            else if (event.keyCode === 27) {
                renderGames()
            }
        }

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
