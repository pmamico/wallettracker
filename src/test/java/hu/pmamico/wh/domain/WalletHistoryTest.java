package hu.pmamico.wh.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import hu.pmamico.wh.web.rest.TestUtil;

public class WalletHistoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WalletHistory.class);
        WalletHistory walletHistory1 = new WalletHistory();
        walletHistory1.setId(1L);
        WalletHistory walletHistory2 = new WalletHistory();
        walletHistory2.setId(walletHistory1.getId());
        assertThat(walletHistory1).isEqualTo(walletHistory2);
        walletHistory2.setId(2L);
        assertThat(walletHistory1).isNotEqualTo(walletHistory2);
        walletHistory1.setId(null);
        assertThat(walletHistory1).isNotEqualTo(walletHistory2);
    }
}
