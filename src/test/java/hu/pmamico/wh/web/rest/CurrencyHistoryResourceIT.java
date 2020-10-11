package hu.pmamico.wh.web.rest;

import hu.pmamico.wh.WallethistoryApp;
import hu.pmamico.wh.domain.CurrencyHistory;
import hu.pmamico.wh.repository.CurrencyHistoryRepository;
import hu.pmamico.wh.service.CurrencyHistoryService;
import hu.pmamico.wh.service.dto.CurrencyHistoryDTO;
import hu.pmamico.wh.service.mapper.CurrencyHistoryMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CurrencyHistoryResource} REST controller.
 */
@SpringBootTest(classes = WallethistoryApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CurrencyHistoryResourceIT {

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Float DEFAULT_CURRENCY_ID = 1F;
    private static final Float UPDATED_CURRENCY_ID = 2F;

    private static final Float DEFAULT_VALUE = 1F;
    private static final Float UPDATED_VALUE = 2F;

    @Autowired
    private CurrencyHistoryRepository currencyHistoryRepository;

    @Autowired
    private CurrencyHistoryMapper currencyHistoryMapper;

    @Autowired
    private CurrencyHistoryService currencyHistoryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCurrencyHistoryMockMvc;

    private CurrencyHistory currencyHistory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CurrencyHistory createEntity(EntityManager em) {
        CurrencyHistory currencyHistory = new CurrencyHistory()
            .timestamp(DEFAULT_TIMESTAMP)
            .currencyId(DEFAULT_CURRENCY_ID)
            .value(DEFAULT_VALUE);
        return currencyHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CurrencyHistory createUpdatedEntity(EntityManager em) {
        CurrencyHistory currencyHistory = new CurrencyHistory()
            .timestamp(UPDATED_TIMESTAMP)
            .currencyId(UPDATED_CURRENCY_ID)
            .value(UPDATED_VALUE);
        return currencyHistory;
    }

    @BeforeEach
    public void initTest() {
        currencyHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createCurrencyHistory() throws Exception {
        int databaseSizeBeforeCreate = currencyHistoryRepository.findAll().size();
        // Create the CurrencyHistory
        CurrencyHistoryDTO currencyHistoryDTO = currencyHistoryMapper.toDto(currencyHistory);
        restCurrencyHistoryMockMvc.perform(post("/api/currency-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(currencyHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the CurrencyHistory in the database
        List<CurrencyHistory> currencyHistoryList = currencyHistoryRepository.findAll();
        assertThat(currencyHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        CurrencyHistory testCurrencyHistory = currencyHistoryList.get(currencyHistoryList.size() - 1);
        assertThat(testCurrencyHistory.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testCurrencyHistory.getCurrencyId()).isEqualTo(DEFAULT_CURRENCY_ID);
        assertThat(testCurrencyHistory.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createCurrencyHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = currencyHistoryRepository.findAll().size();

        // Create the CurrencyHistory with an existing ID
        currencyHistory.setId(1L);
        CurrencyHistoryDTO currencyHistoryDTO = currencyHistoryMapper.toDto(currencyHistory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCurrencyHistoryMockMvc.perform(post("/api/currency-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(currencyHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CurrencyHistory in the database
        List<CurrencyHistory> currencyHistoryList = currencyHistoryRepository.findAll();
        assertThat(currencyHistoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCurrencyHistories() throws Exception {
        // Initialize the database
        currencyHistoryRepository.saveAndFlush(currencyHistory);

        // Get all the currencyHistoryList
        restCurrencyHistoryMockMvc.perform(get("/api/currency-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(currencyHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].currencyId").value(hasItem(DEFAULT_CURRENCY_ID.doubleValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getCurrencyHistory() throws Exception {
        // Initialize the database
        currencyHistoryRepository.saveAndFlush(currencyHistory);

        // Get the currencyHistory
        restCurrencyHistoryMockMvc.perform(get("/api/currency-histories/{id}", currencyHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(currencyHistory.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.currencyId").value(DEFAULT_CURRENCY_ID.doubleValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCurrencyHistory() throws Exception {
        // Get the currencyHistory
        restCurrencyHistoryMockMvc.perform(get("/api/currency-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCurrencyHistory() throws Exception {
        // Initialize the database
        currencyHistoryRepository.saveAndFlush(currencyHistory);

        int databaseSizeBeforeUpdate = currencyHistoryRepository.findAll().size();

        // Update the currencyHistory
        CurrencyHistory updatedCurrencyHistory = currencyHistoryRepository.findById(currencyHistory.getId()).get();
        // Disconnect from session so that the updates on updatedCurrencyHistory are not directly saved in db
        em.detach(updatedCurrencyHistory);
        updatedCurrencyHistory
            .timestamp(UPDATED_TIMESTAMP)
            .currencyId(UPDATED_CURRENCY_ID)
            .value(UPDATED_VALUE);
        CurrencyHistoryDTO currencyHistoryDTO = currencyHistoryMapper.toDto(updatedCurrencyHistory);

        restCurrencyHistoryMockMvc.perform(put("/api/currency-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(currencyHistoryDTO)))
            .andExpect(status().isOk());

        // Validate the CurrencyHistory in the database
        List<CurrencyHistory> currencyHistoryList = currencyHistoryRepository.findAll();
        assertThat(currencyHistoryList).hasSize(databaseSizeBeforeUpdate);
        CurrencyHistory testCurrencyHistory = currencyHistoryList.get(currencyHistoryList.size() - 1);
        assertThat(testCurrencyHistory.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testCurrencyHistory.getCurrencyId()).isEqualTo(UPDATED_CURRENCY_ID);
        assertThat(testCurrencyHistory.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingCurrencyHistory() throws Exception {
        int databaseSizeBeforeUpdate = currencyHistoryRepository.findAll().size();

        // Create the CurrencyHistory
        CurrencyHistoryDTO currencyHistoryDTO = currencyHistoryMapper.toDto(currencyHistory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCurrencyHistoryMockMvc.perform(put("/api/currency-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(currencyHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CurrencyHistory in the database
        List<CurrencyHistory> currencyHistoryList = currencyHistoryRepository.findAll();
        assertThat(currencyHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCurrencyHistory() throws Exception {
        // Initialize the database
        currencyHistoryRepository.saveAndFlush(currencyHistory);

        int databaseSizeBeforeDelete = currencyHistoryRepository.findAll().size();

        // Delete the currencyHistory
        restCurrencyHistoryMockMvc.perform(delete("/api/currency-histories/{id}", currencyHistory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CurrencyHistory> currencyHistoryList = currencyHistoryRepository.findAll();
        assertThat(currencyHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
