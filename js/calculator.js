/* ==========================================================
   PRÍNCIPITO ALII CALCULATOR
   calculator.js
========================================================== */

class Calculator {

    constructor() {

        /* ======= Configuración ======= */

        this.POINTS_PER_USD = 600000;

        this.DIAMONDS_VALUE = 0.005; // <- provisional

        /* ======= Elementos ======= */

        this.pointsInput =
            document.getElementById("pointsInput");

        this.pointsButton =
            document.getElementById("calculatePoints");

        this.pointsResult =
            document.getElementById("usdResult");

        this.diamondInput =
            document.getElementById("diamondInput");

        this.diamondButton =
            document.getElementById("calculateDiamonds");

        this.diamondResult =
            document.getElementById("diamondResult");

        this.events();

    }

    /* =====================================================
       EVENTOS
    ===================================================== */

    events() {

        if (this.pointsButton) {

            this.pointsButton.addEventListener(
                "click",
                () => this.calculatePoints()
            );

        }

        if (this.diamondButton) {

            this.diamondButton.addEventListener(
                "click",
                () => this.calculateDiamonds()
            );

        }

    }

    /* =====================================================
       PUNTOS
    ===================================================== */

    calculatePoints() {

        const points = Number(this.pointsInput.value);

        if (!this.validate(points)) {

            this.showError(this.pointsResult);

            return;

        }

        const usd = points / this.POINTS_PER_USD;

        this.animateValue(

            this.pointsResult,

            usd,

            " USD"

        );

    }

    /* =====================================================
       DIAMANTES
    ===================================================== */

    calculateDiamonds() {

        const diamonds = Number(this.diamondInput.value);

        if (!this.validate(diamonds)) {

            this.showError(this.diamondResult);

            return;

        }

        const usd = diamonds * this.DIAMONDS_VALUE;

        this.animateValue(

            this.diamondResult,

            usd,

            " USD"

        );

    }

    /* =====================================================
       VALIDACIÓN
    ===================================================== */

    validate(value) {

        return !isNaN(value) && value >= 0;

    }

    /* =====================================================
       ERROR
    ===================================================== */

    showError(element) {

        element.textContent = "Valor no válido";

    }

    /* =====================================================
       CONTADOR ANIMADO
    ===================================================== */

    animateValue(element, value, suffix = "") {

        const duration = 700;

        const start = 0;

        const end = value;

        const startTime = performance.now();

        const step = (currentTime) => {

            const progress = Math.min(

                (currentTime - startTime) / duration,

                1

            );

            const current =

                start +

                (end - start) * progress;

            element.textContent =

                current.toFixed(2) + suffix;

            if (progress < 1) {

                requestAnimationFrame(step);

            }

        };

        requestAnimationFrame(step);

    }

}

/* ==========================================================
   INICIO
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        new Calculator();

    }

);
