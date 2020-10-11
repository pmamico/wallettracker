package hu.pmamico.wh.service.mapper;


import hu.pmamico.wh.domain.*;
import hu.pmamico.wh.service.dto.WalletHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link WalletHistory} and its DTO {@link WalletHistoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface WalletHistoryMapper extends EntityMapper<WalletHistoryDTO, WalletHistory> {


    @Mapping(target = "currencyIds", ignore = true)
    @Mapping(target = "removeCurrencyId", ignore = true)
    WalletHistory toEntity(WalletHistoryDTO walletHistoryDTO);

    default WalletHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        WalletHistory walletHistory = new WalletHistory();
        walletHistory.setId(id);
        return walletHistory;
    }
}
