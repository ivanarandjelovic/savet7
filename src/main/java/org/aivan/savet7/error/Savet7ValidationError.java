package org.aivan.savet7.error;

public class Savet7ValidationError {

    private String fieldName;
    private String errorCode;

    
    public Savet7ValidationError(String fieldName, String errorCode) {
        super();
        this.fieldName = fieldName;
        this.errorCode = errorCode;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

}
