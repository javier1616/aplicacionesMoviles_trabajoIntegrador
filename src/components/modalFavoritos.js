
export function modalFavoritos(){
    return `<div id="modal-backdrop" class="backdrop">
                <div id="modal-add-favorite" class="modal">
                    <form id="favoritos-form" class="input-form">
                        <div id="favoritos-form-header">
                            <legend>Agregar a Favoritos</legend>
                            <hr>
                        </div>
                        <div id="priority-container" class="radio-container">
                            <span class="radio-priority">Prioridad</span>
                            <input type="radio" id="favoritos-p-1" name="priority" value="1">
                            <label for="favoritos-p-1">1</label>
                            <input type="radio" id="favoritos-p-2" name="priority" value="2">
                            <label for="favoritos-p-2">2</label>
                            <input type="radio" id="favoritos-p-3" name="priority" value="3">
                            <label for="favoritos-p-3">3</label>
                            <input type="radio" id="favoritos-p-4" name="priority" value="4">
                            <label for="favoritos-p-4">4</label>
                            <input type="radio" id="favoritos-p-5" name="priority" value="5">
                            <label for="favoritos-p-5">5</label>
                        </div>
                        <small id="favoritos-error-priority" class="error"></small>
                        <div id="motivo-container">
                            <span class="radio-motivo">Motivo</span>
                            <input type="radio" id="favoritos-m-rendimiento" name="motivo" value="Rendimiento">
                            <label for="favoritos-m-rendimiento">Rendimiento</label>
                            <input type="radio" id="favoritos-m-estrategia" name="motivo" value="Estrategia">
                            <label for="favoritos-m-estrategia">Estrategia</label>
                            <input type="radio" id="favoritos-m-clasificacion" name="motivo" value="Clasificación">
                            <label for="favoritos-m-clasificacion">Clasificación</label>
                            <input type="radio" id="favoritos-m-carrera" name="motivo" value="Carrera">
                            <label for="favoritos-m-carrera">Carrera</label>
                        </div>
                        <small id="favoritos-error-motivo" class="error"></small>
                        <div id="comentario-container">
                            <label for="favoritos-comentario">Comentario</label>
                            <textarea id="favoritos-comentario" name="comentario"></textarea>
                            <small id="favoritos-error-comentario" class="error"></small>
                        </div>
                    </form>
                    <div class="actions">
                        <button id="modal-add-favorite-cancel-btn">Cancelar</button>
                        <button id="modal-add-favorite-btn">Agregar</button>
                    </div>

                </div>
            </div>`;
}