/*==================================================
    HORARIO OFICIAL ALII
==================================================*/

const brasilTime = document.getElementById("brasil-time");
const timer = document.getElementById("resetTimer");

/*========================
  Hora Brasil
========================*/

function updateBrazilTime(){

    const now = new Date();

    const brasil = new Intl.DateTimeFormat("es-ES",{
        timeZone:"America/Sao_Paulo",
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit",
        hour12:false
    }).format(now);

    if(brasilTime){
        brasilTime.textContent = brasil;
    }

}

/*========================
 Cuenta atrás
========================*/

function updateCountdown(){

    const now = new Date();

    const brazilNow = new Date(
        now.toLocaleString("en-US",{
            timeZone:"America/Sao_Paulo"
        })
    );

    let reset = new Date(brazilNow);

    reset.setHours(24,0,0,0);

    const diff = reset - brazilNow;

    const h = Math.floor(diff / 3600000);

    const m = Math.floor((diff % 3600000)/60000);

    const s = Math.floor((diff % 60000)/1000);

    if(timer){

        timer.textContent =
            String(h).padStart(2,"0") + ":" +
            String(m).padStart(2,"0") + ":" +
            String(s).padStart(2,"0");

    }

}

/*========================
 Animación órbita
========================*/

const planets = document.querySelectorAll(".orbit");

let angle = 0;

function rotatePlanets(){

    const radius = 250;

    angle += 0.0025;

    planets.forEach((planet,index)=>{

        const a = angle + index*(Math.PI*2/planets.length);

        const x = Math.cos(a)*radius;

        const y = Math.sin(a)*radius;

        planet.style.left =
            `calc(50% + ${x}px - 60px)`;

        planet.style.top =
            `calc(50% + ${y}px - 60px)`;

    });

    requestAnimationFrame(rotatePlanets);

}

/*========================
 Iniciar
========================*/

updateBrazilTime();

updateCountdown();

setInterval(updateBrazilTime,1000);

setInterval(updateCountdown,1000);

rotatePlanets();
