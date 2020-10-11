package hu.pmamico.wh.web.rest;

import hu.pmamico.wh.WallethistoryApp;
import hu.pmamico.wh.domain.WalletHistory;
import hu.pmamico.wh.repository.WalletHistoryRepository;
import hu.pmamico.wh.service.WalletHistoryService;
import hu.pmamico.wh.service.dto.WalletHistoryDTO;
import hu.pmamico.wh.service.mapper.WalletHistoryMapper;

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
 * Integration tests for the {@link WalletHistoryResource} REST controller.
 */
@SpringBootTest(classes = WallethistoryApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class WalletHistoryResourceIT {

    private static final Integer DEFAULT_WALLET_ID = 1;
    private static final Integer UPDATED_WALLET_ID = 2;

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Float DEFAULT_VALUE = 1F;
    private static final Float UPDATED_VALUE = 2F;

    @Autowired
    private WalletHistoryRepository walletHistoryRepository;

    @Autowired
    private WalletHistoryMapper walletHistoryMapper;

    @Autowired
    private WalletHistoryService walletHistoryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWalletHistoryMockMvc;

    private WalletHistory walletHistory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WalletHistory createEntity(EntityManager em) {
        WalletHistory walletHistory = new WalletHistory()
            .walletId(DEFAULT_WALLET_ID)
            .timestamp(DEFAULT_TIMESTAMP)
            .value(DEFAULT_VALUE);
        return walletHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WalletHistory createUpdatedEntity(EntityManager em) {
        WalletHistory walletHistory = new WalletHistory()
            .walletId(UPDATED_WALLET_ID)
            .timestamp(UPDATED_TIMESTAMP)
            .value(UPDATED_VALUE);
        return walletHistory;
    }

    @BeforeEach
    public void initTest() {
        walletHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createWalletHistory() throws Exception {
        int databaseSizeBeforeCreate = walletHistoryRepository.findAll().size();
        // Create the WalletHistory
        WalletHistoryDTO walletHistoryDTO = walletHistoryMapper.toDto(walletHistory);
        restWalletHistoryMockMvc.perform(post("/api/wallet-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(walletHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the WalletHistory in the database
        List<WalletHistory> walletHistoryList = walletHistoryRepository.findAll();
        assertThat(walletHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        WalletHistory testWalletHistory = walletHistoryList.get(walletHistoryList.size() - 1);
        assertThat(testWalletHistory.getWalletId()).isEqualTo(DEFAULT_WALLET_ID);
        assertThat(testWalletHistory.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testWalletHistory.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createWalletHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = walletHistoryRepository.findAll().size();

        // Create the WalletHistory with an existing ID
        walletHistory.setId(1L);
        WalletHistoryDTO walletHistoryDTO = walletHistoryMapper.toDto(walletHistory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWalletHistoryMockMvc.perform(post("/api/wallet-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(walletHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WalletHistory in the database
        List<WalletHistory> walletHistoryList = walletHistoryRepository.findAll();
        assertThat(walletHistoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllWalletHistories() throws Exception {
        // Initialize the database
        walletHistoryRepository.saveAndFlush(walletHistory);

        // Get all the walletHistoryList
        restWalletHistoryMockMvc.perform(get("/api/wallet-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(walletHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].walletId").value(hasItem(DEFAULT_WALLET_ID)))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getWalletHistory() throws Exception {
        // Initialize the database
        walletHistoryRepository.saveAndFlush(walletHistory);

        // Get the walletHistory
        restWalletHistoryMockMvc.perform(get("/api/wallet-histories/{id}", walletHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(walletHistory.getId().intValue()))
            .andExpect(jsonPath("$.walletId").value(DEFAULT_WALLET_ID))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingWalletHistory() throws Exception {
        // Get the walletHistory
        restWalletHistoryMockMvc.perform(get("/api/wallet-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWalletHistory() throws Exception {
        // Initialize the database
        walletHistoryRepository.saveAndFlush(walletHistory);

        int databaseSizeBeforeUpdate = walletHistoryRepository.findAll().size();

        // Update the walletHistory
        WalletHistory updatedWalletHistory = walletHistoryRepository.findById(walletHistory.getId()).get();
        // Disconnect from session so that the updates on updatedWalletHistory are not directly saved in db
        em.detach(updatedWalletHistory);
        updatedWalletHistory
            .walletId(UPDATED_WALLET_ID)
            .timestamp(UPDATED_TIMESTAMP)
            .value(UPDATED_VALUE);
        WalletHistoryDTO walletHistoryDTO = walletHistoryMapper.toDto(updatedWalletHistory);

        restWalletHistoryMockMvc.perform(put("/api/wallet-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(walletHistoryDTO)))
            .andExpect(status().isOk());

        // Validate the WalletHistory in the database
        List<WalletHistory> walletHistoryList = walletHistoryRepository.findAll();
        assertThat(walletHistoryList).hasSize(databaseSizeBeforeUpdate);
        WalletHistory testWalletHistory = walletHistoryList.get(walletHistoryList.size() - 1);
        assertThat(testWalletHistory.getWalletId()).isEqualTo(UPDATED_WALLET_ID);
        assertThat(testWalletHistory.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testWalletHistory.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingWalletHistory() throws Exception {
        int databaseSizeBeforeUpdate = walletHistoryRepository.findAll().size();

        // Create the WalletHistory
        WalletHistoryDTO walletHistoryDTO = walletHistoryMapper.toDto(walletHistory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWalletHistoryMockMvc.perform(put("/api/wallet-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(walletHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WalletHistory in the database
        List<WalletHistory> walletHistoryList = walletHistoryRepository.findAll();
        assertThat(walletHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWalletHistory() throws Exception {
        // Initialize the database
        walletHistoryRepository.saveAndFlush(walletHistory);

        int databaseSizeBeforeDelete = walletHistoryRepository.findAll().size();

        // Delete the walletHistory
        restWalletHistoryMockMvc.perform(delete("/api/wallet-histories/{id}", walletHistory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WalletHistory> walletHistoryList = walletHistoryRepository.findAll();
        assertThat(walletHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
