package hu.pmamico.wh.service;

import hu.pmamico.wh.service.dto.WalletHistoryDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link hu.pmamico.wh.domain.WalletHistory}.
 */
public interface WalletHistoryService {

    /**
     * Save a walletHistory.
     *
     * @param walletHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    WalletHistoryDTO save(WalletHistoryDTO walletHistoryDTO);

    /**
     * Get all the walletHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<WalletHistoryDTO> findAll(Pageable pageable);


    /**
     * Get the "id" walletHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WalletHistoryDTO> findOne(Long id);

    /**
     * Delete the "id" walletHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
