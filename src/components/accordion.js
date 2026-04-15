export function accordion(){
    return ` <div class="accordion" id="searchAccordion">
        <div class="accordion-item">
            <button class="accordion-item-header">
                Pilotos
                <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-item-body">
                <input type="search" id="pilotos-input-search" placeholder="Buscar...">
                <div id="pilotos_card_container">
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <button class="accordion-item-header">
                Circuitos
                <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-item-body">
                <input type="search" id="circuitos-input-search" placeholder="Buscar...">
                <div id="circuitos_card_container">
                </div>
            </div>
        </div>
    </div>`;
}