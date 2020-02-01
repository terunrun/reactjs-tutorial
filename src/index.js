import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor(props) {
    // すべてのコンストラクタはsuper()の呼び出しから始める
    super(props);
    // stateの初期化
    // stateはmutableなもの
    // チュートリアルコードではpropsと同要素名となっているが、違うものを指すため変更している
    this.state = {displayValue: null};
  }

  render() {
    return (
      // 盤目クリック時に確認ダイアログを表示する
      // <button className="square" onClick={function() {alert('Are you sure?')}}>
      // アロー関数で記述する
      // <button className="square" onClick={() => {alert('Are you sure?')}}>
      // setStateメソッドでstateのvalueを書き変える
      <button
        className="square"
        onClick={() => {this.setState({displayValue: 'X'})}}
      >
        {/* 受け取った引数はthis.propsで取得する */}
        {/* {this.props.value} */}
        {/* stateのvalueを取得する */}
        {this.state.displayValue}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    // 受け取った引数をvalueという名前のprposでSquareコンポーネントに渡す
    // propsはimmutableなもの
    return <Square value={i}/>;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {/* renderSquareメソッドを引数0で呼び出す */}
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
