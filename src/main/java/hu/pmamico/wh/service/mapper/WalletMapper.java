package hu.pmamico.wh.service.mapper;


import hu.pmamico.wh.domain.*;
import hu.pmamico.wh.service.dto.WalletDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Wallet} and its DTO {@link WalletDTO}.
 */
@Mapper(componentModel = "spring", uses = {WalletHistoryMapper.class})
public interface WalletMapper extends EntityMapper<WalletDTO, Wallet> {

    @Mapping(source = "walletHistory.id", target = "walletHistoryId")
    WalletDTO toDto(Wallet wallet);

    @Mapping(source = "walletHistoryId", target = "walletHistory")
    Wallet toEntity(WalletDTO walletDTO);

    default Wallet fromId(Long id) {
        if (id == null) {
            return null;
        }
        Wallet wallet = new Wallet();
        wallet.setId(id);
        return wallet;
    }
}
