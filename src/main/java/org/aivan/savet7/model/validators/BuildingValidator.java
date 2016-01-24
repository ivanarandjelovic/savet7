package org.aivan.savet7.model.validators;

import org.aivan.savet7.model.Building;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class BuildingValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return clazz == Building.class;
    }

    @Override
    public void validate(Object target, Errors errors) {
        System.out.println("Validator called !!!!!!!!!!!!!!!!!");
    }

}
