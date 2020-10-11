package hu.pmamico.wh.service;

import hu.pmamico.wh.service.dto.CurrencyHistoryDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link hu.pmamico.wh.domain.CurrencyHistory}.
 */
public interface CurrencyHistoryService {

    /**
     * Save a currencyHistory.
     *
     * @param currencyHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    CurrencyHistoryDTO save(CurrencyHistoryDTO currencyHistoryDTO);

    /**
     * Get all the currencyHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CurrencyHistoryDTO> findAll(Pageable pageable);


    /**
     * Get the "id" currencyHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CurrencyHistoryDTO> findOne(Long id);

    /**
     * Delete the "id" currencyHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
