package org.aivan.savet7.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "savet7")
public class Savet7Configuration {

    private boolean useSlowFilter = false;

    public boolean isUseSlowFilter() {
        return useSlowFilter;
    }

    public void setUseSlowFilter(boolean useSlowFilter) {
        this.useSlowFilter = useSlowFilter;
    }

}
