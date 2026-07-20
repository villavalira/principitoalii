/*==================================================
        HORARIO OFICIAL ALII
==================================================*/

const countries = [
    {
        id: "brasil-time",
        zone: "America/Sao_Paulo"
    },
    {
        id: "es-time",
        zone: "Europe/Madrid"
    },
    {
        id: "cl-time",
        zone: "America/Santiago"
    },
    {
        id: "ve-time",
        zone: "America/Caracas"
    },
    {
        id: "co-time",
        zone: "America/Bogota"
    },
    {
        id: "mx-time",
        zone: "America/Mexico_City"
    }
];

/*=====================================
      HORAS
======================================*/

function updateTimes(){

    const now = new Date();

    countries.forEach(country=>{

        const element=document.getElementById(country.id);

        if(!element) return;

        element.textContent=new Intl.DateTimeFormat("es-ES",{

            timeZone:country.zone,

            hour:"2-digit",

            minute:"2-digit",

            second:country.id==="brasil-time"
                ? "2-digit"
                : undefined,

            hour12:false

        }).format(now);

    });

}

/*=====================================
      CUENTA ATRÁS
======================================*/

function updateCountdown(){

    const timer=document.getElementById("resetTimer");

    if(!timer) return;

    const now=new Date();

    const brazil=new Date(

        now.toLocaleString("en-US",{

            timeZone:"America/Sao_Paulo"

        })

    );

    const midnight=new Date(brazil);

    midnight.setHours(24,0,0,0);

    const diff=midnight-brazil;

    const h=Math.floor(diff/3600000);

    const m=Math.floor((diff%3600000)/60000);

    const s=Math.floor((diff%60000)/1000);

    timer.textContent=

        String(h).padStart(2,"0")+":"+

        String(m).padStart(2,"0")+":"+

        String(s).padStart(2,"0");

}

/*=====================================
      ÓRBITA
======================================*/

const orbitPlanets=document.querySelectorAll(".orbit");

let angle=0;

function orbitAnimation(){

    const radius=260;

    angle+=0.003;

    orbitPlanets.forEach((planet,index)=>{

        const a=angle+

        index*(Math.PI*2/orbitPlanets.length);

        const x=Math.cos(a)*radius;

        const y=Math.sin(a)*radius;

        planet.style.left=

            `calc(50% + ${x}px - 60px)`;

        planet.style.top=

            `calc(50% + ${y}px - 60px)`;

    });

    requestAnimationFrame(orbitAnimation);

}

/*=====================================
      EFECTO HOVER
======================================*/

orbitPlanets.forEach(planet=>{

    planet.addEventListener("mouseenter",()=>{

        planet.style.zIndex="50";

    });

    planet.addEventListener("mouseleave",()=>{

        planet.style.zIndex="10";

    });

});

/*=====================================
      INICIAR
======================================*/

updateTimes();

updateCountdown();

setInterval(updateTimes,1000);

setInterval(updateCountdown,1000);

orbitAnimation();
