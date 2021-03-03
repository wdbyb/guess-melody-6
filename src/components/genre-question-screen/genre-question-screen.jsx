import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import GenreQuestionItem from "../genre-question-item/genre-question-item";
import genreQuestionProp from './genre-question.prop';
import {useUserAnswers} from '../../hooks/use-user-answers';

const GenreQuestionScreen = (props) => {
  const {onAnswer, question, renderPlayer, children} = props;
  const {answers, genre} = question;
  const [userAnswers, handleAnswer, handleAnswerChange] = useUserAnswers(question, onAnswer);
  return (
    <section className="game game--genre">
      <header className="game__header">
        <Link className="game__back" to="/">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </Link>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
        </svg>

        {children}
      </header>

      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            handleAnswer(question, userAnswers);
          }}
        >
          {answers.map((answer, id) => (
            <GenreQuestionItem
              answer={answer}
              id={id}
              key={`${id}-${answer.src}`}
              onChange={handleAnswerChange}
              renderPlayer={renderPlayer}
              userAnswer={userAnswers[id]}
            />
          ))}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>
  );
};

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: genreQuestionProp,
  renderPlayer: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default GenreQuestionScreen;
