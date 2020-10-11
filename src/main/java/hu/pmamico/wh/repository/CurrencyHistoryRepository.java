package hu.pmamico.wh.repository;

import hu.pmamico.wh.domain.CurrencyHistory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CurrencyHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CurrencyHistoryRepository extends JpaRepository<CurrencyHistory, Long> {
}
