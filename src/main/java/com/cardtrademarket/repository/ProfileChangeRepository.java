package com.cardtrademarket.repository;

import com.cardtrademarket.model.ProfileChange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProfileChangeRepository extends JpaRepository<ProfileChange, String> {
    List<ProfileChange> findTop20ByUserIdOrderByFechaDesc(String userId);
}
