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
                        <div class="radio-container">
                            <span class="radio-description">Temporadas</span>
                            <input type="radio" id="pilotos-s-2026" name="season" value="2026">
                            <label for="pilotos-s-2026">2026</label>
                            <input type="radio" id="pilotos-s-2025" name="season" value="2025">
                            <label for="pilotos-s-2025">2025</label>
                            <input type="radio" id="pilotos-s-0" name="season" value="0">
                            <label for="pilotos-s-0">Todas</label>
                        </div>
                        <div class = "select-container">
                            <label for="select-nacionalidad" class="select-description">Nacionalidad</label>
                            <select id="select-nacionalidad" class="select-box">
                                <option value="">Seleccionar...</option>
                                <option value="AR">Argentina</option>
                                <option value="BR">Brasil</option>
                                <option value="MX">México</option>
                                <option value="ES">España</option>
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
                    <p>Chequear comportamiento de este accordion, cuando seleccionas una temporada se activa el otro accordion tb. Deberia desaparecer cuando trasalades los cambios del otro form aca...</p>
                        <div>
                            <span>Temporadas</span>
                            <label>
                                <input type="radio" name="season" value="2026">
                                2026
                            </label>
                            <label>
                                <input type="radio" name="season" value="2025">
                                2025
                            </label>
                            <label>
                                <input type="radio" name="season" value="0">
                                Todas
                            </label>
                        </div>
                        <div>
                            <label for="select-pais">Pais:</label>
                                <select id="select-pais" placeholder="Seleccionar pais...">
                                <option value="">Seleccionar...</option>
                                <option value="AR">Argentina</option>
                                <option value="BR">Brasil</option>
                                <option value="MX">México</option>
                                <option value="ES">España</option>
                                <option value="US">USA</option>
                                <option value="IT">Italia</option>                                
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