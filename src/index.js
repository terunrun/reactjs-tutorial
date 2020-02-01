import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  // 各マスの状態は盤全体で管理するため、Stateを保持する必要がなくなる
  // constructor(props) {
  //   // すべてのコンストラクタはsuper()の呼び出しから始める
  //   super(props);
  //   // stateの初期化
  //   // stateはmutableなもの
  //   // チュートリアルコードではpropsと同要素名となっているが、違うものを指すため変更している
  //   this.state = {displayValue: null};
  // }

  render() {
    return (
      // 盤目クリック時に確認ダイアログを表示する
      // <button className="square" onClick={function() {alert('Are you sure?')}}>
      // アロー関数で記述する
      // <button className="square" onClick={() => {alert('Are you sure?')}}>
      // setStateメソッドでstateのvalueを書き変える
      <button
        className="square"
        // クリック時にstateの所定の値を書き変える
        // onClick={() => {this.setState({displayValue: 'X'})}}
        // クリック時に親コンポーネントから渡された関数を実行する
        onClick={() => this.props.onClick()}
      >
        {/* 受け取った引数はthis.propsで取得する */}
        {/* {this.props.value} */}
        {/* stateのvalueを取得する */}
        {/* {this.state.displayValue} */}
        {/* 各マスは受け取った引数を表示するのみとする */}
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 盤全体を表すstateを用意する
      // チュートリアルコードはnullだが、見た目のわかりやすさのため-を設定している
      squares: Array(9).fill('-'),
    };
  }

  handleClick(i) {
    // 元々のstateを直接書き変えないようにするため、元のstateと同等のものを一時的に作成する
    // チュートリアルコードではsquaresだが、実体が別であることを明示するため要素名を変更している
    const temp_squares = this.state.squares.slice();
    // クリックされたマス目だけ値を変更する
    temp_squares[i] = 'X';
    // stateを更新するにはあくまでもsetStateを用いる
    this.setState({squares: temp_squares});
  }

  renderSquare(i) {
    // 受け取った引数をvalueという名前のprposでSquareコンポーネントに渡す
    // propsはimmutableなもの
    // return <Square value={i}/>;
    // BoardのSquaresの値（各マスのその時の状態）を渡す
    // return <Square value={this.state.squares[i]}/>;
    // BoardのSquaresの値（各マスのその時の状態）と、クリック時の動作関数をonClickとして渡す
      return(
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
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
