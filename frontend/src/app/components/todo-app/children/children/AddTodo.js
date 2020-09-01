import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { idGenerator } from './../../../../shared/services/random-services';

const AddTodo = ({ add }) => {

    const submit = (values, { resetForm }) => {
        values.key = new Date().getMilliseconds() + idGenerator() + values.text[values.text.length -1];
        add(values);
        resetForm();
    }
    
    const validationSchema = Yup.object().shape({ text: Yup.string().required('').min(3, "3 characters min") });

    return (
        <Formik
            onSubmit={ submit }
            initialValues={ { text:"", done:false, key: null } }
            validationSchema={ validationSchema }
        >
            {({ values, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Field className="form-control" name='text' value={values.text} placeholder='add todo' />
                    <ErrorMessage component='small' name="text" className="text-danger ml-2" />
                </form>
            )}
        </Formik>
    );
};

export default AddTodo;