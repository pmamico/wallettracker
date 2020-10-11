package hu.pmamico.wh.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class WalletHistoryMapperTest {

    private WalletHistoryMapper walletHistoryMapper;

    @BeforeEach
    public void setUp() {
        walletHistoryMapper = new WalletHistoryMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(walletHistoryMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(walletHistoryMapper.fromId(null)).isNull();
    }
}
