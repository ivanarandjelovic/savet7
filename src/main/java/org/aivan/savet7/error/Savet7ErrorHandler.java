package org.aivan.savet7.error;

import java.util.List;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.springframework.data.rest.core.RepositoryConstraintViolationException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class Savet7ErrorHandler {

    @ExceptionHandler(value = RepositoryConstraintViolationException.class)
    @ResponseStatus(org.springframework.http.HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Savet7ValidationErrors iOExceptionHandler(RepositoryConstraintViolationException ex) {
        Savet7ValidationErrors errors = new Savet7ValidationErrors();

        if (ex.getErrors() != null) {
            List<ObjectError> globalErrors = ex.getErrors().getGlobalErrors();
            List<FieldError> fieldErrors = ex.getErrors().getFieldErrors();
            for (ObjectError oe : globalErrors) {
                errors.addValidationError(new Savet7ValidationError(null, oe.getCode()));
            }
            for (FieldError fe : fieldErrors) {
                errors.addValidationError(new Savet7ValidationError(fe.getField(), fe.getCode()));
            }
        }

        return errors;
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    @ResponseStatus(org.springframework.http.HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Savet7ValidationErrors constraintValidationHandler(javax.validation.ConstraintViolationException cve) {
        Savet7ValidationErrors errors = new Savet7ValidationErrors();

        for (ConstraintViolation<?> cv : cve.getConstraintViolations()) {
            String field = cv.getPropertyPath().toString();
            String code = cv.getMessage();
            errors.addValidationError(new Savet7ValidationError(field, code));
        }

        return errors;
    }
    
}