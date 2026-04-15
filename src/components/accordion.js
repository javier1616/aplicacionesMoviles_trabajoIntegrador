export function accordion(){
    return ` <div class="accordion" id="searchAccordion">
        <div class="accordion-item">
            <button class="accordion-item-header">
                Pilotos
                <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-item-body">
                <p>Contenido de la sección 1</p>
            </div>
        </div>
        <div class="accordion-item">
            <button class="accordion-item-header">
                Circuitos
                <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-item-body">
                <p>Contenido de la sección 2</p>
            </div>
        </div>
    </div>`;
}


/*

este seria un accordion mas pro con css y comportamiento

<!--template>
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Accordion Item #1
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the first item’s accordion body.</strong>
                    Fijate el css para hacer las animaciones, transiciones, etc.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Accordion Item #2
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the second item’s accordion body.</strong>
                    Fijate el css para hacer las animaciones, transiciones, etc.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Accordion Item #3
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the third item’s accordion body.</strong>
                    Fijate el css para hacer las animaciones, transiciones, etc.
                </div>
            </div>
        </div>
    </div>
</template>

.content {
  height: 0;
  overflow: hidden;
  opacity: 0;
  transition: height 0.4s ease, opacity 0.3s ease;
}

.item.active .content {
  opacity: 1;
}

document.querySelectorAll(".header").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;

    document.querySelectorAll(".item").forEach(i => {
      if (i !== item) {
        i.classList.remove("active");
        i.querySelector(".content").style.height = null;
      }
    });

    const content = btn.nextElementSibling;

    if (content.style.height) {
      content.style.height = null;
      item.classList.remove("active");
    } else {
      content.style.height = content.scrollHeight + "px";
      item.classList.add("active");
    }
  });
});

*/