package hu.pmamico.wh.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link hu.pmamico.wh.domain.Wallet} entity.
 */
public class WalletDTO implements Serializable {
    
    private Long id;

    private Integer currencyId;

    private Float currentValue;

    private String name;


    private Long walletHistoryId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Integer currencyId) {
        this.currencyId = currencyId;
    }

    public Float getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(Float currentValue) {
        this.currentValue = currentValue;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getWalletHistoryId() {
        return walletHistoryId;
    }

    public void setWalletHistoryId(Long walletHistoryId) {
        this.walletHistoryId = walletHistoryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WalletDTO)) {
            return false;
        }

        return id != null && id.equals(((WalletDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WalletDTO{" +
            "id=" + getId() +
            ", currencyId=" + getCurrencyId() +
            ", currentValue=" + getCurrentValue() +
            ", name='" + getName() + "'" +
            ", walletHistoryId=" + getWalletHistoryId() +
            "}";
    }
}
