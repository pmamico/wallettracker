package hu.pmamico.wh.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Wallet.
 */
@Entity
@Table(name = "wallet")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Wallet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "currency_id")
    private Integer currencyId;

    @Column(name = "current_value")
    private Float currentValue;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JsonIgnoreProperties(value = "currencyIds", allowSetters = true)
    private WalletHistory walletHistory;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCurrencyId() {
        return currencyId;
    }

    public Wallet currencyId(Integer currencyId) {
        this.currencyId = currencyId;
        return this;
    }

    public void setCurrencyId(Integer currencyId) {
        this.currencyId = currencyId;
    }

    public Float getCurrentValue() {
        return currentValue;
    }

    public Wallet currentValue(Float currentValue) {
        this.currentValue = currentValue;
        return this;
    }

    public void setCurrentValue(Float currentValue) {
        this.currentValue = currentValue;
    }

    public String getName() {
        return name;
    }

    public Wallet name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public WalletHistory getWalletHistory() {
        return walletHistory;
    }

    public Wallet walletHistory(WalletHistory walletHistory) {
        this.walletHistory = walletHistory;
        return this;
    }

    public void setWalletHistory(WalletHistory walletHistory) {
        this.walletHistory = walletHistory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Wallet)) {
            return false;
        }
        return id != null && id.equals(((Wallet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Wallet{" +
            "id=" + getId() +
            ", currencyId=" + getCurrencyId() +
            ", currentValue=" + getCurrentValue() +
            ", name='" + getName() + "'" +
            "}";
    }
}
