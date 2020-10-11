package hu.pmamico.wh.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import hu.pmamico.wh.web.rest.TestUtil;

public class CurrencyHistoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CurrencyHistory.class);
        CurrencyHistory currencyHistory1 = new CurrencyHistory();
        currencyHistory1.setId(1L);
        CurrencyHistory currencyHistory2 = new CurrencyHistory();
        currencyHistory2.setId(currencyHistory1.getId());
        assertThat(currencyHistory1).isEqualTo(currencyHistory2);
        currencyHistory2.setId(2L);
        assertThat(currencyHistory1).isNotEqualTo(currencyHistory2);
        currencyHistory1.setId(null);
        assertThat(currencyHistory1).isNotEqualTo(currencyHistory2);
    }
}
