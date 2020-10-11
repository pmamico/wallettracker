package hu.pmamico.wh.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Currency.
 */
@Entity
@Table(name = "currency")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Currency implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "iso")
    private String iso;

    @ManyToOne
    @JsonIgnoreProperties(value = "currencyIds", allowSetters = true)
    private CurrencyHistory currencyHistory;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIso() {
        return iso;
    }

    public Currency iso(String iso) {
        this.iso = iso;
        return this;
    }

    public void setIso(String iso) {
        this.iso = iso;
    }

    public CurrencyHistory getCurrencyHistory() {
        return currencyHistory;
    }

    public Currency currencyHistory(CurrencyHistory currencyHistory) {
        this.currencyHistory = currencyHistory;
        return this;
    }

    public void setCurrencyHistory(CurrencyHistory currencyHistory) {
        this.currencyHistory = currencyHistory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Currency)) {
            return false;
        }
        return id != null && id.equals(((Currency) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Currency{" +
            "id=" + getId() +
            ", iso='" + getIso() + "'" +
            "}";
    }
}
