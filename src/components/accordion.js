export function accordion(){
    return ` <div class="accordion" id="searchAccordion">
        <div class="accordion-item">
            <button class="accordion-item-header">
                Pilotos
                <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-collapse" id="accordion-pilotos">
                <div class="accordion-item-body">
                    <form id="pilotos-form" class="search-form">
                        <input type="search" class="input-search" id="pilotos-input-search" placeholder="Buscar...">
                        <small id="pilotos-error-nombre" class="error"></small>
                        <div class="radio-container">
                            <span class="radio-description">Temporadas</span>
                            <input type="radio" id="pilotos-s-2026" name="season" value="2026">
                            <label for="pilotos-s-2026">2026</label>
                            <input type="radio" id="pilotos-s-2025" name="season" value="2025">
                            <label for="pilotos-s-2025">2025</label>
                            <input type="radio" id="pilotos-s-0" name="season" value="0">
                            <label for="pilotos-s-0">Todas</label>
                        </div>
                        <small id="pilotos-error-season" class="error"></small>
                        <div class = "select-container">
                            <label for="select-nacionalidad" class="select-description">Nacionalidad</label>
                            <select id="select-nacionalidad" class="select-box">
                                <option value="">Seleccionar...</option>
                            </select>
                        </div>
                    </form>     
                    <div id="pilotos-card-container">
                    </div>
                    <div id="pilotos-sentinel" class="sentinel"></div>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <button class="accordion-item-header">
                Circuitos
                <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-collapse" id="accordion-circuitos">
                <div class="accordion-item-body">
                    <form id="circuitos-form" class="search-form">
                    <input type="search" class="input-search" id="circuitos-input-search" placeholder="Buscar...">
                    <small id="circuitos-error-nombre" class="error"></small>
                        <div class="radio-container">
                            <span class="radio-description">Temporadas</span>
                            <input type="radio" id="circuitos-s-2026" name="season" value="2026">
                            <label for="circuitos-s-2026">2026</label>
                            <input type="radio" id="circuitos-s-2025" name="season" value="2025">
                            <label for="circuitos-s-2025">2025</label>
                            <input type="radio" id="circuitos-s-0" name="season" value="0">
                            <label for="circuitos-s-0">Todas</label>
                        </div>
                        <small id="circuitos-error-season" class="error"></small>
                        <div class="select-container">
                            <label for="select-pais" class="select-description">Pais</label>
                            <select id="select-pais" class="select-box">
                                <option value="">Seleccionar...</option>
                            </select>
                        </div>
                    </form> 
                    <div id="circuitos-card-container">
                    </div>
                    <div id="circuitos-sentinel" class="sentinel"></div>
                </div>
            </div>
        </div>
    </div>`;
}