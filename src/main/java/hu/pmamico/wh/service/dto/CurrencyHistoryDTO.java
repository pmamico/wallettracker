package hu.pmamico.wh.service.dto;

import java.time.Instant;
import java.io.Serializable;

/**
 * A DTO for the {@link hu.pmamico.wh.domain.CurrencyHistory} entity.
 */
public class CurrencyHistoryDTO implements Serializable {
    
    private Long id;

    private Instant timestamp;

    private Float currencyId;

    private Float value;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Float getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Float currencyId) {
        this.currencyId = currencyId;
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
        if (!(o instanceof CurrencyHistoryDTO)) {
            return false;
        }

        return id != null && id.equals(((CurrencyHistoryDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CurrencyHistoryDTO{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", currencyId=" + getCurrencyId() +
            ", value=" + getValue() +
            "}";
    }
}
