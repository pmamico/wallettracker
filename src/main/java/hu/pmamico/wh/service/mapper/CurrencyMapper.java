package hu.pmamico.wh.service.mapper;


import hu.pmamico.wh.domain.*;
import hu.pmamico.wh.service.dto.CurrencyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Currency} and its DTO {@link CurrencyDTO}.
 */
@Mapper(componentModel = "spring", uses = {CurrencyHistoryMapper.class})
public interface CurrencyMapper extends EntityMapper<CurrencyDTO, Currency> {

    @Mapping(source = "currencyHistory.id", target = "currencyHistoryId")
    CurrencyDTO toDto(Currency currency);

    @Mapping(source = "currencyHistoryId", target = "currencyHistory")
    Currency toEntity(CurrencyDTO currencyDTO);

    default Currency fromId(Long id) {
        if (id == null) {
            return null;
        }
        Currency currency = new Currency();
        currency.setId(id);
        return currency;
    }
}
