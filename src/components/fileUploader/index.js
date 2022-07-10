import React from 'react';
// import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';
// import CloudUploadIcon from '@material-ui/icons/CloudUploadIcon';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        // alignItems: 'flex-start'
    }
});

const FileUploader = ({ fileSelectHandler }) => {
    const classes = useStyles();

	const changeHandler = (event) => {
		fileSelectHandler(event.target.files[0]);
	};
    
    return (
        <div className={classes.root}>
            <Input
                type="file"
                inputProps={{accept:"application/pdf"}}
                required
                onChange={changeHandler}
            />
        </div>
    );
};

export default FileUploader;