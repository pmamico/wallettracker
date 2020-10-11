package hu.pmamico.wh.service.impl;

import hu.pmamico.wh.service.CurrencyHistoryService;
import hu.pmamico.wh.domain.CurrencyHistory;
import hu.pmamico.wh.repository.CurrencyHistoryRepository;
import hu.pmamico.wh.service.dto.CurrencyHistoryDTO;
import hu.pmamico.wh.service.mapper.CurrencyHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link CurrencyHistory}.
 */
@Service
@Transactional
public class CurrencyHistoryServiceImpl implements CurrencyHistoryService {

    private final Logger log = LoggerFactory.getLogger(CurrencyHistoryServiceImpl.class);

    private final CurrencyHistoryRepository currencyHistoryRepository;

    private final CurrencyHistoryMapper currencyHistoryMapper;

    public CurrencyHistoryServiceImpl(CurrencyHistoryRepository currencyHistoryRepository, CurrencyHistoryMapper currencyHistoryMapper) {
        this.currencyHistoryRepository = currencyHistoryRepository;
        this.currencyHistoryMapper = currencyHistoryMapper;
    }

    @Override
    public CurrencyHistoryDTO save(CurrencyHistoryDTO currencyHistoryDTO) {
        log.debug("Request to save CurrencyHistory : {}", currencyHistoryDTO);
        CurrencyHistory currencyHistory = currencyHistoryMapper.toEntity(currencyHistoryDTO);
        currencyHistory = currencyHistoryRepository.save(currencyHistory);
        return currencyHistoryMapper.toDto(currencyHistory);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CurrencyHistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CurrencyHistories");
        return currencyHistoryRepository.findAll(pageable)
            .map(currencyHistoryMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<CurrencyHistoryDTO> findOne(Long id) {
        log.debug("Request to get CurrencyHistory : {}", id);
        return currencyHistoryRepository.findById(id)
            .map(currencyHistoryMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CurrencyHistory : {}", id);
        currencyHistoryRepository.deleteById(id);
    }
}
