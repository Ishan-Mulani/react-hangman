import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from "./words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  revealWord() {
    return this.state.answer.split("").map((ltr) => ltr);
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        value={ltr}
        key={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  // restart game || reset state
  restartGame() {
    this.setState((currState) => {
      return {
        ...currState,
        nWrong: 0,
        guessed: new Set(),
        answer: randomWord(),
      };
    });
  }

  /** render: render game */
  render() {
    const { nWrong } = this.state;
    const { images, maxWrong } = this.props;
    let guessedWord = this.guessedWord();

    let gameStatus = "";
    if (!guessedWord.includes("_")) gameStatus = "You Win!!!";
    if (maxWrong == nWrong) gameStatus = "You Loose!!!";
    gameStatus && (guessedWord = this.revealWord());

    return (
      <div className="Hangman">
        <h4>Hangman</h4>
        <img src={images[nWrong]} alt={`${nWrong} wrong guess`} />
        <p>{`Guess Remaning ${nWrong}/${maxWrong}`}</p>
        <p className="Hangman-word">{guessedWord}</p>
        {gameStatus ? (
          <p>{gameStatus}</p>
        ) : (
          <p className="Hangman-btns">{this.generateButtons()}</p>
        )}
        {gameStatus && (
          <button onClick={this.restartGame} className="Hangman-restart-btn">
            Restart
          </button>
        )}
      </div>
    );
  }
}

export default Hangman;
