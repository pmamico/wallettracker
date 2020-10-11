package hu.pmamico.wh.service.impl;

import hu.pmamico.wh.service.WalletHistoryService;
import hu.pmamico.wh.domain.WalletHistory;
import hu.pmamico.wh.repository.WalletHistoryRepository;
import hu.pmamico.wh.service.dto.WalletHistoryDTO;
import hu.pmamico.wh.service.mapper.WalletHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link WalletHistory}.
 */
@Service
@Transactional
public class WalletHistoryServiceImpl implements WalletHistoryService {

    private final Logger log = LoggerFactory.getLogger(WalletHistoryServiceImpl.class);

    private final WalletHistoryRepository walletHistoryRepository;

    private final WalletHistoryMapper walletHistoryMapper;

    public WalletHistoryServiceImpl(WalletHistoryRepository walletHistoryRepository, WalletHistoryMapper walletHistoryMapper) {
        this.walletHistoryRepository = walletHistoryRepository;
        this.walletHistoryMapper = walletHistoryMapper;
    }

    @Override
    public WalletHistoryDTO save(WalletHistoryDTO walletHistoryDTO) {
        log.debug("Request to save WalletHistory : {}", walletHistoryDTO);
        WalletHistory walletHistory = walletHistoryMapper.toEntity(walletHistoryDTO);
        walletHistory = walletHistoryRepository.save(walletHistory);
        return walletHistoryMapper.toDto(walletHistory);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<WalletHistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all WalletHistories");
        return walletHistoryRepository.findAll(pageable)
            .map(walletHistoryMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<WalletHistoryDTO> findOne(Long id) {
        log.debug("Request to get WalletHistory : {}", id);
        return walletHistoryRepository.findById(id)
            .map(walletHistoryMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete WalletHistory : {}", id);
        walletHistoryRepository.deleteById(id);
    }
}
