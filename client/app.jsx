import React from 'react'
import ReactDOM from 'react-dom'
import Square from './components/Square.jsx'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start: 'Connect 4',
            player1: [],
            player2: [],
            results: '',
            reset: 'hide'
        }
        this.click = this.click.bind(this)
        this.click1 = this.click1.bind(this)
        this.reset = this.reset.bind(this)
        this.turn = 1
        this.count = 0
        this.end = false
    }
    checker(playerArr, winCon) {
        this.winCon = winCon
        return winCon.every(elem => playerArr.some(elem1 => { return elem.x === elem1.x && elem.y === elem1.y }))
    }
    click({ x, y }) {
        var playerArr = this.state['player' + this.turn]
        if (this.checker(playerArr, [{ x: x, y: y - 1 }, { x: x, y: y - 2 }, { x: x, y: y - 3 }])) {
            this.setState({ start: `player${this.turn} has won!`, reset: 'reset', [7 * y + x]: 'box' + (this.turn + 2) });
            for (var i = 0; i < this.winCon.length; i++) {
                this.setState({ [7 * this.winCon[i].y + this.winCon[i].x]: 'box' + (this.turn + 2) })
            }
            this.end = true;
            return
        }

        if (this.checker(playerArr, [{ x: x - 1, y: y }, { x: x - 2, y: y }, { x: x - 3, y: y }]) ||
            this.checker(playerArr, [{ x: x + 1, y: y }, { x: x + 2, y: y }, { x: x + 3, y: y }]) ||
            this.checker(playerArr, [{ x: x + 1, y: y }, { x: x - 1, y: y }, { x: x + 2, y: y }]) ||
            this.checker(playerArr, [{ x: x + 1, y: y }, { x: x - 1, y: y }, { x: x - 2, y: y }])) {
            this.setState({ start: `player${this.turn} has won!`, reset: 'reset', [7 * y + x]: 'box' + (this.turn + 2) });
            for (var i = 0; i < this.winCon.length; i++) {
                this.setState({ [7 * this.winCon[i].y + this.winCon[i].x]: 'box' + (this.turn + 2) })
            }
            this.end = true;
            return
        }

        if (this.checker(playerArr, [{ x: x - 1, y: y - 1 }, { x: x - 2, y: y - 2 }, { x: x - 3, y: y - 3 }]) ||
            this.checker(playerArr, [{ x: x + 1, y: y + 1 }, { x: x + 2, y: y + 2 }, { x: x + 3, y: y + 3 }]) ||
            this.checker(playerArr, [{ x: x + 1, y: y + 1 }, { x: x - 1, y: y - 1 }, { x: x + 2, y: y + 2 }]) ||
            this.checker(playerArr, [{ x: x + 1, y: y + 1 }, { x: x - 1, y: y - 1 }, { x: x - 2, y: y - 2 }]) ||
            this.checker(playerArr, [{ x: x - 1, y: y + 1 }, { x: x - 2, y: y + 2 }, { x: x - 3, y: y + 3 }]) ||
            this.checker(playerArr, [{ x: x + 1, y: y - 1 }, { x: x + 2, y: y - 2 }, { x: x + 3, y: y - 3 }]) ||
            this.checker(playerArr, [{ x: x + 1, y: y - 1 }, { x: x - 1, y: y + 1 }, { x: x - 2, y: y + 2 }]) ||
            this.checker(playerArr, [{ x: x - 1, y: y + 1 }, { x: x + 1, y: y - 1 }, { x: x + 2, y: y - 2 }])) {
            this.setState({ start: `player${this.turn} has won!`, reset: 'reset', [7 * y + x]: 'box' + (this.turn + 2) });
            for (var i = 0; i < this.winCon.length; i++) {
                this.setState({ [7 * this.winCon[i].y + this.winCon[i].x]: 'box' + (this.turn + 2) })
            }
            this.end = true;
            return
        }

        if (this.count === 42) {
            this.setState({ start: `It's a Tie`, reset: 'reset' });
            this.end = true;
            return
        }
        this.count++
        if (this.turn === 1) this.turn = 2
        else this.turn = 1
        this.setState({ start: `Player${this.turn}'s turn` })
    }
    click1(key) {
        if (this.end) return;
        var cords = { x: key % 7, y: Math.floor(key / 7) }
        if (cords.y > 5) return;
        var arr = this.state['player' + this.turn]
        arr.push(cords)
        this.setState({
            [key]: 'box' + this.turn,
            ['player' + this.turn]: arr
        })
        console.log(this.state)
        this.click(cords)
    }
    reset() {
        this.state = {}
        this.setState({
            start: 'Connect 4',
            player1: [],
            player2: [],
            results: '',
            reset: 'hide'
        })
        this.turn = 1
        this.count = 0
        this.end = false
    }
    render() {
        return (
            <div className="center">
                {/* <div className="c" id="1" onClick={this.click}>
                    <Square turn={this.turn} cs={this.state.cs1} y={1} />
                    <Square turn={this.turn} cs={this.state.cs1} y={2} />
                    <Square turn={this.turn} cs={this.state.cs1} y={3} />
                    <Square turn={this.turn} cs={this.state.cs1} y={4} />
                    <Square turn={this.turn} cs={this.state.cs1} y={5} />
                    <Square turn={this.turn} cs={this.state.cs1} y={6} />
                </div>
                <div className="c" id="2" onClick={this.click}>
                    <Square turn={this.turn} cs={this.state.cs2} y={1} />
                    <Square turn={this.turn} cs={this.state.cs2} y={2} />
                    <Square turn={this.turn} cs={this.state.cs2} y={3} />
                    <Square turn={this.turn} cs={this.state.cs2} y={4} />
                    <Square turn={this.turn} cs={this.state.cs2} y={5} />
                    <Square turn={this.turn} cs={this.state.cs2} y={6} />
                </div>
                <div className="c" id="3" onClick={this.click}>
                    <Square turn={this.turn} cs={this.state.cs3} y={1} />
                    <Square turn={this.turn} cs={this.state.cs3} y={2} />
                    <Square turn={this.turn} cs={this.state.cs3} y={3} />
                    <Square turn={this.turn} cs={this.state.cs3} y={4} />
                    <Square turn={this.turn} cs={this.state.cs3} y={5} />
                    <Square turn={this.turn} cs={this.state.cs3} y={6} />
                </div>
                <div className="c" id="4" onClick={this.click}>
                    <Square turn={this.turn} cs={this.state.cs4} y={1} />
                    <Square turn={this.turn} cs={this.state.cs4} y={2} />
                    <Square turn={this.turn} cs={this.state.cs4} y={3} />
                    <Square turn={this.turn} cs={this.state.cs4} y={4} />
                    <Square turn={this.turn} cs={this.state.cs4} y={5} />
                    <Square turn={this.turn} cs={this.state.cs4} y={6} />
                </div>
                <div className="c" id="5" onClick={this.click}>
                    <Square turn={this.turn} cs={this.state.cs5} y={1} />
                    <Square turn={this.turn} cs={this.state.cs5} y={2} />
                    <Square turn={this.turn} cs={this.state.cs5} y={3} />
                    <Square turn={this.turn} cs={this.state.cs5} y={4} />
                    <Square turn={this.turn} cs={this.state.cs5} y={5} />
                    <Square turn={this.turn} cs={this.state.cs5} y={6} />
                </div>
                <div className="c" id="6" onClick={this.click}>
                    <Square turn={this.turn} cs={this.state.cs6} y={1} />
                    <Square turn={this.turn} cs={this.state.cs6} y={2} />
                    <Square turn={this.turn} cs={this.state.cs6} y={3} />
                    <Square turn={this.turn} cs={this.state.cs6} y={4} />
                    <Square turn={this.turn} cs={this.state.cs6} y={5} />
                    <Square turn={this.turn} cs={this.state.cs6} y={6} />
                </div>
                <div className="c" id="7" onClick={this.click}>
                    <Square turn={this.turn} cs={this.state.cs7} y={1} />
                    <Square turn={this.turn} cs={this.state.cs7} y={2} />
                    <Square turn={this.turn} cs={this.state.cs7} y={3} />
                    <Square turn={this.turn} cs={this.state.cs7} y={4} />
                    <Square turn={this.turn} cs={this.state.cs7} y={5} />
                    <Square turn={this.turn} cs={this.state.cs7} y={6} />
                </div> */}
                <h2 className="head">{this.state.start}</h2>
                <div className="grid">
                    {_.range(41, -1).map((elem, i) => <Square key={elem} key1={elem} state={this.state} click1={this.click1} turn={this.turn} />)}
                </div>
                <input type="button" className={this.state.reset} onClick={this.reset} value="Play Again?" />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))