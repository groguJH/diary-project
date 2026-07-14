package com.example.diary.repository;

import java.util.Optional;
import java.util.UUID;
import com.example.diary.entity.OAuthAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OAuthAccountRepository extends JpaRepository<OAuthAccount, UUID> {
    Optional<OAuthAccount> findByProviderAndProviderUserId(String provider, String providerUserId); 
    
}
