package hu.pmamico.wh.web.rest;

import hu.pmamico.wh.service.CurrencyHistoryService;
import hu.pmamico.wh.web.rest.errors.BadRequestAlertException;
import hu.pmamico.wh.service.dto.CurrencyHistoryDTO;

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
 * REST controller for managing {@link hu.pmamico.wh.domain.CurrencyHistory}.
 */
@RestController
@RequestMapping("/api")
public class CurrencyHistoryResource {

    private final Logger log = LoggerFactory.getLogger(CurrencyHistoryResource.class);

    private static final String ENTITY_NAME = "currencyHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CurrencyHistoryService currencyHistoryService;

    public CurrencyHistoryResource(CurrencyHistoryService currencyHistoryService) {
        this.currencyHistoryService = currencyHistoryService;
    }

    /**
     * {@code POST  /currency-histories} : Create a new currencyHistory.
     *
     * @param currencyHistoryDTO the currencyHistoryDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new currencyHistoryDTO, or with status {@code 400 (Bad Request)} if the currencyHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/currency-histories")
    public ResponseEntity<CurrencyHistoryDTO> createCurrencyHistory(@RequestBody CurrencyHistoryDTO currencyHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save CurrencyHistory : {}", currencyHistoryDTO);
        if (currencyHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new currencyHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CurrencyHistoryDTO result = currencyHistoryService.save(currencyHistoryDTO);
        return ResponseEntity.created(new URI("/api/currency-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /currency-histories} : Updates an existing currencyHistory.
     *
     * @param currencyHistoryDTO the currencyHistoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated currencyHistoryDTO,
     * or with status {@code 400 (Bad Request)} if the currencyHistoryDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the currencyHistoryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/currency-histories")
    public ResponseEntity<CurrencyHistoryDTO> updateCurrencyHistory(@RequestBody CurrencyHistoryDTO currencyHistoryDTO) throws URISyntaxException {
        log.debug("REST request to update CurrencyHistory : {}", currencyHistoryDTO);
        if (currencyHistoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CurrencyHistoryDTO result = currencyHistoryService.save(currencyHistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, currencyHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /currency-histories} : get all the currencyHistories.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of currencyHistories in body.
     */
    @GetMapping("/currency-histories")
    public ResponseEntity<List<CurrencyHistoryDTO>> getAllCurrencyHistories(Pageable pageable) {
        log.debug("REST request to get a page of CurrencyHistories");
        Page<CurrencyHistoryDTO> page = currencyHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /currency-histories/:id} : get the "id" currencyHistory.
     *
     * @param id the id of the currencyHistoryDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the currencyHistoryDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/currency-histories/{id}")
    public ResponseEntity<CurrencyHistoryDTO> getCurrencyHistory(@PathVariable Long id) {
        log.debug("REST request to get CurrencyHistory : {}", id);
        Optional<CurrencyHistoryDTO> currencyHistoryDTO = currencyHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(currencyHistoryDTO);
    }

    /**
     * {@code DELETE  /currency-histories/:id} : delete the "id" currencyHistory.
     *
     * @param id the id of the currencyHistoryDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/currency-histories/{id}")
    public ResponseEntity<Void> deleteCurrencyHistory(@PathVariable Long id) {
        log.debug("REST request to delete CurrencyHistory : {}", id);
        currencyHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
