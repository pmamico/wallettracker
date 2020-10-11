package hu.pmamico.wh.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link hu.pmamico.wh.domain.Currency} entity.
 */
public class CurrencyDTO implements Serializable {
    
    private Long id;

    private String iso;


    private Long currencyHistoryId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIso() {
        return iso;
    }

    public void setIso(String iso) {
        this.iso = iso;
    }

    public Long getCurrencyHistoryId() {
        return currencyHistoryId;
    }

    public void setCurrencyHistoryId(Long currencyHistoryId) {
        this.currencyHistoryId = currencyHistoryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CurrencyDTO)) {
            return false;
        }

        return id != null && id.equals(((CurrencyDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CurrencyDTO{" +
            "id=" + getId() +
            ", iso='" + getIso() + "'" +
            ", currencyHistoryId=" + getCurrencyHistoryId() +
            "}";
    }
}
