import { useState } from 'react';

const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const setFormInput = (e) => {
        setValue(e.target.value);
    };

    const resetFormInput = () => {
        setValue(initialValue);
    };

    return [value, setFormInput, resetFormInput];
};

export default useFormInput;