package hu.pmamico.wh.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A CurrencyHistory.
 */
@Entity
@Table(name = "currency_history")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CurrencyHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "timestamp")
    private Instant timestamp;

    @Column(name = "currency_id")
    private Float currencyId;

    @Column(name = "value")
    private Float value;

    @OneToMany(mappedBy = "currencyHistory")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Currency> currencyIds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public CurrencyHistory timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Float getCurrencyId() {
        return currencyId;
    }

    public CurrencyHistory currencyId(Float currencyId) {
        this.currencyId = currencyId;
        return this;
    }

    public void setCurrencyId(Float currencyId) {
        this.currencyId = currencyId;
    }

    public Float getValue() {
        return value;
    }

    public CurrencyHistory value(Float value) {
        this.value = value;
        return this;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    public Set<Currency> getCurrencyIds() {
        return currencyIds;
    }

    public CurrencyHistory currencyIds(Set<Currency> currencies) {
        this.currencyIds = currencies;
        return this;
    }

    public CurrencyHistory addCurrencyId(Currency currency) {
        this.currencyIds.add(currency);
        currency.setCurrencyHistory(this);
        return this;
    }

    public CurrencyHistory removeCurrencyId(Currency currency) {
        this.currencyIds.remove(currency);
        currency.setCurrencyHistory(null);
        return this;
    }

    public void setCurrencyIds(Set<Currency> currencies) {
        this.currencyIds = currencies;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CurrencyHistory)) {
            return false;
        }
        return id != null && id.equals(((CurrencyHistory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CurrencyHistory{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", currencyId=" + getCurrencyId() +
            ", value=" + getValue() +
            "}";
    }
}
