import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 勝敗判定メソッド
function calculateWinner(squares) {
  // 勝ちの並べ方を配列[配列]で準備
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  // いずれかの勝ちの並べ方に一致するかを判定する
  for (let i=0; i < lines.length; i++) {
    // 判定対象の勝ちの並べ方を取り出す
    const [a, b, c] = lines[i];
    // 頭のマスが-選択されている、かつ横と同じ、かつそのさらに横と同じか
    if (squares[a] !== '-' && squares[a] === squares[b] && squares[a] === squares[c]) {
      // 勝ち配列に一致する場合、頭のマスに入っている値を返却する
      return squares[a]
    }
  }
  // 勝敗がつかなかった場合の処理
  let drawFlg = true;
  for (let i=0; i < squares.length; i++) {
    if (squares[i] === '-' ) {
      drawFlg = false;
      break;
    }
  }
  if (drawFlg) {
    return 'draw'
  }
  // 勝ち配列に一致しない場合、nullを返却する
  return null
}

// 関数コンポーネント化する
// class Square extends React.Component {
//   // 各マスの状態は盤全体で管理するため、Stateを保持する必要がなくなる
//   // constructor(props) {
//   //   // すべてのコンストラクタはsuper()の呼び出しから始める
//   //   super(props);
//   //   // stateの初期化
//   //   // stateはmutableなもの
//   //   // チュートリアルコードではpropsと同要素名となっているが、違うものを指すため変更している
//   //   this.state = {displayValue: null};
//   // }

//   render() {
//     return (
//       // 盤目クリック時に確認ダイアログを表示する
//       // <button className="square" onClick={function() {alert('Are you sure?')}}>
//       // アロー関数で記述する
//       // <button className="square" onClick={() => {alert('Are you sure?')}}>
//       // setStateメソッドでstateのvalueを書き変える
//       <button
//         className="square"
//         // クリック時にstateの所定の値を書き変える
//         // onClick={() => {this.setState({displayValue: 'X'})}}
//         // クリック時に親コンポーネントから渡された関数を実行する
//         onClick={() => this.props.onClick()}
//       >
//         {/* 受け取った引数はthis.propsで取得する */}
//         {/* {this.props.value} */}
//         {/* stateのvalueを取得する */}
//         {/* {this.state.displayValue} */}
//         {/* 各マスは受け取った引数を表示するのみとする */}
//         {this.props.value}
//       </button>
//     );
//   }
// }

// 関数コンポーネント化した
function Square(props) {
  return(
    <button
      className="square"
      // 関数コンポーネント化したためthisが不要になる
      // onClick={() => props.onClick()}
      // より簡素な形に変更
      onClick={props.onClick}
    >
      {/* 関数コンポーネント化したためthisが不要になる */}
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // Gameコンポーネントでゲーム状態を保持するため不要になる
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     // 盤全体を表すstateを用意する
  //     // チュートリアルコードはnullだが、見た目のわかりやすさのため-を設定している
  //     squares: Array(9).fill('-'),
  //     // 初期プレイヤーを設定する
  //     xIsNext: true,
  //   };
  // }

  // Gameコンポーネントへ移す
  // handleClick(i) {
  //   // 元々のstateを直接書き変えないようにするため、元のstateと同等のものを一時的に作成する
  //   // チュートリアルコードではsquaresだが、実体が別であることを明示するため要素名を変更している
  //   const temp_squares = this.state.squares.slice();
  //   // ゲームが終了している場合およびすでに選択されているマスはクリックしても値が入らないようにする
  //   if (calculateWinner(temp_squares) || !(temp_squares[i] === '-')) {
  //     return;
  //   }
  //   // クリックされたマス目だけ、XがプレイヤーならXに、OがプレイヤーならOに値を変更する
  //   temp_squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   // stateを更新するにはあくまでもsetStateを用いる
  //   this.setState({
  //     squares: temp_squares,
  //     // プレイヤーを反転させる
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  renderSquare(i) {
    // 受け取った引数をvalueという名前のprposでSquareコンポーネントに渡す
    // propsはimmutableなもの
    // return <Square value={i}/>;
    // BoardのSquaresの値（各マスのその時の状態）を渡す
    // return <Square value={this.state.squares[i]}/>;
    // BoardのSquaresの値（各マスのその時の状態）と、クリック時の動作関数をonClickとして渡す
      return(
      <Square
        Gameコンポーネントから受け取ったpropsを使用するように変更
        // value={this.state.squares[i]}
        value={this.props.squares[i]}
        // onClick={() => this.handleClick(i)}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
  // Gameコンポーネントでゲーム状態を保持するため不要になる
    // // 今のstateに対して勝者判定メソッドを呼び出す
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   if ('draw' === winner) {
    //     status = 'draw...';
    //   } else {
    //     // 勝者が存在する場合
    //     status = 'Winner is ' + winner;
    //   }
    // } else {
    //   // 勝者が存在しない場合
    //   // const status = 'Next player: X';
    //   // プレイヤーによって表示を切り替える
    //   status = 'Next player:' +  (this.state.xIsNext? 'X' : 'O');
    // }

    return (
      <div>
        {/* Gameコンポーネントでゲーム状態を保持するため不要になる */}
        {/* <div className="status">{status}</div> */}
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
  // ゲームの状態を保持する
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill('-')
      }],
      // 着手の番号を設定する
      stepNumber: 0,
      xIsNext: true,
    }
  }

  // Boardコンポーネントに実装していたクリック時関数をここへ移す
  handleClick(i) {
    // 巻き戻した状態から見て将来のものを捨てる
    // const history = this.state.history;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const temp_squares = current.squares.slice();
    if (calculateWinner(temp_squares) || !(temp_squares[i] === '-')) {
      return;
    }
    temp_squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: temp_squares,
      }]),
      // クリックされた場合に着手番号を更新する
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      // 偶数回目の場合はXがプレイヤー
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // 現在までのゲーム履歴を取得する
    const history = this.state.history;
    // 現在までのゲーム履歴の最後＝現在のゲーム状態を取得する
    // const current = history[history.length - 1];
    // ゲーム履歴の最後=現在ではなく、クリックされた着手の順番の状態を取得する
    const current = history[this.state.stepNumber];
    // Boardコンポーネントに実装していた勝敗判定をここへ移す
    const winner = calculateWinner(current.squares);

    // ゲームの履歴を表示する
    // TODO：定義していないstepが使えるのはなぜか？
    const moves = history.map((step, move) => {
      const description = move ?
        // 着手が存在する場合
        // TODO：なぜこれで数字が渡るのか？
        'Go to move' + move :
        // 着手が存在しない場合
        'Go to game start';
      return (
        // 着手の番号をlistのkeyとする
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      if ('draw' === winner) {
        status = 'draw...';
      } else {
        // 勝者が存在する場合
        status = 'Winner is ' + winner;
      }
    } else {
      // 勝者が存在しない場合
      // const status = 'Next player: X';
      // プレイヤーによって表示を切り替える
      status = 'Next player:' +  (this.state.xIsNext? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
