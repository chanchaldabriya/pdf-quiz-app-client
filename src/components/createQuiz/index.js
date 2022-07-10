import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import {
    Card,
    CardContent,
    TextField,
    Typography,
    FormLabel,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

import FileUploader from '../fileUploader';
import { QUIZ } from '../../constants/routeConstants';

import { PARSED_QUESTIONS, PARSED_ANSWERS } from '../../constants/localStorageConstants';
import { setLocalStorage } from '../../util/jsUtils';
import useFormInput from '../../hooks/useFormInput';
import { appendQueryParams } from '../../util/common';

const useStyles = makeStyles({
    card: theme => ({
      width: "70%",
      margin: "0 10%",
      color: "#fff",
      backgroundColor: theme.palette.secondary.main,
      padding: 20
    }),
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    form: {
        justifyContent: 'center',
        // alignItems: 'flex-start'
        '& > *': {
            margin: "15px 0"
        }
    },
    leftAlignText: {
        textAlign: 'start'
    },
    QnAoptionsContainer: {
        display: 'flex',
        '& > *': {
            flex: 1,
            '&:nth-child(1)': {
                marginRight: 10
            },
            '&:nth-child(2)': {
                marginLeft: 10
            }
        }
    },
    uploadBtn: {
        marginTop: 15
    }
});

const CreateQuiz = ({
    setQuestions,
    setAnswers,
    questions,
    answers
}) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const history = useHistory();

    const [questionsFile, setQuestionsFile] = useState();
    const [answersFile, setAnswersFile] = useState();

    const [questionStartPage, setQuestionStartPage] = useFormInput("");
    const [maxQuestionPages, setMaxQuestionPages] = useFormInput("");
    const [answerStartPage, setAnswerStartPage] = useFormInput("");
    const [maxAnswerPages, setMaxAnswerPages] = useFormInput("");

    const createNewQuiz = () => {
        history.push(QUIZ);
    };

    const createFormData = (e, file) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        return formData;
    };

    const uploadFile = async (formData, url, handler, localStorageKey) => {
        const response = await fetch(url, {
            method: "post",
            body: formData
        });
        const data = await response.json();

        if (typeof handler === "function") {
            handler(data);
        }
        if (localStorageKey && data && data.length) {
            setLocalStorage(localStorageKey, data);
        }
    };

    const uploadQuestionsFile = (e) => {
        const formData = createFormData(e, questionsFile);
        const params = {
            ...(questionStartPage && {startPage: questionStartPage}),
            ...(maxQuestionPages && {maxPages: maxQuestionPages}),
        };

        const url = appendQueryParams("http://localhost:4000/parseQuestions", params);
        uploadFile(formData, url, setQuestions, PARSED_QUESTIONS);
    };

    const uploadAnswersFile = (e) => {
        const formData = createFormData(e, answersFile);
        const params = {
            ...(answerStartPage && {startPage: answerStartPage}),
            ...(maxAnswerPages && {maxPages: maxAnswerPages}),
        };

        const url = appendQueryParams("http://localhost:4000/parseAnswers", params);
        uploadFile(formData, url, setAnswers, PARSED_ANSWERS);
    };

    return (
        <Card raised className={classes.card}>
            <CardContent>
                <Typography gutterBottom component="h2" variant="h3">
                    Create New Quiz
                </Typography>
                <form className={`${classes.form} ${classes.flexColumn}`}>
                    <TextField label="Enter new Quiz Name" required />

                    <div className={classes.QnAoptionsContainer}>
                        <div className={`${classes.leftAlignText} ${classes.flexColumn}`}>
                            <FormLabel>Upload questions PDF file</FormLabel>
                            <FileUploader fileSelectHandler={setQuestionsFile} />
                            <TextField
                                label="Questions start page in PDF (default is 1)"
                                value={questionStartPage}
                                onChange={setQuestionStartPage}
                            />
                            <TextField
                                label="Max pages to be read from PDF (default- all pages)"
                                value={maxQuestionPages}
                                onChange={setMaxQuestionPages}
                            />
                            <Button
                                onClick={uploadQuestionsFile}
                                // startIcon={<CloudUploadIcon />}
                                color="primary"
                                variant="contained"
                                className={classes.uploadBtn}
                                disabled={!questionsFile}
                            >
                                Upload Questions File
                            </Button>
                        </div>
                        <div className={`${classes.leftAlignText} ${classes.flexColumn}`}>
                            <FormLabel>Upload answers PDF file</FormLabel>
                            <FileUploader fileSelectHandler={setAnswersFile} />
                            <TextField
                                label="Answers start page in PDF (default is 1)"
                                value={answerStartPage}
                                onChange={setAnswerStartPage}
                            />
                            <TextField
                                label="Max pages to be read from PDF (default- all pages)"
                                value={maxAnswerPages}
                                onChange={setMaxAnswerPages}
                            />
                            <Button
                                onClick={uploadAnswersFile}
                                // startIcon={<CloudUploadIcon />}
                                color="primary"
                                variant="contained"
                                className={classes.uploadBtn}
                                disabled={!answersFile}
                            >
                                Upload Answers File
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
            <Button
                onClick={createNewQuiz}
                color="primary"
                variant="contained"
                disabled={!(questions.length && answers.length)}
            >
                Create Quiz
            </Button>
        </Card>
    );
};

export default CreateQuiz;