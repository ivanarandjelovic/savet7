package org.aivan.savet7.error;

import java.util.ArrayList;
import java.util.List;

public class Savet7ValidationErrors {

    List<Savet7ValidationError> validationErrors = new ArrayList<>();

    public List<Savet7ValidationError> getValidationErrors() {
        return validationErrors;
    }

    public void addValidationError(Savet7ValidationError error) {
        validationErrors.add(error);
    }

    public void addValidationErrors(Savet7ValidationErrors validationErrors) {
        this.validationErrors.addAll(validationErrors.getValidationErrors());
    }
}
