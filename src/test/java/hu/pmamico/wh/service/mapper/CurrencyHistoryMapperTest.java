package hu.pmamico.wh.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class CurrencyHistoryMapperTest {

    private CurrencyHistoryMapper currencyHistoryMapper;

    @BeforeEach
    public void setUp() {
        currencyHistoryMapper = new CurrencyHistoryMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(currencyHistoryMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(currencyHistoryMapper.fromId(null)).isNull();
    }
}
