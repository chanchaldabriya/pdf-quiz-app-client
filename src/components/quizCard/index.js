import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import {
    Card,
    CardContent,
    Typography,
    CardActions,
    FormControl,
    // FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@material-ui/core';

const useStyles = makeStyles({
    card: theme => ({
      width: '70%',
      margin: "0 20%",
      color: "#fff",
      backgroundColor: theme.palette.primary.main,
      padding: 20
    }),
    desc: {
        overflow: 'auto',
        whiteSpace: 'pre-wrap'
    },
    leftAlignText: {
        textAlign: 'start'
    }
    // legend: {
    //     color: "#fff",
    //     fontWeight: "bold"
    // }
});

const CustomRadio = withStyles({
    root: {
      color: blue[400],
      '&$checked': {
        color: blue[600]
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const QuizCard = ({
    description,
    options,
    currentQuestion,
    totalQuestions,
    selectedOption,
    handleOptionChange
}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Card raised className={classes.card}>
            <CardContent>
                <Typography gutterBottom component="h2" variant="h4">
                    { `Question ${currentQuestion + 1} of ${totalQuestions}` }
                </Typography>
                <Typography gutterBottom component="pre" className={`${classes.leftAlignText} ${classes.desc}`}>
                    { description }
                </Typography>
            </CardContent>
            <CardActions>
                <FormControl component="fieldset">
                    {/* <FormLabel
                        component="legend"
                        className={[classes.leftAlignText, classes.legend]}
                    >
                        Select an Option:
                    </FormLabel> */}
                    <RadioGroup aria-label="quiz" name="quiz" value={selectedOption} onChange={handleOptionChange}>
                        <FormControlLabel value="a" control={<CustomRadio />} label={options[ 0 ]} />
                        <FormControlLabel value="b" control={<CustomRadio />} label={options[ 1 ]} />
                        <FormControlLabel value="c" control={<CustomRadio />} label={options[ 2 ]} />
                        <FormControlLabel value="d" control={<CustomRadio />} label={options[ 3 ]} />
                    </RadioGroup>
                </FormControl>
            </CardActions>
        </Card>
    );
};

export default QuizCard;