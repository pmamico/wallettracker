package hu.pmamico.wh.service.mapper;


import hu.pmamico.wh.domain.*;
import hu.pmamico.wh.service.dto.CurrencyHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link CurrencyHistory} and its DTO {@link CurrencyHistoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CurrencyHistoryMapper extends EntityMapper<CurrencyHistoryDTO, CurrencyHistory> {


    @Mapping(target = "currencyIds", ignore = true)
    @Mapping(target = "removeCurrencyId", ignore = true)
    CurrencyHistory toEntity(CurrencyHistoryDTO currencyHistoryDTO);

    default CurrencyHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        CurrencyHistory currencyHistory = new CurrencyHistory();
        currencyHistory.setId(id);
        return currencyHistory;
    }
}
