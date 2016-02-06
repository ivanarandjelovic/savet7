package org.aivan.savet7.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "savet7")
public class Savet7Configuration {

    private boolean useSlowFilter = false;
    private boolean allowCORS = false;
    private String allowCORSOrigin;

    public boolean isUseSlowFilter() {
        return useSlowFilter;
    }

    public void setUseSlowFilter(boolean useSlowFilter) {
        this.useSlowFilter = useSlowFilter;
    }

    public boolean isAllowCORS() {
        return allowCORS;
    }

    public void setAllowCORS(boolean allowCORS) {
        this.allowCORS = allowCORS;
    }

    public String getAllowCORSOrigin() {
        return allowCORSOrigin;
    }

    public void setAllowCORSOrigin(String allowCORSOrigin) {
        this.allowCORSOrigin = allowCORSOrigin;
    }
    
    

}
