package com.cardtrademarket.repository;

import com.cardtrademarket.model.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, String> {
    Optional<Follow> findByFollowerIdAndFollowingId(String followerId, String followingId);
    List<Follow> findByFollowingId(String followingId);
    List<Follow> findByFollowerId(String followerId);
    long countByFollowingId(String followingId);
    long countByFollowerId(String followerId);
    void deleteByFollowerIdAndFollowingId(String followerId, String followingId);
}
