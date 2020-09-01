import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const AddTodo = ({ add }) => {

    const submit = (values, { resetForm }) => {
        add(values);
        resetForm();
    }
    
    const validationSchema = Yup.object().shape({ text: Yup.string().required('').min(3, "3 characters min") });

    return (
        <Formik
            onSubmit={ submit }
            initialValues={ { text:"", isCompleted:false, id: null } }
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