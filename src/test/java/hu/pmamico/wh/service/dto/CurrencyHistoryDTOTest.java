package hu.pmamico.wh.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import hu.pmamico.wh.web.rest.TestUtil;

public class CurrencyHistoryDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CurrencyHistoryDTO.class);
        CurrencyHistoryDTO currencyHistoryDTO1 = new CurrencyHistoryDTO();
        currencyHistoryDTO1.setId(1L);
        CurrencyHistoryDTO currencyHistoryDTO2 = new CurrencyHistoryDTO();
        assertThat(currencyHistoryDTO1).isNotEqualTo(currencyHistoryDTO2);
        currencyHistoryDTO2.setId(currencyHistoryDTO1.getId());
        assertThat(currencyHistoryDTO1).isEqualTo(currencyHistoryDTO2);
        currencyHistoryDTO2.setId(2L);
        assertThat(currencyHistoryDTO1).isNotEqualTo(currencyHistoryDTO2);
        currencyHistoryDTO1.setId(null);
        assertThat(currencyHistoryDTO1).isNotEqualTo(currencyHistoryDTO2);
    }
}
