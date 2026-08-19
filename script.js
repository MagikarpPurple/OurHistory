
document.addEventListener("DOMContentLoaded", () => {

    console.log("❤️ Nuestra Historia cargada correctamente");


    /* ==========================================
       ELEMENTOS
    ========================================== */

    const startButton = document.getElementById("startButton");
    const inicio = document.getElementById("inicio");
    const contenido = document.getElementById("contenido");

    const music = document.getElementById("music");
    const musicButton = document.getElementById("musicButton");

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const vinyl = document.querySelector(".vinyl");


    /* ==========================================
       FECHA DE INICIO
    ========================================== */

    // 20 de febrero de 2025
    const fechaInicio = new Date(2025, 1, 20, 0, 0, 0);


    /* ==========================================
       ESTADO INICIAL
    ========================================== */

    if (contenido) {
        contenido.style.display = "none";
    }


    /* ==========================================
       BOTÓN "ABRIR NUESTRA HISTORIA"
    ========================================== */

    if (startButton) {

        startButton.addEventListener("click", async () => {

            console.log("💜 Botón presionado");

            // Ocultar portada
            if (inicio) {
                inicio.style.display = "none";
            }

            // Mostrar historia
            if (contenido) {
                contenido.style.display = "block";
            }

            // Intentar reproducir música
            if (music) {

                try {

                    music.currentTime = 0;

                    await music.play();

                    console.log("🎵 Música reproduciéndose");

                    if (musicButton) {
                        musicButton.textContent = "❚❚ Pausar";
                    }

                    if (vinyl) {
                        vinyl.style.animationPlayState = "running";
                    }

                } catch (error) {

                    console.error(
                        "No se pudo reproducir la música:",
                        error
                    );

                }

            }

            // Llevar al comienzo de la historia
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    } else {

        console.error(
            "❌ No se encontró el botón #startButton"
        );

    }


    /* ==========================================
       CONTADOR
    ========================================== */

    function actualizarContador() {

        const ahora = new Date();

        let diferencia =
            ahora.getTime() -
            fechaInicio.getTime();


        if (diferencia < 0) {
            diferencia = 0;
        }


        const totalSegundos =
            Math.floor(diferencia / 1000);


        const dias =
            Math.floor(totalSegundos / 86400);


        const horas =
            Math.floor(
                (totalSegundos % 86400) / 3600
            );


        const minutos =
            Math.floor(
                (totalSegundos % 3600) / 60
            );


        const segundos =
            totalSegundos % 60;


        if (daysElement) {
            daysElement.textContent =
                dias.toLocaleString("es-CO");
        }


        if (hoursElement) {
            hoursElement.textContent =
                horas.toString().padStart(2, "0");
        }


        if (minutesElement) {
            minutesElement.textContent =
                minutos.toString().padStart(2, "0");
        }


        if (secondsElement) {
            secondsElement.textContent =
                segundos.toString().padStart(2, "0");
        }

    }


    actualizarContador();

    setInterval(
        actualizarContador,
        1000
    );


    /* ==========================================
       BOTÓN DE MÚSICA
    ========================================== */

    if (musicButton && music) {

        musicButton.addEventListener(
            "click",
            async () => {

                if (music.paused) {

                    try {

                        await music.play();

                        musicButton.textContent =
                            "❚❚ Pausar";

                        if (vinyl) {
                            vinyl.style.animationPlayState =
                                "running";
                        }

                    } catch (error) {

                        console.error(
                            "Error reproduciendo música:",
                            error
                        );

                    }

                } else {

                    music.pause();

                    musicButton.textContent =
                        "▶ Reproducir";

                    if (vinyl) {
                        vinyl.style.animationPlayState =
                            "paused";
                    }

                }

            }
        );

    }


    /* ==========================================
       ANIMACIONES AL HACER SCROLL
    ========================================== */

    const elementosAnimados =
        document.querySelectorAll(
            ".timeline-item, .reason, .ticket, .place-card, .gallery-item"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    elementosAnimados.forEach(
        (elemento) => {

            elemento.style.opacity = "0";

            elemento.style.transform =
                "translateY(30px)";

            elemento.style.transition =
                "opacity .8s ease, transform .8s ease";

            observer.observe(elemento);

        }
    );


    /* ==========================================
       VALES
    ========================================== */

    document
        .querySelectorAll(".ticket button")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    button.textContent =
                        "CANJEADO ❤️";

                    button.style.opacity =
                        "0.5";

                    button.disabled = true;

                }
            );

        });


    /* ==========================================
       COMPROBAR AUDIO
    ========================================== */

    if (music) {

        music.addEventListener(
            "loadeddata",
            () => {

                console.log(
                    "🎵 Archivo de música encontrado correctamente"
                );

            }
        );


        music.addEventListener(
            "error",
            () => {

                console.error(
                    "❌ No se pudo cargar el archivo de música."
                );

                console.error(
                    "Revisa que exista: musica/ama-de-mi-sol.mp3"
                );

            }
        );

    }


});

