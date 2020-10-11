package hu.pmamico.wh.repository;

import hu.pmamico.wh.domain.WalletHistory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the WalletHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WalletHistoryRepository extends JpaRepository<WalletHistory, Long> {
}
