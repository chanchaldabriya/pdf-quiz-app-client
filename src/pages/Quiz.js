import React, { useState } from 'react';

import QuizCard from '../components/quizCard';
import { getLocalStorage } from '../util/jsUtils';
import { extractOptionValue } from '../util/common';
import { PARSED_QUESTIONS, PARSED_ANSWERS } from '../constants/localStorageConstants';

import {
    Toolbar,
    Button,    
    Snackbar
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    btnContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 'calc(70% + 40px)'
    },
    submitBtn: {
        alignSelf: ''
    }
});

const SINGLE_QUESTION_STYLE = true;

const Quiz = ({ questions, answers }) => {
    const classes = useStyles();

    const localStorageSavedQuestions = getLocalStorage(PARSED_QUESTIONS) || [];
    const parsedQuestions = questions.length ?
        [ ...questions ] :
        localStorageSavedQuestions.length ?
            [ ...localStorageSavedQuestions ] :
            [];

    const localStorageSavedAnswers = getLocalStorage(PARSED_ANSWERS) || [];
    const parsedAnswers = answers.length ?
        [ ...answers ] :
        localStorageSavedAnswers.length ?
            [ ...localStorageSavedAnswers ] :
            [];

    const [ currentQuestion, setCurrentQuestion ] = useState(0);            
    const { description = "", options = [] } = parsedQuestions.length ? parsedQuestions[ currentQuestion ] : {};
    const [ selectedOption, setSelectedOption ] = useState("");

    const [ showAnswerStatus, setShowAnswerStatus ] = useState(false);
    const [ isCorrect, setIsCorrect ] = useState(false);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const resetValues = () => {
        setShowAnswerStatus(false);
        setSelectedOption("");
        setIsCorrect(false);        
    };

    const previousQuestion = () => {
        resetValues();

        const newValue = currentQuestion - 1;
        setCurrentQuestion(newValue);
    };

    const nextQuestion = () => {
        resetValues();

        const newValue = currentQuestion + 1;
        setCurrentQuestion(newValue);
    };

    const checkAnswer = () => {
        if (selectedOption === extractOptionValue(parsedAnswers[ currentQuestion ])) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setShowAnswerStatus(true);
    };    

    return (
        <>
            {/* <h1>Quiz</h1> */}
            {
                description && options.length &&
                    <QuizCard
                        description={description}
                        options={options}
                        currentQuestion={currentQuestion}
                        totalQuestions={parsedQuestions.length}
                        selectedOption={selectedOption}
                        handleOptionChange={handleOptionChange}
                    />
            }
            {/* <ButtonGroup
                // orientation="vertical"
                color="primary"
                variant="contained"
                // aria-label="vertical outlined primary button group"
            >
            </ButtonGroup> */}
            <Toolbar disableGutters className={classes.btnContainer}>
                <Button
                    onClick={previousQuestion}
                    color="primary"
                    variant="contained"
                    disabled={currentQuestion === 0}
                    style={{visibility: SINGLE_QUESTION_STYLE ? "hidden" : "visible" }}
                >
                    {`< Previous`}
                </Button>
                <Button
                    onClick={checkAnswer}
                    color="primary"
                    variant="contained"
                    disabled={!selectedOption || showAnswerStatus}
                >
                    {`Submit`}
                </Button>
                <Button
                    onClick={nextQuestion}
                    color="primary"
                    variant="contained"
                    disabled={currentQuestion === parsedQuestions.length - 1}
                    style={{visibility: SINGLE_QUESTION_STYLE && !showAnswerStatus ? "hidden" : "visible" }}
                >
                    {`Next >`}
                </Button>
            </Toolbar>

            {
                showAnswerStatus && (
                    <Snackbar
                        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                        open={showAnswerStatus}
                        onClose={() => setShowAnswerStatus(false)}
                    >
                        <Alert
                            severity={isCorrect ? "success" : "error"}
                            variant="filled"
                        >
                            <AlertTitle>
                                {isCorrect ? "Correct" : "Wrong"} Answer
                            </AlertTitle>
                        </Alert>
                    </Snackbar>
                )
            }
        </>
    );
};

export default Quiz;