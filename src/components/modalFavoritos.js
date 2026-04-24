
export function modalFavoritos(){
    return `<div id="modal-backdrop" class="backdrop">
                <div id="modal-add-favorite" class="modal">
                    <h3>Agregar a favorite</h3>
                    <input id="modal-input" placeholder="Nota..." />
                    <p>
                        Campos mínimos:<br>
                        - prioridad (requerido, valor numérico mayor a cero)
                        - categoría o etiqueta personalizada (requerido)
                        - nota personal (opcional, con límite de caracteres).
                        Al validar y confirmar se muestra confirmación al usuario. 
                    </p>
                    <div class="actions">
                        <button id="modal-add-favorite-cancel-btn">Cancelar</button>
                        <button id="modal-add-favorite-btn">Agregar</button>
                    </div>
                </div>
            </div>`;
}

