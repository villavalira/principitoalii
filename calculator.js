/* ==========================================================
   PRÍNCIPITO ALII CALCULATOR
   calculator.js v2
========================================================== */

class AliiCalculator {

    constructor() {

        /* ==========================================
            CONFIGURACIÓN
        ========================================== */

        this.POINTS_PER_USD = 600000;

        this.DIAMOND_VALUE = 0.005; // <- Cambia este valor cuando tengamos la fórmula real

        /* ==========================================
            ELEMENTOS
        ========================================== */

        this.pointsInput = document.querySelector("#pointsInput");
        this.pointsButton = document.querySelector("#calculatePoints");
        this.pointsResult = document.querySelector("#usdResult");

        this.diamondInput = document.querySelector("#diamondInput");
        this.diamondButton = document.querySelector("#calculateDiamonds");
        this.diamondResult = document.querySelector("#diamondResult");

        this.init();

    }

    /* ==========================================
        INICIALIZAR
    ========================================== */

    init() {

        this.loadLastValues();

        this.registerEvents();

    }

    /* ==========================================
        EVENTOS
    ========================================== */

    registerEvents() {

        // Botones

        this.pointsButton?.addEventListener("click", () => {

            this.calculatePoints();

        });

        this.diamondButton?.addEventListener("click", () => {

            this.calculateDiamonds();

        });

        // ENTER

        this.pointsInput?.addEventListener("keydown", e => {

            if (e.key === "Enter") {

                this.calculatePoints();

            }

        });

        this.diamondInput?.addEventListener("keydown", e => {

            if (e.key === "Enter") {

                this.calculateDiamonds();

            }

        });

        // AUTO CALCULAR

        this.pointsInput?.addEventListener("input", () => {

            this.calculatePoints();

        });

        this.diamondInput?.addEventListener("input", () => {

            this.calculateDiamonds();

        });

    }

    /* ==========================================
        CALCULAR PUNTOS
    ========================================== */

    calculatePoints() {

        const points = this.parse(this.pointsInput.value);

        if (!this.isValid(points)) {

            this.pointsResult.textContent = "0.00 USD";

            return;

        }

        const usd = points / this.POINTS_PER_USD;

        this.animateResult(this.pointsResult, usd);

        localStorage.setItem("alii_points", points);

    }

    /* ==========================================
        CALCULAR DIAMANTES
    ========================================== */

    calculateDiamonds() {

        const diamonds = this.parse(this.diamondInput.value);

        if (!this.isValid(diamonds)) {

            this.diamondResult.textContent = "0.00 USD";

            return;

        }

        const usd = diamonds * this.DIAMOND_VALUE;

        this.animateResult(this.diamondResult, usd);

        localStorage.setItem("alii_diamonds", diamonds);

    }

    /* ==========================================
        ANIMACIÓN
    ========================================== */

    animateResult(element, value) {

        const duration = 500;

        const start = performance.now();

        const end = value;

        const animate = (time) => {

            const progress = Math.min((time - start) / duration, 1);

            const current = end * progress;

            element.textContent = this.money(current);

            if (progress < 1) {

                requestAnimationFrame(animate);

            }

        };

        requestAnimationFrame(animate);

    }

    /* ==========================================
        FORMATO MONEDA
    ========================================== */

    money(value) {

        return new Intl.NumberFormat(

            "es-ES",

            {

                minimumFractionDigits:2,

                maximumFractionDigits:2

            }

        ).format(value) + " USD";

    }

    /* ==========================================
        VALIDACIÓN
    ========================================== */

    isValid(value) {

        return !isNaN(value) && value >= 0;

    }

    /* ==========================================
        PARSEAR
    ========================================== */

    parse(value) {

        return Number(value.replace(",", "."));

    }

    /* ==========================================
        CARGAR ÚLTIMO CÁLCULO
    ========================================== */

    loadLastValues() {

        const points = localStorage.getItem("alii_points");

        const diamonds = localStorage.getItem("alii_diamonds");

        if (points) {

            this.pointsInput.value = points;

            this.calculatePoints();

        }

        if (diamonds) {

            this.diamondInput.value = diamonds;

            this.calculateDiamonds();

        }

    }

}

/* ==========================================================
    START
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    new AliiCalculator();

});
