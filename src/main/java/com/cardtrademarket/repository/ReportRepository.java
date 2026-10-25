package com.cardtrademarket.repository;

import com.cardtrademarket.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, String> {
    List<Report> findAllByOrderByFechaDesc();
    List<Report> findByCardId(String cardId);
    long countByCardId(String cardId);
    List<Report> findByEstadoOrderByFechaDesc(String estado);
    long countByEstado(String estado);
}
