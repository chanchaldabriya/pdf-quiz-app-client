import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Quiz from './pages/Quiz';
import { HOME, QUIZ } from './constants/routeConstants';
import './App.css';
import AppBar from './components/appBar';
import CreateQuiz from './components/createQuiz';

function App() {
  const [ questions, setQuestions ] = useState([]);
  const [ answers, setAnswers ] = useState([]);

  return (
    <div className="App">
      <AppBar />

      <div className="App-main">
        <Switch>
          <Route
            path={HOME}
            exact
            render={routeProps => (
              <Home>
                <CreateQuiz
                  setQuestions={setQuestions}
                  setAnswers={setAnswers}
                  questions={questions}
                  answers={answers}
                  {...routeProps}
                />
              </Home>
            )}
          />
          <Route
            path={QUIZ}
            exact
            render={routeProps => <Quiz questions={questions} answers={answers} {...routeProps} />}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
