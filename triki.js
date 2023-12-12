/**
 * @author edwin velasquez jimenez
*/
class Triki {
    static board = ['', '', '', '', '', '', '', '', ''];
    static boardElement;
    static player1;
    static player2;
    static jugadorActual;
    static solo = false;
    constructor(idElement, solo = false) {
        Triki.solo = solo;
        let styleJuego = document.createElement('style');
        styleJuego.textContent = `
        .board {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            background-color: #f5f5f5;
        }

        .X {
            color: #18f765;
        }

        .O {
            color: #4949e5;
        }

        .cell {
            width: 100px;
            height: 100px;
            border: 3px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 108px;
            cursor: pointer;
        }`;
        document.querySelector('head')?.append(styleJuego);

        Triki.seleccionar();

        Triki.boardElement = document.getElementById(idElement);
        Triki.boardElement.addEventListener('click', Triki.manejarCellClick);
        Triki.renderizarTablero();
    }

    static seleccionar() {
        Triki.jugadorActual = Triki.selecionJugador();
        Triki.player1 = Triki.jugadorActual;
        Triki.player2 = Triki.player1 === 'X' ? 'O' : 'X';
    }

    static selecionJugador() {
        let selecionaJugador = '';
        let selecionUsuario = prompt('Que jugador quieres ser player1, "X" o "O"');
        if (selecionUsuario && (selecionUsuario.toUpperCase() == 'X' || selecionUsuario.toUpperCase() == 'O')) {
            selecionaJugador = selecionUsuario.toUpperCase();
        } else {
            alert('Seleccione una correcta opción');
            return Triki.selecionJugador();
        }
        return selecionaJugador;
    }

    static manejarCellClick(event) {
        const index = Array.from(Triki.boardElement.children).indexOf(event.target);
        if (Triki.board[index] === '') {
            Triki.board[index] = Triki.jugadorActual;
            Triki.renderizarTablero();
            setTimeout(() => {
                if (!Triki.comprobarGanador()) {
                    Triki.jugadorActual = Triki.jugadorActual == 'X' ? 'O' : 'X';
                    if (Triki.solo)
                        Triki.botMove();
                }
            }, 100);
        }
    }

    static botMove() {
        const emptyCells = Triki.board.reduce((acc, cell, index) => {
            if (cell === '') {
                acc.push(index);
            }
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const botIndex = emptyCells[randomIndex];

        Triki.board[botIndex] = Triki.jugadorActual;
        Triki.renderizarTablero();
        setTimeout(() => {
            if (!Triki.comprobarGanador()) {
                Triki.jugadorActual = Triki.jugadorActual == 'X' ? 'O' : 'X';
            }
        }, 100);
    }

    static renderizarTablero() {
        Triki.boardElement.innerHTML = '';
        Triki.board.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (value)
                cell.classList.add(value);
            
            cell.textContent = value;
            Triki.boardElement.appendChild(cell);
        });
    }

    static comprobarGanador() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
            [0, 4, 8], [2, 4, 6]             // Diagonales
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (Triki.board[a] && Triki.board[a] === Triki.board[b] && Triki.board[a] === Triki.board[c]) {
                alert(`¡${Triki.board[a]} es el ganador!`);
                Triki.reiniciarJuego();
                return true;
            }
        }

        if (!Triki.board.includes('')) {
            alert('¡Empate!');
            Triki.reiniciarJuego();
            return true;
        }

        return false;
    }

    static reiniciarJuego() {
        if (confirm('Reiniciar juego?')) {
            Triki.board.fill('');
            Triki.seleccionar();
            Triki.renderizarTablero();
        } else {
            Triki.boardElement.innerHTML = '';
        }
    }
}

let triki = new Triki('board', true);
//let triki = new Triki('board', false);