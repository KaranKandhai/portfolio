let play_board = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".play-area");

const render_board = () => {
  board_container.innerHTML = "";
  play_board.forEach((e, i) => {
    board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`;
    if (e == player || e == computer) {
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};

const player = "O";
const computer = "X";

const addPlayerMove = e => {
  if (play_board[e] == "") {
    play_board[e] = player;
    render_board();
    addComputerMove();
  }
};

const addComputerMove = () => {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (play_board[selected] != "");
    play_board[selected] = computer;
    render_board();
  };

  let board_full = false;
const check_board_complete = () => {
  let flag = true;
  play_board.forEach(element => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  board_full = !flag;
};

const game_loop = () => {
    render_board();
    check_board_complete();
  };

  const addPlayerMove = e => {
    if (!board_full && play_board[e] == "") {
      play_board[e] = player;
      game_loop();
      addComputerMove();
    }
  };
  
  const addComputerMove = () => {
    if (!board_full) {
      do {
        selected = Math.floor(Math.random() * 9);
      } while (play_board[selected] != "");
      play_board[selected] = computer;
      game_loop();
    }
  };

  const winner_statement = document.getElementById("winner");
const check_for_winner = () => {
  let res = check_match();
  if (res == player) {
    winner.innerText = "Winner is player!!";
    winner.classList.add("playerWin");
    board_full = true;
  } else if (res == computer) {
    winner.innerText = "Winner is computer";
    winner.classList.add("computerWin");
    board_full = true;
  } else if (board_full) {
    winner.innerText = "Draw!";
    winner.classList.add("draw");
  }
};

const check_line = (a, b, c) => {
    return (
      play_board[a] == play_board[b] &&
      play_board[b] == play_board[c] &&
      (play_board[a] == player || play_board[a] == computer)
    );
  };

  for (i = 0; i < 9; i += 3) {
    if (check_line(i, i + 1, i + 2)) {
      return play_board[i];
    }
  }

  for (i = 0; i < 3; i++) {
    if (check_line(i, i + 3, i + 6)) {
      return play_board[i];
    }
  }

  if (check_line(0, 4, 8)) {
    return play_board[0];
  }
  if (check_line(2, 4, 6)) {
    return play_board[2];
  }
  return "";

  const game_loop = () => {
    render_board();
    check_board_complete();
    check_for_winner();
  };

  const reset_board = () => {
    play_board = ["", "", "", "", "", "", "", "", ""];
    board_full = false;
    winner.classList.remove("playerWin");
    winner.classList.remove("computerWin");
    winner.classList.remove("draw");
    winner.innerText = "";
    render_board();
  };