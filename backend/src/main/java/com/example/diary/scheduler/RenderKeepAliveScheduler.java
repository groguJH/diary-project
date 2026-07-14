package com.example.diary.scheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class RenderKeepAliveScheduler {

    private static final Logger log = LoggerFactory.getLogger(RenderKeepAliveScheduler.class);

    private final boolean enabled;
    private final RestClient restClient;
    private final String url;

    public RenderKeepAliveScheduler(
            @Value("${app.keep-alive.enabled:false}") boolean enabled,
            @Value("${app.keep-alive.url:}") String url
    ) {
        this.enabled = enabled;
        this.url = url;
        this.restClient = RestClient.create();
    }

    @Scheduled(
            fixedDelayString = "${app.keep-alive.fixed-delay-ms:600000}",
            initialDelayString = "${app.keep-alive.initial-delay-ms:30000}"
    )
    public void knockRenderServer() {
        if (!enabled || url == null || url.isBlank()) {
            return;
        }

        try {
            restClient.get()
                    .uri(url)
                    .retrieve()
                    .toBodilessEntity();
            log.info("Render keep-alive knock succeeded.");
        } catch (RuntimeException exception) {
            log.warn("Render keep-alive knock failed: {}", exception.getMessage());
        }
    }
}
