package hu.pmamico.wh.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A WalletHistory.
 */
@Entity
@Table(name = "wallet_history")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WalletHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "wallet_id")
    private Integer walletId;

    @Column(name = "timestamp")
    private Instant timestamp;

    @Column(name = "value")
    private Float value;

    @OneToMany(mappedBy = "walletHistory")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Wallet> currencyIds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getWalletId() {
        return walletId;
    }

    public WalletHistory walletId(Integer walletId) {
        this.walletId = walletId;
        return this;
    }

    public void setWalletId(Integer walletId) {
        this.walletId = walletId;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public WalletHistory timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Float getValue() {
        return value;
    }

    public WalletHistory value(Float value) {
        this.value = value;
        return this;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    public Set<Wallet> getCurrencyIds() {
        return currencyIds;
    }

    public WalletHistory currencyIds(Set<Wallet> wallets) {
        this.currencyIds = wallets;
        return this;
    }

    public WalletHistory addCurrencyId(Wallet wallet) {
        this.currencyIds.add(wallet);
        wallet.setWalletHistory(this);
        return this;
    }

    public WalletHistory removeCurrencyId(Wallet wallet) {
        this.currencyIds.remove(wallet);
        wallet.setWalletHistory(null);
        return this;
    }

    public void setCurrencyIds(Set<Wallet> wallets) {
        this.currencyIds = wallets;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WalletHistory)) {
            return false;
        }
        return id != null && id.equals(((WalletHistory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WalletHistory{" +
            "id=" + getId() +
            ", walletId=" + getWalletId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", value=" + getValue() +
            "}";
    }
}
