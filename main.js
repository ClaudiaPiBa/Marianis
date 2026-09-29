document.addEventListener(
  "DOMContentLoaded",
  () => {


    /* =========================================
       ELEMENTOS
    ========================================= */

    const screens =
      document.querySelectorAll(".screen");


    const startBtn =
      document.getElementById("startBtn");


    const correctBtn =
      document.getElementById("correctBtn");


    const wrongBtn =
      document.getElementById("wrongBtn");


    const revealBtn =
      document.getElementById("revealBtn");


    const rejectBtn =
      document.getElementById("rejectBtn");


    const securityResponse =
      document.getElementById(
        "securityResponse"
      );


    const escapeMessage =
      document.getElementById(
        "escapeMessage"
      );


    const countdown =
      document.getElementById(
        "countdown"
      );


    /* AUDIO */

    const motoramaAudio =
      document.getElementById(
        "motoramaAudio"
      );


    const musicPlayer =
      document.getElementById(
        "musicPlayer"
      );


    const soundBtn =
      document.getElementById(
        "soundBtn"
      );


    /* REVEAL */

    const revealPresent =
      document.getElementById(
        "revealPresent"
      );


    const revealMariana =
      document.getElementById(
        "revealMariana"
      );


    const revealOutfit =
      document.getElementById(
        "revealOutfit"
      );


    const revealMain =
      document.getElementById(
        "revealMain"
      );


    /* =========================================
       CAMBIO DE PANTALLA
    ========================================= */

    function goTo(screenId) {

      const currentScreen =
        document.querySelector(
          ".screen.active"
        );


      const nextScreen =
        document.getElementById(
          screenId
        );


      if (!nextScreen) {

        console.error(
          `No existe ${screenId}`
        );

        return;

      }


      if (currentScreen === nextScreen) {
        return;
      }


      if (currentScreen) {

        currentScreen.classList.add(
          "leaving"
        );


        setTimeout(() => {

          currentScreen.classList.remove(
            "active",
            "leaving"
          );


          currentScreen.setAttribute(
            "aria-hidden",
            "true"
          );


          showScreen(
            nextScreen
          );

        }, 280);

      } else {

        showScreen(
          nextScreen
        );

      }

    }


    function showScreen(screen) {

      screens.forEach(item => {

        item.classList.remove(
          "active",
          "leaving"
        );


        item.setAttribute(
          "aria-hidden",
          "true"
        );

      });


      screen.classList.add(
        "active"
      );


      screen.setAttribute(
        "aria-hidden",
        "false"
      );


      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }


    /* =========================================
       INICIO
    ========================================= */

    startBtn.addEventListener(
      "click",
      () => {

        goTo(
          "screenSecurity"
        );

      }
    );


    /* =========================================
       SEGURIDAD
    ========================================= */

    let wrongAttempts = 0;


    const wrongMessages = [

      "Respuesta incorrecta, pendeja.",

      "JAJAJA. No.",

      "¿Neta, Maeta?",

      "Te estamos dando UNA opción correcta.",

      "No mames, Mariana.",

      "YA PÍCALE A GEOVAS Y ZERO, MAMÁ RATA."

    ];


    wrongBtn.addEventListener(
      "click",
      () => {

        const index =
          Math.min(
            wrongAttempts,
            wrongMessages.length - 1
          );


        securityResponse.textContent =
          wrongMessages[index];


        wrongAttempts++;


        if (wrongAttempts >= 2) {

          moveWrongButton();

        }

      }
    );


    function moveWrongButton() {

      const x =
        randomNumber(-65,65);


      const y =
        randomNumber(-18,18);


      wrongBtn.style.transform =
        `translate(${x}px, ${y}px)`;

    }


    correctBtn.addEventListener(
      "click",
      () => {

        securityResponse.style.color =
          "#999";


        securityResponse.textContent =
          "Correcto. Nos alegra que finalmente lo aceptes.";


        correctBtn.disabled = true;

        wrongBtn.disabled = true;


        setTimeout(() => {

          goTo(
            "screenGift"
          );

        },1300);

      }
    );


    /* =========================================
       NO QUIERO EL REGALO
    ========================================= */

    let rejectAttempts = 0;


    const rejectMessages = [

      "JAJAJAJA.",

      "¿A dónde vas, Maeta?",

      "Ni madres.",

      "Buen intento, Mamá Rata.",

      "Ya deja de estar chingando.",

      "Pícale al botón rojo, pendeja.",

      "¿Todavía sigues intentando? 💀"

    ];


    function escapeRejectButton(event) {

      if (event) {
        event.preventDefault();
      }


      const index =
        Math.min(
          rejectAttempts,
          rejectMessages.length - 1
        );


      escapeMessage.textContent =
        rejectMessages[index];


      rejectAttempts++;


      const x =
        randomNumber(-105,105);


      const y =
        randomNumber(-35,35);


      rejectBtn.style.transform =
        `translate(${x}px, ${y}px)`;

    }


    rejectBtn.addEventListener(
      "mouseenter",
      escapeRejectButton
    );


    rejectBtn.addEventListener(
      "touchstart",
      escapeRejectButton,
      {
        passive:false
      }
    );


    rejectBtn.addEventListener(
      "click",
      escapeRejectButton
    );


    /* =========================================
       REVEAL BUTTON
    ========================================= */

revealBtn.addEventListener("click", async () => {

  // El play() ocurre EXACTAMENTE durante
  // la interacción de la usuaria.
  try {

    motoramaAudio.currentTime = 0;
    motoramaAudio.volume = 0;

    await motoramaAudio.play();

  } catch (error) {

    console.log(
      "Safari bloqueó el audio:",
      error
    );

  }

  startCountdown();

});



    /* =========================================
       COUNTDOWN
    ========================================= */

    function startCountdown() {

      goTo(
        "screenCountdown"
      );


      setTimeout(() => {

        let number = 3;


        showCountdownNumber(
          number
        );


        const interval =
          setInterval(() => {

            number--;


            if (number > 0) {

              showCountdownNumber(
                number
              );

            } else {

              clearInterval(
                interval
              );


              /*
                Después del 1:

                pantalla negra +
                comienza la música.
              */

              setTimeout(() => {

                startFinalReveal();

              },550);

            }

          },900);

      },350);

    }


    function showCountdownNumber(
      number
    ) {

      countdown.textContent =
        number;


      countdown.classList.remove(
        "animate"
      );


      void countdown.offsetWidth;


      countdown.classList.add(
        "animate"
      );

    }


    /* =========================================
       REVEAL FINAL
    ========================================= */

    function startFinalReveal() {

      /*
        Primero entramos a pantalla negra.
      */

      goTo(
        "screenReveal"
      );


      /*
        Arranca la canción.
      */

setTimeout(() => {

  // El audio YA está reproduciéndose.
  // Solo levantamos el volumen.

  fadeInAudio();

  musicPlayer.classList.add("show");

}, 300);


      /*
        GEOVAS + ZERO PRESENTAN
      */

      setTimeout(() => {

        showRevealElement(
          revealPresent
        );

      },1000);


      /*
        MARIANA
      */

      setTimeout(() => {

        showRevealElement(
          revealMariana
        );

      },2300);


      /*
        OUTFIT
      */

      setTimeout(() => {

        showRevealElement(
          revealOutfit
        );

      },3400);


      /*
        MOTORAMA + TICKET
      */

      setTimeout(() => {

        showRevealElement(
          revealMain
        );

      },5100);

    }


    function showRevealElement(
      element
    ) {

      element.classList.add(
        "show"
      );

    }



    /* =========================================
       FADE IN
    ========================================= */

let fadeInterval = null;

function fadeInAudio() {

  clearInterval(fadeInterval);

  let volume = motoramaAudio.volume;

  fadeInterval = setInterval(() => {

    volume += 0.05;

    if (volume >= 0.75) {

      volume = 0.75;

      clearInterval(fadeInterval);

    }

    motoramaAudio.volume = volume;

  }, 100);

}


    /* =========================================
       SOUND BUTTON
    ========================================= */

    soundBtn.addEventListener(
      "click",
      () => {

        /*
          Si está pausado,
          reproducimos.
        */

        if (motoramaAudio.paused) {

          motoramaAudio
            .play()
            .then(() => {

              motoramaAudio.volume =
                .75;

              soundBtn.textContent =
                "🔊";

            })
            .catch(() => {});


          return;

        }


        /*
          MUTE / UNMUTE
        */

        if (
          motoramaAudio.muted
        ) {

          motoramaAudio.muted =
            false;


          soundBtn.textContent =
            "🔊";

        } else {

          motoramaAudio.muted =
            true;


          soundBtn.textContent =
            "🔇";

        }

      }
    );


    /* =========================================
       UTILIDAD
    ========================================= */

    function randomNumber(
      min,
      max
    ) {

      return Math.floor(
        Math.random() *
        (max - min + 1)
      ) + min;

    }


  }
);