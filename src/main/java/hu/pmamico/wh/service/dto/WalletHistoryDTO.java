package hu.pmamico.wh.service.dto;

import java.time.Instant;
import java.io.Serializable;

/**
 * A DTO for the {@link hu.pmamico.wh.domain.WalletHistory} entity.
 */
public class WalletHistoryDTO implements Serializable {
    
    private Long id;

    private Integer walletId;

    private Instant timestamp;

    private Float value;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getWalletId() {
        return walletId;
    }

    public void setWalletId(Integer walletId) {
        this.walletId = walletId;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Float getValue() {
        return value;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WalletHistoryDTO)) {
            return false;
        }

        return id != null && id.equals(((WalletHistoryDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WalletHistoryDTO{" +
            "id=" + getId() +
            ", walletId=" + getWalletId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", value=" + getValue() +
            "}";
    }
}
