package org.aivan.savet7.error;

public class Savet7ValidationError {

    private final String fieldName;
    private final String errorCode;

    
    public Savet7ValidationError(String fieldName, String errorCode) {
        super();
        this.fieldName = fieldName;
        this.errorCode = errorCode;
    }

    public String getFieldName() {
        return fieldName;
    }

    public String getErrorCode() {
        return errorCode;
    }

}
