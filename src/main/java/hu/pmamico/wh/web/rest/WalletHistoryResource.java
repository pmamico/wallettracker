package hu.pmamico.wh.web.rest;

import hu.pmamico.wh.service.WalletHistoryService;
import hu.pmamico.wh.web.rest.errors.BadRequestAlertException;
import hu.pmamico.wh.service.dto.WalletHistoryDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link hu.pmamico.wh.domain.WalletHistory}.
 */
@RestController
@RequestMapping("/api")
public class WalletHistoryResource {

    private final Logger log = LoggerFactory.getLogger(WalletHistoryResource.class);

    private static final String ENTITY_NAME = "walletHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WalletHistoryService walletHistoryService;

    public WalletHistoryResource(WalletHistoryService walletHistoryService) {
        this.walletHistoryService = walletHistoryService;
    }

    /**
     * {@code POST  /wallet-histories} : Create a new walletHistory.
     *
     * @param walletHistoryDTO the walletHistoryDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new walletHistoryDTO, or with status {@code 400 (Bad Request)} if the walletHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/wallet-histories")
    public ResponseEntity<WalletHistoryDTO> createWalletHistory(@RequestBody WalletHistoryDTO walletHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save WalletHistory : {}", walletHistoryDTO);
        if (walletHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new walletHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WalletHistoryDTO result = walletHistoryService.save(walletHistoryDTO);
        return ResponseEntity.created(new URI("/api/wallet-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /wallet-histories} : Updates an existing walletHistory.
     *
     * @param walletHistoryDTO the walletHistoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated walletHistoryDTO,
     * or with status {@code 400 (Bad Request)} if the walletHistoryDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the walletHistoryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/wallet-histories")
    public ResponseEntity<WalletHistoryDTO> updateWalletHistory(@RequestBody WalletHistoryDTO walletHistoryDTO) throws URISyntaxException {
        log.debug("REST request to update WalletHistory : {}", walletHistoryDTO);
        if (walletHistoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WalletHistoryDTO result = walletHistoryService.save(walletHistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, walletHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /wallet-histories} : get all the walletHistories.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of walletHistories in body.
     */
    @GetMapping("/wallet-histories")
    public ResponseEntity<List<WalletHistoryDTO>> getAllWalletHistories(Pageable pageable) {
        log.debug("REST request to get a page of WalletHistories");
        Page<WalletHistoryDTO> page = walletHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /wallet-histories/:id} : get the "id" walletHistory.
     *
     * @param id the id of the walletHistoryDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the walletHistoryDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/wallet-histories/{id}")
    public ResponseEntity<WalletHistoryDTO> getWalletHistory(@PathVariable Long id) {
        log.debug("REST request to get WalletHistory : {}", id);
        Optional<WalletHistoryDTO> walletHistoryDTO = walletHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(walletHistoryDTO);
    }

    /**
     * {@code DELETE  /wallet-histories/:id} : delete the "id" walletHistory.
     *
     * @param id the id of the walletHistoryDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/wallet-histories/{id}")
    public ResponseEntity<Void> deleteWalletHistory(@PathVariable Long id) {
        log.debug("REST request to delete WalletHistory : {}", id);
        walletHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
