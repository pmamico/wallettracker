package hu.pmamico.wh.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import hu.pmamico.wh.web.rest.TestUtil;

public class WalletHistoryDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WalletHistoryDTO.class);
        WalletHistoryDTO walletHistoryDTO1 = new WalletHistoryDTO();
        walletHistoryDTO1.setId(1L);
        WalletHistoryDTO walletHistoryDTO2 = new WalletHistoryDTO();
        assertThat(walletHistoryDTO1).isNotEqualTo(walletHistoryDTO2);
        walletHistoryDTO2.setId(walletHistoryDTO1.getId());
        assertThat(walletHistoryDTO1).isEqualTo(walletHistoryDTO2);
        walletHistoryDTO2.setId(2L);
        assertThat(walletHistoryDTO1).isNotEqualTo(walletHistoryDTO2);
        walletHistoryDTO1.setId(null);
        assertThat(walletHistoryDTO1).isNotEqualTo(walletHistoryDTO2);
    }
}
