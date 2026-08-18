// =========================================================
// CREATIVE DRIVE
// SISTEMA PRINCIPAL
// =========================================================


// =========================================================
// 1. DATOS INICIALES
// =========================================================

let emprendimientos = [

    {
        id: "cafe-central",
        nombre: "Café Central",
        descripcion:
            "Un emprendimiento local dedicado a ofrecer café y productos artesanales.",
        categorias: ["alimentacion", "comercio"],
        categoriaTexto: "🍔 Alimentación · 🛍️ Comercio",
        ubicacion: "guayaquil",
        ubicacionTexto: "📍 Guayaquil",
        icono: "☕",
        logo: "C",
        fotoPerfil: "",
        fotoPortada: "",
        galeria: [],
        reconocido: true,
        esPersonalizado: false,
        usuarioId: "",
        instagram: "",
        whatsapp: "",
        email: "",
        fechaCreacion: 1
    },

    {
        id: "arte-diseno",
        nombre: "Arte & Diseño",
        descripcion:
            "Productos creativos hechos por emprendedores de nuestra comunidad.",
        categorias: ["diseno", "comercio"],
        categoriaTexto: "🎨 Diseño · 🛍️ Comercio",
        ubicacion: "guayaquil",
        ubicacionTexto: "📍 Guayaquil",
        icono: "🎨",
        logo: "A",
        fotoPerfil: "",
        fotoPortada: "",
        galeria: [],
        reconocido: true,
        esPersonalizado: false,
        usuarioId: "",
        instagram: "",
        whatsapp: "",
        email: "",
        fechaCreacion: 2
    },

    {
        id: "dulce-momento",
        nombre: "Dulce Momento",
        descripcion:
            "Emprendimiento dedicado a crear postres artesanales para cada ocasión.",
        categorias: ["alimentacion", "comercio"],
        categoriaTexto: "🍔 Alimentación · 🛍️ Comercio",
        ubicacion: "guayaquil",
        ubicacionTexto: "📍 Guayaquil",
        icono: "🍰",
        logo: "D",
        fotoPerfil: "",
        fotoPortada: "",
        galeria: [],
        reconocido: true,
        esPersonalizado: false,
        usuarioId: "",
        instagram: "",
        whatsapp: "",
        email: "",
        fechaCreacion: 3
    }

];


// =========================================================
// 2. CLAVES LOCALSTORAGE
// =========================================================

const CLAVE_RESEÑAS = "creativeDriveResenas";
const CLAVE_EMPRENDIMIENTOS = "creativeDriveEmprendimientos";
const CLAVE_USUARIOS = "creativeDriveUsers";
const CLAVE_USUARIO_ACTUAL = "creativeDriveCurrentUser";

const IDS_EMPRENDIMIENTOS_ORIGINALES = [
    "cafe-central",
    "arte-diseno",
    "dulce-momento"
];


// =========================================================
// 2.1. CATÁLOGO DE SELLOS
// =========================================================

const SELLOS_DISPONIBLES = [

    {
        id: "destacado",
        icono: "🏅",
        nombre: "Emprendimiento destacado",
        descripcion:
            "Reconoce emprendimientos que destacan por su " +
            "propuesta y conexión con la comunidad."
    },

    {
        id: "calidad",
        icono: "⭐",
        nombre: "Calidad reconocida",
        descripcion:
            "Identifica emprendimientos que mantienen un " +
            "compromiso constante con sus productos o servicios."
    },

    {
        id: "conexion",
        icono: "🤝",
        nombre: "Conexión local",
        descripcion:
            "Destaca negocios que mantienen una relación " +
            "cercana con su comunidad."
    }

];


const VOTOS_NECESARIOS_SELLO = 50;

const CLAVE_VOTOS_SELLOS =
    "creativeDriveVotosSellos";


// =========================================================
// 3. USUARIO ACTUAL
// =========================================================

function obtenerUsuarioActual() {

    let usuario = null;

    const usuarioLocal =
        localStorage.getItem(CLAVE_USUARIO_ACTUAL);

    if (usuarioLocal) {

        try {
            usuario = JSON.parse(usuarioLocal);
        }

        catch (error) {

            console.error(
                "Error al leer la sesión local:",
                error
            );

            localStorage.removeItem(
                CLAVE_USUARIO_ACTUAL
            );

        }

    }

    if (!usuario) {

        const usuarioSesion =
            sessionStorage.getItem(CLAVE_USUARIO_ACTUAL);

        if (usuarioSesion) {

            try {
                usuario = JSON.parse(usuarioSesion);
            }

            catch (error) {

                console.error(
                    "Error al leer la sesión temporal:",
                    error
                );

                sessionStorage.removeItem(
                    CLAVE_USUARIO_ACTUAL
                );

            }

        }

    }

    return usuario && usuario.id
        ? usuario
        : null;

}


function usuarioHaIniciadoSesion() {

    return obtenerUsuarioActual() !== null;

}


// =========================================================
// 4. RESEÑAS
// =========================================================

function obtenerResenas() {

    const datos =
        localStorage.getItem(CLAVE_RESEÑAS);

    if (!datos) {
        return {};
    }

    try {

        const resenas =
            JSON.parse(datos);

        if (
            resenas &&
            typeof resenas === "object" &&
            !Array.isArray(resenas)
        ) {
            return resenas;
        }

    }

    catch (error) {

        console.error(
            "Error al cargar las reseñas:",
            error
        );

    }

    return {};

}


function guardarResenas(resenas) {

    try {

        localStorage.setItem(
            CLAVE_RESEÑAS,
            JSON.stringify(resenas)
        );

        return true;

    }

    catch (error) {

        console.error(
            "Error al guardar las reseñas:",
            error
        );

        return false;

    }

}


function obtenerResenasEmprendimiento(id) {

    const todasLasResenas =
        obtenerResenas();

    return Array.isArray(
        todasLasResenas[id]
    )
        ? todasLasResenas[id]
        : [];

}


// =========================================================
// 12.1. VOTOS DE SELLOS
// =========================================================

function obtenerVotosSellos() {

    try {

        const datos =
            JSON.parse(
                localStorage.getItem(
                    CLAVE_VOTOS_SELLOS
                )
            );

        return datos &&
            typeof datos === "object"
                ? datos
                : {};

    }

    catch (error) {

        console.error(
            "Error al leer los votos de sellos:",
            error
        );

        return {};

    }

}


function guardarVotosSellos(votos) {

    try {

        localStorage.setItem(
            CLAVE_VOTOS_SELLOS,
            JSON.stringify(votos)
        );

        return true;

    }

    catch (error) {

        console.error(
            "Error al guardar los votos de sellos:",
            error
        );

        return false;

    }

}


function obtenerVotantesSello(
    emprendimientoId,
    selloId
) {

    const votos =
        obtenerVotosSellos();

    if (
        !votos[emprendimientoId] ||
        !Array.isArray(
            votos[emprendimientoId][selloId]
        )
    ) {

        return [];

    }

    return votos[emprendimientoId][selloId];

}


function usuarioYaVotoSello(
    emprendimientoId,
    selloId,
    usuarioId
) {

    return obtenerVotantesSello(
        emprendimientoId,
        selloId
    )
        .some(function(id) {

            return String(id) ===
                String(usuarioId);

        });

}


function obtenerSellosGanados(
    emprendimientoId
) {

    return SELLOS_DISPONIBLES.filter(

        function(sello) {

            return obtenerVotantesSello(
                emprendimientoId,
                sello.id
            ).length >=
                VOTOS_NECESARIOS_SELLO;

        }

    );

}


function eliminarVotosEmprendimiento(
    emprendimientoId
) {

    const votos =
        obtenerVotosSellos();

    if (votos[emprendimientoId]) {

        delete votos[emprendimientoId];

        guardarVotosSellos(votos);

    }

}


function alternarVotoSello(
    emprendimientoId,
    selloId
) {

    const usuario =
        obtenerUsuarioActual();


    if (!usuario) {

        const continuar =
            confirm(

                "Para votar por un sello necesitas " +
                "iniciar sesión.\n\n" +

                "¿Quieres iniciar sesión ahora?"

            );

        if (continuar) {

            window.location.href =
                "login.html";

        }

        return;

    }


    const emprendimiento =
        emprendimientos.find(

            function(item) {

                return item.id ===
                    emprendimientoId;

            }

        );


    if (
        emprendimiento &&
        emprendimiento.esPersonalizado &&
        emprendimiento.usuarioId ===
            usuario.id
    ) {

        alert(
            "No puedes votar por sellos en " +
            "tu propio emprendimiento."
        );

        return;

    }


    const votos =
        obtenerVotosSellos();

    if (!votos[emprendimientoId]) {
        votos[emprendimientoId] = {};
    }

    if (
        !Array.isArray(
            votos[emprendimientoId][selloId]
        )
    ) {
        votos[emprendimientoId][selloId] = [];
    }


    const yaVoto =
        votos[emprendimientoId][selloId]
            .some(function(id) {

                return String(id) ===
                    String(usuario.id);

            });


    if (yaVoto) {

        votos[emprendimientoId][selloId] =
            votos[emprendimientoId][selloId]
                .filter(function(id) {

                    return String(id) !==
                        String(usuario.id);

                });

    }

    else {

        votos[emprendimientoId][selloId]
            .push(usuario.id);

    }


    guardarVotosSellos(votos);


    const conteoActual =
        votos[emprendimientoId][selloId]
            .length;


    mostrarSeccionSellos(
        emprendimientoId
    );


    if (
        !yaVoto &&
        conteoActual ===
            VOTOS_NECESARIOS_SELLO
    ) {

        const sello =
            SELLOS_DISPONIBLES.find(
                function(s) {

                    return s.id ===
                        selloId;

                }
            );

        alert(
            `¡Felicidades! "${
                emprendimiento
                    ? emprendimiento.nombre
                    : "Este emprendimiento"
            }" acaba de obtener el sello ` +
            `"${sello ? sello.nombre : ""}".`
        );

    }

}


function renderizarBadgesSellosGanados(
    emprendimiento
) {

    const ganados =
        obtenerSellosGanados(
            emprendimiento.id
        );


    if (ganados.length === 0) {

        return "";

    }


    return `

        <div class="earned-seals-row">

            ${
                ganados
                    .map(function(sello) {

                        return `

                            <span
                                class="earned-seal-badge"
                                title="${escaparHTML(
                                    sello.descripcion
                                )}"
                            >
                                ${sello.icono}
                                ${escaparHTML(
                                    sello.nombre
                                )}
                            </span>

                        `;

                    })
                    .join("")
            }

        </div>

    `;

}


function renderizarSellosVotacion(
    emprendimiento
) {

    const usuario =
        obtenerUsuarioActual();

    const esDueño =
        usuario &&
        emprendimiento.esPersonalizado &&
        emprendimiento.usuarioId ===
            usuario.id;


    return SELLOS_DISPONIBLES
        .map(function(sello) {

            const votantes =
                obtenerVotantesSello(
                    emprendimiento.id,
                    sello.id
                );

            const conteo =
                votantes.length;

            const yaVoto =
                usuario
                    ? votantes.some(
                        function(id) {

                            return String(id) ===
                                String(usuario.id);

                        }
                    )
                    : false;

            const obtenido =
                conteo >=
                VOTOS_NECESARIOS_SELLO;

            const porcentaje =
                Math.min(
                    100,
                    Math.round(
                        (conteo /
                            VOTOS_NECESARIOS_SELLO) *
                            100
                    )
                );


            let accionHTML;

            if (obtenido) {

                accionHTML = `
                    <span class="seal-vote-obtained">
                        ✓ Sello obtenido
                    </span>
                `;

            }

            else if (esDueño) {

                accionHTML = `
                    <span class="seal-vote-hint">
                        Tu emprendimiento no puede
                        votarse a sí mismo.
                    </span>
                `;

            }

            else {

                accionHTML = `
                    <button
                        type="button"
                        class="seal-vote-btn${
                            yaVoto
                                ? " voted"
                                : ""
                        }"
                        onclick="alternarVotoSello('${escaparHTML(
                            emprendimiento.id
                        )}', '${sello.id}')"
                    >
                        ${
                            yaVoto
                                ? "✓ Ya votaste"
                                : "🗳️ Votar por este sello"
                        }
                    </button>
                `;

            }


            return `

                <div class="profile-seal-card${
                    obtenido
                        ? " obtained"
                        : ""
                }">

                    <div class="profile-seal-icon">
                        ${sello.icono}
                    </div>

                    <h3>
                        ${escaparHTML(
                            sello.nombre
                        )}
                    </h3>

                    <p>
                        ${escaparHTML(
                            sello.descripcion
                        )}
                    </p>

                    <div class="seal-progress-bar">

                        <div
                            class="seal-progress-fill"
                            style="width: ${porcentaje}%;"
                        ></div>

                    </div>

                    <div class="seal-vote-count">

                        ${conteo}/${VOTOS_NECESARIOS_SELLO}
                        votos

                    </div>

                    ${accionHTML}

                </div>

            `;

        })
        .join("");

}


function mostrarSeccionSellos(
    emprendimientoId
) {

    const contenedor =
        document.getElementById(
            "sealsGrid"
        );

    const emprendimiento =
        emprendimientos.find(
            function(item) {

                return item.id ===
                    emprendimientoId;

            }
        );


    if (!emprendimiento) {

        return;

    }


    if (contenedor) {

        contenedor.innerHTML =
            renderizarSellosVotacion(
                emprendimiento
            );

    }


    const contenedorBadges =
        document.getElementById(
            "earnedSealsContainer"
        );

    if (contenedorBadges) {

        contenedorBadges.innerHTML =
            renderizarBadgesSellosGanados(
                emprendimiento
            );

    }

}


function calcularPromedioResenas(resenas) {

    if (
        !Array.isArray(resenas) ||
        resenas.length === 0
    ) {
        return 0;
    }

    const valores =
        resenas
            .map(function(resena) {
                return Number(resena.calificacion);
            })
            .filter(function(valor) {
                return (
                    !Number.isNaN(valor) &&
                    valor >= 1 &&
                    valor <= 5
                );
            });

    if (valores.length === 0) {
        return 0;
    }

    const suma =
        valores.reduce(function(total, valor) {
            return total + valor;
        }, 0);

    return suma / valores.length;

}


function generarEstrellas(calificacion) {

    const valor =
        Math.max(
            0,
            Math.min(
                5,
                Math.round(Number(calificacion) || 0)
            )
        );

    let estrellas = "";

    for (let i = 1; i <= 5; i++) {

        estrellas +=
            i <= valor
                ? "★"
                : "☆";

    }

    return estrellas;

}


// =========================================================
// 5. UTILIDADES
// =========================================================

function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent =
        texto == null
            ? ""
            : String(texto);

    return div.innerHTML;

}


function normalizarTexto(texto) {

    return String(texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

}


function obtenerPromedioEmprendimiento(
    emprendimiento
) {

    if (
        !emprendimiento ||
        !emprendimiento.id
    ) {
        return 0;
    }

    return calcularPromedioResenas(
        obtenerResenasEmprendimiento(
            emprendimiento.id
        )
    );

}


// =========================================================
// 6. ORDENAMIENTO
// =========================================================

function ordenarEmprendimientos(
    lista,
    criterio = "defecto"
) {

    const listaOrdenada =
        Array.isArray(lista)
            ? [...lista]
            : [];

    if (criterio === "defecto") {

        listaOrdenada.sort(function(a, b) {

            if (a.reconocido !== b.reconocido) {
                return b.reconocido - a.reconocido;
            }

            const promedioA =
                obtenerPromedioEmprendimiento(a);

            const promedioB =
                obtenerPromedioEmprendimiento(b);

            if (promedioA !== promedioB) {
                return promedioB - promedioA;
            }

            const resenasA =
                obtenerResenasEmprendimiento(a.id).length;

            const resenasB =
                obtenerResenasEmprendimiento(b.id).length;

            if (resenasA !== resenasB) {
                return resenasB - resenasA;
            }

            return normalizarTexto(a.nombre)
                .localeCompare(
                    normalizarTexto(b.nombre),
                    "es",
                    { sensitivity: "base" }
                );

        });

    }

    else if (criterio === "reconocidos") {

        listaOrdenada.sort(function(a, b) {

            if (a.reconocido === b.reconocido) {
                return 0;
            }

            return a.reconocido ? -1 : 1;

        });

    }

    else if (criterio === "valoracion") {

        listaOrdenada.sort(function(a, b) {

            const promedioA =
                obtenerPromedioEmprendimiento(a);

            const promedioB =
                obtenerPromedioEmprendimiento(b);

            if (promedioA !== promedioB) {
                return promedioB - promedioA;
            }

            return (
                obtenerResenasEmprendimiento(b.id).length -
                obtenerResenasEmprendimiento(a.id).length
            );

        });

    }

    else if (criterio === "recientes") {

        listaOrdenada.sort(function(a, b) {

            return (
                Number(b.fechaCreacion || 0) -
                Number(a.fechaCreacion || 0)
            );

        });

    }

    else if (criterio === "nombre") {

        listaOrdenada.sort(function(a, b) {

            return normalizarTexto(a.nombre)
                .localeCompare(
                    normalizarTexto(b.nombre),
                    "es",
                    { sensitivity: "base" }
                );

        });

    }

    return listaOrdenada;

}


// =========================================================
// 7. CONTADOR
// =========================================================

function actualizarContadorResultados(
    cantidad,
    total = emprendimientos.length
) {

    const contador =
        document.getElementById("resultsCount");

    if (!contador) {
        return;
    }

    contador.textContent =
        `Mostrando ${cantidad} de ${total} emprendimientos.`;

}


// =========================================================
// 8. MOSTRAR EMPRENDIMIENTOS
// =========================================================

function mostrarEmprendimientos(
    lista = emprendimientos
) {

    const businessGrid =
        document.getElementById("businessGrid");

    const noResults =
        document.getElementById("noResults");

    if (!businessGrid) {
        return;
    }

    const resultados =
        Array.isArray(lista)
            ? lista
            : [];

    businessGrid.innerHTML = "";

    actualizarContadorResultados(
        resultados.length,
        emprendimientos.length
    );

    if (resultados.length === 0) {

        if (noResults) {

            noResults.style.display = "block";

            noResults.innerHTML = `

                <div class="no-results-icon">
                    🔎
                </div>

                <h3>
                    No encontramos emprendimientos
                </h3>

                <p>
                    Intenta cambiar tu búsqueda
                    o los filtros.
                </p>

                <button
                    type="button"
                    class="clear-filters"
                    onclick="limpiarFiltros()"
                >
                    Limpiar filtros
                </button>

            `;

        }

        return;

    }

    if (noResults) {
        noResults.style.display = "none";
    }

    const usuarioActual =
        obtenerUsuarioActual();

    resultados.forEach(function(emprendimiento) {

        normalizarImagenesEmprendimiento(
            emprendimiento
        );

        const tarjeta =
            document.createElement("article");

        tarjeta.className =
            "business-card";

        const resenas =
            obtenerResenasEmprendimiento(
                emprendimiento.id
            );

        const promedio =
            calcularPromedioResenas(resenas);

        const resumenResenas =
            resenas.length > 0

                ? `

                    <div class="business-rating">

                        <span class="rating-stars">
                            ${generarEstrellas(promedio)}
                        </span>

                        <span>
                            ${promedio.toFixed(1)}
                            (${resenas.length})
                        </span>

                    </div>

                `

                : `

                    <div class="business-rating no-rating">
                        ☆ Sin reseñas todavía
                    </div>

                `;

        const puedeAdministrar =

            usuarioActual &&
            emprendimiento.esPersonalizado &&
            emprendimiento.usuarioId ===
                usuarioActual.id;

        tarjeta.innerHTML = `

            <div
                class="business-cover"
                ${
                    emprendimiento.fotoPortada
                        ? `style="background-image:url('${emprendimiento.fotoPortada}');"`
                        : ""
                }
            >

                ${
                    emprendimiento.fotoPortada
                        ? ""
                        : escaparHTML(
                            emprendimiento.icono
                        )
                }

            </div>


            <div class="business-info">

                <div class="business-logo">

                    ${
                        emprendimiento.fotoPerfil

                            ? `

                                <img
                                    src="${emprendimiento.fotoPerfil}"
                                    alt="Foto de perfil"
                                >

                            `

                            : escaparHTML(
                                emprendimiento.logo
                            )
                    }

                </div>


                ${
                    emprendimiento.reconocido
                        ? `

                            <span class="seal">
                                🏅 Reconocido
                            </span>

                        `
                        : ""
                }


                <h3>
                    ${escaparHTML(
                        emprendimiento.nombre
                    )}
                </h3>


                <p class="category">

                    ${escaparHTML(
                        emprendimiento.categoriaTexto
                    )}

                    ·

                    ${escaparHTML(
                        emprendimiento.ubicacionTexto
                    )}

                </p>


                ${resumenResenas}


                <p>
                    ${escaparHTML(
                        emprendimiento.descripcion
                    )}
                </p>


                <div class="business-card-actions">

                    <a
                        href="perfil.html?id=${encodeURIComponent(
                            emprendimiento.id
                        )}"
                        class="profile-btn"
                    >
                        Ver perfil →
                    </a>


                    ${
                        puedeAdministrar

                            ? `

                                <button
                                    type="button"
                                    class="edit-business-btn"
                                    onclick="editarEmprendimiento('${emprendimiento.id}')"
                                >
                                    ✏️ Editar
                                </button>


                                <button
                                    type="button"
                                    class="delete-business-btn"
                                    onclick="eliminarEmprendimiento('${emprendimiento.id}')"
                                >
                                    <span class="delete-icon">
                                        🗑️
                                    </span>
                                    Borrar
                                </button>

                            `

                            : ""
                    }

                </div>

            </div>

        `;

        businessGrid.appendChild(tarjeta);

    });

}


// =========================================================
// 9. BUSCAR Y FILTRAR
// =========================================================

function buscarEmprendimiento() {

    const searchInput =
        document.getElementById("searchInput");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const locationFilter =
        document.getElementById("locationFilter");

    const sortFilter =
        document.getElementById("sortFilter");

    if (
        !searchInput ||
        !categoryFilter ||
        !locationFilter
    ) {
        return;
    }

    const texto =
        normalizarTexto(
            searchInput.value
        );

    const categoria =
        categoryFilter.value;

    const ubicacion =
        locationFilter.value;

    const criterio =
        sortFilter
            ? sortFilter.value
            : "defecto";

    let resultados =
        emprendimientos.filter(function(emprendimiento) {

            const nombre =
                normalizarTexto(
                    emprendimiento.nombre
                );

            const descripcion =
                normalizarTexto(
                    emprendimiento.descripcion
                );

            const categorias =
                normalizarTexto(
                    Array.isArray(
                        emprendimiento.categorias
                    )
                        ? emprendimiento.categorias.join(" ")
                        : ""
                );

            const categoriaTexto =
                normalizarTexto(
                    emprendimiento.categoriaTexto
                );

            const ubicacionTexto =
                normalizarTexto(
                    emprendimiento.ubicacionTexto
                );

            const ubicacionNombre =
                normalizarTexto(
                    emprendimiento.ubicacion
                );

            const coincideTexto =

                texto === "" ||
                nombre.includes(texto) ||
                descripcion.includes(texto) ||
                categorias.includes(texto) ||
                categoriaTexto.includes(texto) ||
                ubicacionTexto.includes(texto) ||
                ubicacionNombre.includes(texto);

            const coincideCategoria =

                categoria === "todos" ||
                (
                    Array.isArray(
                        emprendimiento.categorias
                    ) &&
                    emprendimiento.categorias.includes(
                        categoria
                    )
                );

            const coincideUbicacion =

                ubicacion === "todas" ||
                emprendimiento.ubicacion === ubicacion;

            return (
                coincideTexto &&
                coincideCategoria &&
                coincideUbicacion
            );

        });

    resultados =
        ordenarEmprendimientos(
            resultados,
            criterio
        );

    mostrarEmprendimientos(
        resultados
    );

}


function aplicarOrdenamiento() {
    buscarEmprendimiento();
}


function filtrarEmprendimientos() {
    buscarEmprendimiento();
}


// =========================================================
// 10. LIMPIAR FILTROS
// =========================================================

function limpiarFiltros() {

    const searchInput =
        document.getElementById("searchInput");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const locationFilter =
        document.getElementById("locationFilter");

    const sortFilter =
        document.getElementById("sortFilter");

    if (searchInput) {
        searchInput.value = "";
    }

    if (categoryFilter) {
        categoryFilter.value = "todos";
    }

    if (locationFilter) {
        locationFilter.value = "todas";
    }

    if (sortFilter) {
        sortFilter.value = "defecto";
    }

    mostrarEmprendimientos(
        ordenarEmprendimientos(
            emprendimientos,
            "defecto"
        )
    );

}


function mostrarTodos() {

    limpiarFiltros();

    const directorio =
        document.getElementById("directorio");

    if (directorio) {

        directorio.scrollIntoView({
            behavior: "smooth"
        });

    }

}


function buscarConEnter(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        buscarEmprendimiento();

    }

}


// =========================================================
// 11. NAVEGACIÓN / SESIÓN
// =========================================================

function abrirFormulario() {

    const usuario =
        obtenerUsuarioActual();

    if (!usuario) {

        const continuar =
            confirm(
                "Para agregar un emprendimiento necesitas iniciar sesión.\n\n" +
                "¿Quieres iniciar sesión ahora?"
            );

        if (continuar) {
            window.location.href = "login.html";
        }

        return;

    }

    window.location.href = "agregar.html";

}


function iniciarSesion() {

    const usuario =
        obtenerUsuarioActual();

    if (usuario) {

        window.location.href =
            "mi-cuenta.html";

        return;

    }

    window.location.href =
        "login.html";

}


function cerrarSesion() {

    const confirmar =
        confirm(
            "¿Seguro que quieres cerrar sesión?"
        );

    if (!confirmar) {
        return;
    }

    localStorage.removeItem(
        CLAVE_USUARIO_ACTUAL
    );

    localStorage.removeItem(
        "creativeDriveRemember"
    );

    sessionStorage.removeItem(
        CLAVE_USUARIO_ACTUAL
    );

    alert(
        "Has cerrado sesión correctamente."
    );

    actualizarNavbar();

    if (
        window.location.pathname.includes(
            "mi-cuenta"
        )
    ) {
        window.location.href =
            "index.html";
    }

    if (
        window.location.pathname.includes(
            "agregar"
        )
    ) {
        window.location.href =
            "index.html";
    }

}


// =========================================================
// 12. REDES SOCIALES
// =========================================================

function prepararWhatsApp(numeroWhatsApp) {

    if (!numeroWhatsApp) {
        return "";
    }

    let numero =
        String(numeroWhatsApp)
            .replace(/\D/g, "");

    if (numero.startsWith("0")) {

        numero =
            "593" +
            numero.substring(1);

    }

    else if (
        !numero.startsWith("593")
    ) {

        numero =
            "593" +
            numero;

    }

    return `https://wa.me/${numero}`;

}


function prepararInstagram(usuarioInstagram) {

    if (!usuarioInstagram) {
        return "";
    }

    const usuario =
        String(usuarioInstagram)
            .replace(/^@/, "")
            .trim();

    if (!usuario) {
        return "";
    }

    return `https://www.instagram.com/${encodeURIComponent(
        usuario
    )}`;

}


// =========================================================
// 13. MOSTRAR PERFIL
// =========================================================

function mostrarPerfil() {

    const profileContainer =
        document.getElementById(
            "profileContainer"
        );

    if (!profileContainer) {
        return;
    }

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const id =
        parametros.get("id");

    const emprendimiento =
        emprendimientos.find(function(item) {
            return item.id === id;
        });

    if (!emprendimiento) {

        profileContainer.innerHTML = `

            <div class="profile-not-found">

                <h2>
                    Emprendimiento no encontrado
                </h2>

                <p>
                    El emprendimiento que buscas
                    no existe o ya no está disponible.
                </p>

                <a
                    href="index.html#directorio"
                    class="profile-btn"
                >
                    ← Volver al directorio
                </a>

            </div>

        `;

        return;

    }

    normalizarImagenesEmprendimiento(
        emprendimiento
    );

    const instagramLink =
        prepararInstagram(
            emprendimiento.instagram
        );

    const whatsappLink =
        prepararWhatsApp(
            emprendimiento.whatsapp
        );

    const tieneContacto =
        Boolean(
            emprendimiento.instagram ||
            emprendimiento.whatsapp ||
            emprendimiento.email
        );

    const usuarioActual =
        obtenerUsuarioActual();

    const puedeEditar =

        usuarioActual &&
        emprendimiento.esPersonalizado &&
        emprendimiento.usuarioId ===
            usuarioActual.id;

    profileContainer.innerHTML = `

        <div
            class="profile-cover"
            ${
                emprendimiento.fotoPortada
                    ? `style="background-image:url('${emprendimiento.fotoPortada}');"`
                    : ""
            }
        >

            ${
                emprendimiento.fotoPortada
                    ? ""
                    : `

                        <div class="profile-cover-icon">
                            ${escaparHTML(
                                emprendimiento.icono
                            )}
                        </div>

                    `
            }

        </div>


        <div class="profile-content">

            <div class="profile-header">

                <div class="profile-logo">

                    ${
                        emprendimiento.fotoPerfil

                            ? `

                                <img
                                    src="${emprendimiento.fotoPerfil}"
                                    alt="Foto de ${escaparHTML(
                                        emprendimiento.nombre
                                    )}"
                                >

                            `

                            : escaparHTML(
                                emprendimiento.logo
                            )
                    }

                </div>


                <div class="profile-main-info">

                    ${
                        emprendimiento.reconocido

                            ? `

                                <span class="seal">
                                    🏅 Reconocido
                                </span>

                            `

                            : ""
                    }


                    <h1>
                        ${escaparHTML(
                            emprendimiento.nombre
                        )}
                    </h1>


                    <p class="profile-location">
                        ${escaparHTML(
                            emprendimiento.ubicacionTexto
                        )}
                    </p>


                    <div id="earnedSealsContainer">

                        ${renderizarBadgesSellosGanados(
                            emprendimiento
                        )}

                    </div>

                </div>

            </div>


            <div class="profile-categories">

                ${escaparHTML(
                    emprendimiento.categoriaTexto
                )}

            </div>


            <div class="profile-description">

                <h2>
                    Sobre el emprendimiento
                </h2>

                <p>
                    ${escaparHTML(
                        emprendimiento.descripcion
                    )}
                </p>

            </div>


            ${
                emprendimiento.galeria &&
                emprendimiento.galeria.length > 0

                    ? `

                        <div class="profile-gallery">

                            <div class="profile-gallery-header">

                                <span class="section-tag">
                                    GALERÍA
                                </span>

                                <h2>
                                    Conoce el emprendimiento
                                </h2>

                                <p>
                                    Fotos del negocio,
                                    productos y experiencias.
                                </p>

                            </div>


                            <div class="gallery-grid">

                                ${
                                    emprendimiento.galeria
                                        .map(function(
                                            imagen,
                                            indice
                                        ) {

                                            return `

                                                <div class="gallery-item">

                                                    <img
                                                        src="${imagen}"
                                                        alt="Foto ${
                                                            indice + 1
                                                        } de ${
                                                            escaparHTML(
                                                                emprendimiento.nombre
                                                            )
                                                        }"
                                                    >

                                                </div>

                                            `;

                                        })
                                        .join("")
                                }

                            </div>

                        </div>

                    `

                    : puedeEditar

                        ? `

                            <div class="profile-gallery">

                                <div class="profile-gallery-header">

                                    <span class="section-tag">
                                        GALERÍA
                                    </span>

                                    <h2>
                                        Conoce el emprendimiento
                                    </h2>

                                    <p>
                                        Fotos del negocio,
                                        productos y experiencias.
                                    </p>

                                </div>


                                <div class="gallery-empty">

                                    <div class="gallery-empty-icon">
                                        🖼️
                                    </div>

                                    <h3>
                                        Todavía no has agregado fotos
                                    </h3>

                                    <p>
                                        Muestra tu negocio, tus productos
                                        o tus instalaciones para que las
                                        personas conozcan más sobre tu
                                        emprendimiento.
                                    </p>

                                    <button
                                        type="button"
                                        class="edit-business-btn"
                                        onclick="editarEmprendimiento('${emprendimiento.id}')"
                                    >
                                        ✏️ Agregar fotos
                                    </button>

                                </div>

                            </div>

                        `

                        : ""
            }


            <div class="profile-seals-section">

                <div class="profile-gallery-header">

                    <span class="section-tag">
                        SELLOS DE LA COMUNIDAD
                    </span>

                    <h2>
                        Vota por este emprendimiento
                    </h2>

                    <p>
                        Cada sello necesita
                        ${VOTOS_NECESARIOS_SELLO}
                        votos de la comunidad para
                        aparecer en el perfil.
                        Puedes votar por los sellos
                        que creas que este emprendimiento
                        merece.
                    </p>

                </div>


                <div
                    class="seals-vote-grid"
                    id="sealsGrid"
                >

                    ${renderizarSellosVotacion(
                        emprendimiento
                    )}

                </div>

            </div>


            ${
                tieneContacto

                    ? `

                        <div class="profile-contact">

                            <h2>
                                Contacta con el emprendimiento
                            </h2>

                            <div class="contact-buttons">

                                ${
                                    emprendimiento.instagram

                                        ? `

                                            <a
                                                href="${instagramLink}"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="contact-btn instagram-btn"
                                            >
                                                <span class="contact-icon">
                                                    📸
                                                </span>

                                                <span>
                                                    Instagram
                                                </span>
                                            </a>

                                        `

                                        : ""
                                }


                                ${
                                    emprendimiento.whatsapp

                                        ? `

                                            <a
                                                href="${whatsappLink}"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="contact-btn whatsapp-btn"
                                            >
                                                <span class="contact-icon">
                                                    📱
                                                </span>

                                                <span>
                                                    WhatsApp
                                                </span>
                                            </a>

                                        `

                                        : ""
                                }


                                ${
                                    emprendimiento.email

                                        ? `

                                            <a
                                                href="mailto:${encodeURIComponent(
                                                    emprendimiento.email
                                                )}"
                                                class="contact-btn email-btn"
                                            >
                                                <span class="contact-icon">
                                                    ✉️
                                                </span>

                                                <span>
                                                    Correo electrónico
                                                </span>
                                            </a>

                                        `

                                        : ""
                                }

                            </div>

                        </div>

                    `

                    : `

                        <div class="profile-contact">

                            <h2>
                                Información de contacto
                            </h2>

                            <p>
                                Este emprendimiento todavía
                                no ha agregado información de contacto.
                            </p>

                        </div>

                    `
            }


            <div class="reviews-section">

                <div class="reviews-header">

                    <div>

                        <span class="section-tag">
                            OPINIONES
                        </span>

                        <h2>
                            Reseñas del emprendimiento
                        </h2>

                        <p>
                            Comparte tu experiencia y ayuda
                            a otros usuarios a conocer este emprendimiento.
                        </p>

                    </div>

                </div>


                <div class="reviews-summary">

                    <div class="reviews-average">

                        <strong id="reviewsAverage">
                            0.0
                        </strong>

                        <div
                            class="reviews-stars"
                            id="reviewsAverageStars"
                        >
                            ☆☆☆☆☆
                        </div>

                        <span id="reviewsCount">
                            0 reseñas
                        </span>

                    </div>


                    <div class="reviews-summary-text">

                        <strong>
                            ¿Has comprado o utilizado sus productos?
                        </strong>

                        <p>
                            Cuéntale a la comunidad cómo fue tu experiencia.
                        </p>

                    </div>

                </div>


                <div class="review-form-container">

                    <h3>
                        Deja tu reseña
                    </h3>

                    <form
                        id="reviewForm"
                        onsubmit="publicarResena(
                            event,
                            '${emprendimiento.id}'
                        )"
                    >

                        <div class="review-form-group">

                            <label for="reviewName">
                                Tu nombre
                            </label>

                            <input
                                type="text"
                                id="reviewName"
                                maxlength="50"
                                placeholder="Ej. Juan Pérez"
                                required
                            >

                        </div>


                        <div class="review-form-group">

                            <label>
                                Tu calificación
                            </label>

                            <div
                                class="star-rating-input"
                                id="starRatingInput"
                            >

                                ${[1,2,3,4,5]
                                    .map(function(numero) {

                                        return `

                                            <button
                                                type="button"
                                                class="star-option"
                                                data-rating="${numero}"
                                                aria-label="${numero} estrella${
                                                    numero > 1
                                                        ? "s"
                                                        : ""
                                                }"
                                            >
                                                ☆
                                            </button>

                                        `;

                                    })
                                    .join("")
                                }

                            </div>


                            <input
                                type="hidden"
                                id="reviewRating"
                                value="0"
                            >

                        </div>


                        <div class="review-form-group">

                            <label for="reviewText">
                                Tu reseña
                            </label>

                            <textarea
                                id="reviewText"
                                rows="5"
                                maxlength="500"
                                placeholder="Cuéntanos sobre tu experiencia..."
                                required
                            ></textarea>

                            <small>
                                Máximo 500 caracteres.
                            </small>

                        </div>


                        <button
                            type="submit"
                            class="submit-review-btn"
                        >
                            Publicar reseña
                        </button>

                    </form>

                </div>


                <div
                    id="reviewsList"
                    class="reviews-list"
                ></div>

            </div>


            <div class="profile-actions">

                <a
                    href="index.html#directorio"
                    class="back-btn"
                >
                    ← Volver al directorio
                </a>


                ${
                    puedeEditar

                        ? `

                            <button
                                type="button"
                                class="edit-business-btn"
                                onclick="editarEmprendimiento('${emprendimiento.id}')"
                            >
                                ✏️ Editar emprendimiento
                            </button>


                            <button
                                type="button"
                                class="delete-business-btn"
                                onclick="eliminarEmprendimiento('${emprendimiento.id}')"
                            >
                                🗑️ Eliminar emprendimiento
                            </button>

                        `

                        : ""
                }

            </div>

        </div>

    `;

    document.title =
        `${emprendimiento.nombre} | Creative Drive`;

    activarSelectorEstrellas();

    mostrarResenasPerfil(
        emprendimiento.id
    );

}
// =========================================================
// 14. SELECTOR DE ESTRELLAS
// =========================================================

function activarSelectorEstrellas() {

    const estrellas =
        document.querySelectorAll(
            ".star-option"
        );

    const ratingInput =
        document.getElementById(
            "reviewRating"
        );

    if (
        !estrellas.length ||
        !ratingInput
    ) {
        return;
    }

    estrellas.forEach(function(estrella) {

        estrella.addEventListener(
            "click",
            function() {

                const rating =
                    Number(
                        estrella.dataset.rating
                    );

                ratingInput.value =
                    rating;

                actualizarEstrellas(
                    estrellas,
                    rating
                );

            }
        );

        estrella.addEventListener(
            "mouseenter",
            function() {

                const rating =
                    Number(
                        estrella.dataset.rating
                    );

                actualizarEstrellas(
                    estrellas,
                    rating
                );

            }
        );

    });

    const contenedor =
        document.getElementById(
            "starRatingInput"
        );

    if (contenedor) {

        contenedor.addEventListener(
            "mouseleave",
            function() {

                actualizarEstrellas(
                    estrellas,
                    Number(
                        ratingInput.value
                    )
                );

            }
        );

    }

}


function actualizarEstrellas(
    estrellas,
    rating
) {

    estrellas.forEach(function(estrella) {

        const valor =
            Number(
                estrella.dataset.rating
            );

        estrella.textContent =
            valor <= rating
                ? "★"
                : "☆";

    });

}


// =========================================================
// 15. PUBLICAR RESEÑA
// =========================================================

function publicarResena(
    event,
    emprendimientoId
) {

    event.preventDefault();

    const nombreInput =
        document.getElementById(
            "reviewName"
        );

    const ratingInput =
        document.getElementById(
            "reviewRating"
        );

    const textoInput =
        document.getElementById(
            "reviewText"
        );

    if (
        !nombreInput ||
        !ratingInput ||
        !textoInput
    ) {
        return;
    }

    const nombre =
        nombreInput.value.trim();

    const calificacion =
        Number(
            ratingInput.value
        );

    const texto =
        textoInput.value.trim();

    if (!nombre) {

        alert(
            "Por favor, escribe tu nombre."
        );

        nombreInput.focus();

        return;

    }

    if (nombre.length < 2) {

        alert(
            "El nombre debe tener al menos 2 caracteres."
        );

        nombreInput.focus();

        return;

    }

    if (
        calificacion < 1 ||
        calificacion > 5
    ) {

        alert(
            "Selecciona una calificación de 1 a 5 estrellas."
        );

        return;

    }

    if (!texto) {

        alert(
            "Escribe una reseña antes de publicarla."
        );

        textoInput.focus();

        return;

    }

    if (texto.length < 10) {

        alert(
            "La reseña debe tener al menos 10 caracteres."
        );

        textoInput.focus();

        return;

    }

    const emprendimiento =
        emprendimientos.find(function(item) {

            return item.id ===
                emprendimientoId;

        });

    if (!emprendimiento) {

        alert(
            "No se encontró el emprendimiento."
        );

        return;

    }

    const todasLasResenas =
        obtenerResenas();

    if (
        !Array.isArray(
            todasLasResenas[
                emprendimientoId
            ]
        )
    ) {

        todasLasResenas[
            emprendimientoId
        ] = [];

    }

    const nuevaResena = {

        id:
            Date.now().toString(),

        nombre:
            nombre,

        calificacion:
            calificacion,

        texto:
            texto,

        fecha:
            new Date().toISOString()

    };

    todasLasResenas[
        emprendimientoId
    ].unshift(
        nuevaResena
    );

    if (
        !guardarResenas(
            todasLasResenas
        )
    ) {

        alert(
            "No se pudo guardar la reseña."
        );

        return;

    }

    nombreInput.value = "";
    textoInput.value = "";
    ratingInput.value = "0";

    actualizarEstrellas(
        document.querySelectorAll(
            ".star-option"
        ),
        0
    );

    mostrarResenasPerfil(
        emprendimientoId
    );

    alert(
        "¡Tu reseña fue publicada correctamente!"
    );

}


// =========================================================
// 16. MOSTRAR RESEÑAS
// =========================================================

function mostrarResenasPerfil(
    emprendimientoId
) {

    const reviewsList =
        document.getElementById(
            "reviewsList"
        );

    if (!reviewsList) {
        return;
    }

    const resenas =
        obtenerResenasEmprendimiento(
            emprendimientoId
        );

    const promedio =
        calcularPromedioResenas(
            resenas
        );

    const average =
        document.getElementById(
            "reviewsAverage"
        );

    const averageStars =
        document.getElementById(
            "reviewsAverageStars"
        );

    const count =
        document.getElementById(
            "reviewsCount"
        );

    if (average) {

        average.textContent =
            promedio.toFixed(1);

    }

    if (averageStars) {

        averageStars.textContent =
            generarEstrellas(
                promedio
            );

    }

    if (count) {

        count.textContent =
            resenas.length === 1
                ? "1 reseña"
                : `${resenas.length} reseñas`;

    }

    if (resenas.length === 0) {

        reviewsList.innerHTML = `

            <div class="no-reviews">

                <div class="no-reviews-icon">
                    💬
                </div>

                <h3>
                    Todavía no hay reseñas
                </h3>

                <p>
                    Sé la primera persona en compartir
                    su experiencia.
                </p>

            </div>

        `;

        return;

    }

    reviewsList.innerHTML = `

        <h3 class="reviews-list-title">
            Opiniones de la comunidad
        </h3>

    `;

    resenas.forEach(function(resena) {

        const reviewCard =
            document.createElement(
                "article"
            );

        reviewCard.className =
            "review-card";

        const fecha =
            formatearFecha(
                resena.fecha
            );

        const nombreSeguro =
            String(
                resena.nombre || ""
            );

        reviewCard.innerHTML = `

            <div class="review-card-header">

                <div class="review-user">

                    <div class="review-avatar">

                        ${escaparHTML(
                            nombreSeguro
                                .charAt(0)
                                .toUpperCase()
                        )}

                    </div>


                    <div>

                        <strong>
                            ${escaparHTML(
                                nombreSeguro
                            )}
                        </strong>

                        <span class="review-date">
                            ${escaparHTML(
                                fecha
                            )}
                        </span>

                    </div>

                </div>


                <div class="review-rating">

                    ${generarEstrellas(
                        resena.calificacion
                    )}

                </div>

            </div>


            <p class="review-text">

                ${escaparHTML(
                    resena.texto
                )}

            </p>

        `;

        reviewsList.appendChild(
            reviewCard
        );

    });

}


function formatearFecha(fecha) {

    if (!fecha) {
        return "";
    }

    const fechaObjeto =
        new Date(fecha);

    if (
        Number.isNaN(
            fechaObjeto.getTime()
        )
    ) {
        return "";
    }

    return fechaObjeto.toLocaleDateString(
        "es-EC",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


// =========================================================
// 17. IMÁGENES
// =========================================================

function normalizarImagenesEmprendimiento(
    emprendimiento
) {

    if (!emprendimiento) {
        return;
    }

    emprendimiento.fotoPerfil =
        emprendimiento.fotoPerfil || "";

    emprendimiento.fotoPortada =
        emprendimiento.fotoPortada || "";

    if (
        !Array.isArray(
            emprendimiento.galeria
        )
    ) {

        emprendimiento.galeria = [];

    }

}


function leerImagenComoDataURL(
    archivo
) {

    return new Promise(function(
        resolve,
        reject
    ) {

        if (!archivo) {

            resolve("");

            return;

        }

        const lector =
            new FileReader();

        lector.onload =
            function(event) {

                resolve(
                    event.target.result
                );

            };

        lector.onerror =
            function(error) {

                reject(error);

            };

        lector.readAsDataURL(
            archivo
        );

    });

}


async function obtenerImagenDesdeInput(
    idInput
) {

    const input =
        document.getElementById(
            idInput
        );

    if (
        !input ||
        !input.files ||
        input.files.length === 0
    ) {

        return "";

    }

    return await leerImagenComoDataURL(
        input.files[0]
    );

}


async function obtenerGaleriaDesdeInput(
    idInput
) {

    const input =
        document.getElementById(
            idInput
        );

    if (
        !input ||
        !input.files ||
        input.files.length === 0
    ) {

        return [];

    }

    const archivos =
        Array.from(
            input.files
        );

    const imagenes =
        await Promise.all(

            archivos.map(function(archivo) {

                return leerImagenComoDataURL(
                    archivo
                );

            })

        );

    return imagenes.filter(function(imagen) {

        return imagen !== "";

    });

}


function esImagenValida(
    archivo
) {

    if (!archivo) {
        return false;
    }

    return archivo.type.startsWith(
        "image/"
    );

}


function validarTamanoImagen(
    archivo,
    maximoMB = 3
) {

    if (!archivo) {
        return true;
    }

    const maximoBytes =
        maximoMB *
        1024 *
        1024;

    return archivo.size <=
        maximoBytes;

}


// =========================================================
// 18. CARGAR EMPRENDIMIENTOS
// =========================================================

function cargarEmprendimientos() {

    const datosGuardados =
        localStorage.getItem(
            CLAVE_EMPRENDIMIENTOS
        );

    if (!datosGuardados) {
        return;
    }

    try {

        const guardados =
            JSON.parse(
                datosGuardados
            );

        if (!Array.isArray(guardados)) {
            return;
        }

        guardados.forEach(function(nuevo) {

            if (
                !nuevo ||
                !nuevo.id
            ) {
                return;
            }

            const yaExiste =
                emprendimientos.some(function(
                    existente
                ) {

                    return existente.id ===
                        nuevo.id;

                });

            if (yaExiste) {
                return;
            }

            nuevo.esPersonalizado = true;
            nuevo.reconocido = false;
            nuevo.usuarioId =
                nuevo.usuarioId || "";

            if (
                !Array.isArray(
                    nuevo.categorias
                )
            ) {
                nuevo.categorias = [];
            }

            nuevo.categoriaTexto =
                nuevo.categoriaTexto || "";

            nuevo.ubicacionTexto =
                nuevo.ubicacionTexto || "";

            nuevo.descripcion =
                nuevo.descripcion || "";

            nuevo.icono =
                nuevo.icono || "🏪";

            nuevo.logo =
                nuevo.logo ||
                String(
                    nuevo.nombre || "E"
                )
                    .charAt(0)
                    .toUpperCase();

            nuevo.instagram =
                nuevo.instagram || "";

            nuevo.whatsapp =
                nuevo.whatsapp || "";

            nuevo.email =
                nuevo.email || "";

            nuevo.fechaCreacion =
                nuevo.fechaCreacion ||
                obtenerFechaDesdeId(
                    nuevo.id
                );

            normalizarImagenesEmprendimiento(
                nuevo
            );

            emprendimientos.push(
                nuevo
            );

        });

    }

    catch (error) {

        console.error(
            "Error al cargar los emprendimientos:",
            error
        );

    }

}


function obtenerFechaDesdeId(id) {

    if (!id) {
        return 0;
    }

    const partes =
        String(id).split("-");

    const ultimo =
        partes[
            partes.length - 1
        ];

    const numero =
        Number(ultimo);

    return Number.isNaN(numero)
        ? 0
        : numero;

}


// =========================================================
// 19. MIS EMPRENDIMIENTOS
// =========================================================

function obtenerMisEmprendimientos() {

    const usuario =
        obtenerUsuarioActual();

    if (!usuario) {
        return [];
    }

    return emprendimientos.filter(
        function(emprendimiento) {

            return (
                emprendimiento.esPersonalizado &&
                emprendimiento.usuarioId ===
                    usuario.id
            );

        }
    );

}


function obtenerMiEmprendimiento() {

    const misEmprendimientos =
        obtenerMisEmprendimientos();

    if (
        misEmprendimientos.length === 0
    ) {
        return null;
    }

    return misEmprendimientos[0];

}


// =========================================================
// 20. AGREGAR EMPRENDIMIENTO
// =========================================================

async function agregarEmprendimiento(
    event
) {

    event.preventDefault();

    const usuario =
        obtenerUsuarioActual();

    if (!usuario) {

        alert(
            "Debes iniciar sesión antes de agregar un emprendimiento."
        );

        window.location.href =
            "login.html";

        return;

    }

    const nombreInput =
        document.getElementById(
            "businessName"
        );

    const descripcionInput =
        document.getElementById(
            "businessDescription"
        );

    const ubicacionInput =
        document.getElementById(
            "businessLocation"
        );

    const instagramInput =
        document.getElementById(
            "businessInstagram"
        );

    const whatsappInput =
        document.getElementById(
            "businessWhatsapp"
        );

    const emailInput =
        document.getElementById(
            "businessEmail"
        );

    if (
        !nombreInput ||
        !descripcionInput ||
        !ubicacionInput
    ) {

        alert(
            "No se encontraron todos los campos del formulario."
        );

        return;

    }

    const nombre =
        nombreInput.value.trim();

    const descripcion =
        descripcionInput.value.trim();

    const ubicacion =
        ubicacionInput.value;

    const instagram =
        instagramInput
            ? instagramInput.value.trim()
            : "";

    const whatsapp =
        whatsappInput
            ? whatsappInput.value.trim()
            : "";

    const email =
        emailInput
            ? emailInput.value.trim()
            : "";

    if (nombre.length < 2) {

        alert(
            "El nombre debe tener al menos 2 caracteres."
        );

        nombreInput.focus();

        return;

    }

    if (descripcion.length < 10) {

        alert(
            "La descripción debe tener al menos 10 caracteres."
        );

        descripcionInput.focus();

        return;

    }

    if (!ubicacion) {

        alert(
            "Selecciona una ubicación."
        );

        return;

    }

    const categoriasSeleccionadas =
        Array.from(
            document.querySelectorAll(
                'input[name="category"]:checked'
            )
        ).map(function(checkbox) {

            return checkbox.value;

        });

    if (
        categoriasSeleccionadas.length === 0
    ) {

        alert(
            "Selecciona al menos una categoría."
        );

        return;

    }


    // -----------------------------------------
    // IMÁGENES
    // -----------------------------------------

    const profileInput =
        document.getElementById(
            "businessProfileImage"
        );

    const coverInput =
        document.getElementById(
            "businessCoverImage"
        );

    const galleryInput =
        document.getElementById(
            "businessGalleryImages"
        );


    // Foto perfil

    if (
        profileInput &&
        profileInput.files.length > 0
    ) {

        const archivo =
            profileInput.files[0];

        if (!esImagenValida(archivo)) {

            alert(
                "La foto de perfil debe ser una imagen."
            );

            return;

        }

        if (
            !validarTamanoImagen(
                archivo
            )
        ) {

            alert(
                "La foto de perfil no debe superar los 3 MB."
            );

            return;

        }

    }


    // Foto portada

    if (
        coverInput &&
        coverInput.files.length > 0
    ) {

        const archivo =
            coverInput.files[0];

        if (!esImagenValida(archivo)) {

            alert(
                "La foto de portada debe ser una imagen."
            );

            return;

        }

        if (
            !validarTamanoImagen(
                archivo
            )
        ) {

            alert(
                "La foto de portada no debe superar los 3 MB."
            );

            return;

        }

    }


    // Galería

    if (
        galleryInput &&
        galleryInput.files.length > 0
    ) {

        const archivos =
            Array.from(
                galleryInput.files
            );

        if (archivos.length > 10) {

            alert(
                "Puedes agregar un máximo de 10 fotos a la galería."
            );

            return;

        }

        for (
            const archivo of archivos
        ) {

            if (!esImagenValida(archivo)) {

                alert(
                    "Todas las fotos de la galería deben ser imágenes."
                );

                return;

            }

            if (
                !validarTamanoImagen(
                    archivo
                )
            ) {

                alert(
                    "Cada foto de la galería no debe superar los 3 MB."
                );

                return;

            }

        }

    }


    let fotoPerfil = "";
    let fotoPortada = "";
    let galeria = [];

    try {

        fotoPerfil =
            await obtenerImagenDesdeInput(
                "businessProfileImage"
            );

        fotoPortada =
            await obtenerImagenDesdeInput(
                "businessCoverImage"
            );

        galeria =
            await obtenerGaleriaDesdeInput(
                "businessGalleryImages"
            );

    }

    catch (error) {

        console.error(
            "Error al procesar las imágenes:",
            error
        );

        alert(
            "No se pudieron procesar las imágenes."
        );

        return;

    }


    // -----------------------------------------
    // CATEGORÍAS
    // -----------------------------------------

    const nombresCategorias = {

        alimentacion: "🍔 Alimentación",
        moda: "👕 Moda",
        diseno: "🎨 Diseño",
        tecnologia: "💻 Tecnología",
        belleza: "💄 Belleza",
        servicios: "🔧 Servicios",
        educacion: "📚 Educación",
        comercio: "🛍️ Comercio"

    };

    const categoriaTexto =
        categoriasSeleccionadas
            .map(function(categoria) {

                return (
                    nombresCategorias[
                        categoria
                    ] || categoria
                );

            })
            .join(" · ");


    // -----------------------------------------
    // UBICACIÓN
    // -----------------------------------------

    const nombresUbicaciones = {

        guayaquil: "📍 Guayaquil",
        quito: "📍 Quito",
        cuenca: "📍 Cuenca"

    };

    const ubicacionTexto =
        nombresUbicaciones[
            ubicacion
        ] ||
        `📍 ${ubicacion}`;


    // -----------------------------------------
    // ID
    // -----------------------------------------

    const idBase =
        normalizarTexto(nombre)
            .replace(
                /[^a-z0-9]+/g,
                "-"
            )
            .replace(
                /^-|-$/g,
                ""
            );

    const ahora =
        Date.now();

    const id =
        `${idBase}-${ahora}`;


    // -----------------------------------------
    // OBJETO
    // -----------------------------------------

    const nuevoEmprendimiento = {

        id,
        nombre,
        descripcion,
        categorias:
            categoriasSeleccionadas,
        categoriaTexto,
        ubicacion,
        ubicacionTexto,

        icono:
            "🏪",

        logo:
            nombre
                .charAt(0)
                .toUpperCase(),

        fotoPerfil,
        fotoPortada,
        galeria,

        reconocido:
            false,

        esPersonalizado:
            true,

        usuarioId:
            usuario.id,

        instagram,
        whatsapp,
        email,

        fechaCreacion:
            ahora

    };


    // -----------------------------------------
    // GUARDAR
    // -----------------------------------------

    let guardados = [];

    try {

        guardados =
            JSON.parse(
                localStorage.getItem(
                    CLAVE_EMPRENDIMIENTOS
                )
            ) || [];

        if (
            !Array.isArray(
                guardados
            )
        ) {
            guardados = [];
        }

    }

    catch (error) {

        console.error(
            "Error al leer emprendimientos:",
            error
        );

        guardados = [];

    }

    guardados.push(
        nuevoEmprendimiento
    );

    try {

        localStorage.setItem(
            CLAVE_EMPRENDIMIENTOS,
            JSON.stringify(
                guardados
            )
        );

    }

    catch (error) {

        console.error(
            "Error al guardar:",
            error
        );

        alert(
            "No se pudo guardar el emprendimiento.\n\n" +
            "Es posible que las imágenes sean demasiado pesadas. " +
            "Prueba utilizando imágenes más pequeñas."
        );

        return;

    }

    emprendimientos.push(
        nuevoEmprendimiento
    );

    alert(
        "¡Emprendimiento agregado correctamente!"
    );

    window.location.href =
        "index.html#directorio";

}


// =========================================================
// 21. EDITAR EMPRENDIMIENTO
// =========================================================

function editarEmprendimiento(
    emprendimientoId
) {

    const emprendimiento =
        emprendimientos.find(function(item) {

            return item.id ===
                emprendimientoId;

        });

    if (!emprendimiento) {

        alert(
            "No se encontró el emprendimiento."
        );

        return;

    }

    const usuario =
        obtenerUsuarioActual();

    if (!usuario) {

        alert(
            "Debes iniciar sesión para editar un emprendimiento."
        );

        window.location.href =
            "login.html";

        return;

    }

    if (
        !emprendimiento.esPersonalizado
    ) {

        alert(
            "Este emprendimiento original no puede editarse."
        );

        return;

    }

    if (
        emprendimiento.usuarioId !==
        usuario.id
    ) {

        alert(
            "No tienes permiso para editar este emprendimiento."
        );

        return;

    }

    window.location.href =
        `agregar.html?editar=${encodeURIComponent(
            emprendimiento.id
        )}`;

}


function obtenerIdEdicion() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    return parametros.get(
        "editar"
    );

}


// =========================================================
// 22. CARGAR FORMULARIO DE EDICIÓN
// =========================================================

function cargarFormularioEdicion() {

    const id =
        obtenerIdEdicion();

    if (!id) {
        return false;
    }

    const emprendimiento =
        emprendimientos.find(function(item) {

            return item.id === id;

        });

    if (!emprendimiento) {

        alert(
            "No se encontró el emprendimiento que deseas editar."
        );

        window.location.href =
            "index.html#directorio";

        return false;

    }

    const usuario =
        obtenerUsuarioActual();

    if (!usuario) {

        alert(
            "Debes iniciar sesión para editar este emprendimiento."
        );

        window.location.href =
            "login.html";

        return false;

    }

    if (
        !emprendimiento.esPersonalizado ||
        emprendimiento.usuarioId !==
            usuario.id
    ) {

        alert(
            "No tienes permiso para editar este emprendimiento."
        );

        window.location.href =
            "index.html#directorio";

        return false;

    }

    normalizarImagenesEmprendimiento(
        emprendimiento
    );

    const nombreInput =
        document.getElementById(
            "businessName"
        );

    const descripcionInput =
        document.getElementById(
            "businessDescription"
        );

    const ubicacionInput =
        document.getElementById(
            "businessLocation"
        );

    const instagramInput =
        document.getElementById(
            "businessInstagram"
        );

    const whatsappInput =
        document.getElementById(
            "businessWhatsapp"
        );

    const emailInput =
        document.getElementById(
            "businessEmail"
        );

    if (nombreInput) {
        nombreInput.value =
            emprendimiento.nombre || "";
    }

    if (descripcionInput) {
        descripcionInput.value =
            emprendimiento.descripcion || "";
    }

    if (ubicacionInput) {
        ubicacionInput.value =
            emprendimiento.ubicacion || "";
    }

    if (instagramInput) {
        instagramInput.value =
            emprendimiento.instagram || "";
    }

    if (whatsappInput) {
        whatsappInput.value =
            emprendimiento.whatsapp || "";
    }

    if (emailInput) {
        emailInput.value =
            emprendimiento.email || "";
    }


    // -----------------------------------------
    // CATEGORÍAS
    // -----------------------------------------

    const categorias =
        Array.isArray(
            emprendimiento.categorias
        )
            ? emprendimiento.categorias
            : [];

    document
        .querySelectorAll(
            'input[name="category"]'
        )
        .forEach(function(checkbox) {

            checkbox.checked =
                categorias.includes(
                    checkbox.value
                );

        });


    // -----------------------------------------
    // PREVISUALIZACIÓN PERFIL
    // -----------------------------------------

    const profilePreview =
        document.getElementById(
            "profileImagePreview"
        );

    if (
        profilePreview &&
        emprendimiento.fotoPerfil
    ) {

        profilePreview.src =
            emprendimiento.fotoPerfil;

        profilePreview.style.display =
            "block";

    }


    // -----------------------------------------
    // PREVISUALIZACIÓN PORTADA
    // -----------------------------------------

    const coverPreview =
        document.getElementById(
            "coverImagePreview"
        );

    if (
        coverPreview &&
        emprendimiento.fotoPortada
    ) {

        coverPreview.src =
            emprendimiento.fotoPortada;

        coverPreview.style.display =
            "block";

    }


    // -----------------------------------------
    // GALERÍA
    // -----------------------------------------

    const galleryPreview =
        document.getElementById(
            "galleryPreview"
        );

    if (
        galleryPreview &&
        emprendimiento.galeria.length > 0
    ) {

        galleryPreview.innerHTML = "";

        emprendimiento.galeria.forEach(
            function(imagen, indice) {

                const img =
                    document.createElement(
                        "img"
                    );

                img.src =
                    imagen;

                img.className =
                    "gallery-preview-image";

                img.alt =
                    `Foto ${indice + 1}`;

                galleryPreview.appendChild(
                    img
                );

            }
        );

    }


    // -----------------------------------------
    // TEXTOS
    // -----------------------------------------

    const titulo =
        document.querySelector(
            ".form-title"
        );

    if (titulo) {

        titulo.textContent =
            "Editar emprendimiento";

    }

    const subtitulo =
        document.querySelector(
            ".form-subtitle"
        );

    if (subtitulo) {

        subtitulo.textContent =
            "Actualiza la información de tu emprendimiento.";

    }

    const boton =
        document.querySelector(
            'button[type="submit"]'
        );

    if (boton) {

        boton.textContent =
            "Guardar cambios";

    }

    document.title =
        `Editar ${emprendimiento.nombre} | Creative Drive`;

    return true;

}


// =========================================================
// 23. GUARDAR EDICIÓN
// =========================================================

async function guardarEdicionEmprendimiento(
    event
) {

    event.preventDefault();

    const id =
        obtenerIdEdicion();

    if (!id) {
        return false;
    }

    const emprendimiento =
        emprendimientos.find(function(item) {

            return item.id === id;

        });

    if (!emprendimiento) {

        alert(
            "No se encontró el emprendimiento."
        );

        return false;

    }

    const usuario =
        obtenerUsuarioActual();

    if (!usuario) {

        alert(
            "Debes iniciar sesión para realizar esta acción."
        );

        window.location.href =
            "login.html";

        return false;

    }

    if (
        !emprendimiento.esPersonalizado ||
        emprendimiento.usuarioId !==
            usuario.id
    ) {

        alert(
            "No tienes permiso para editar este emprendimiento."
        );

        return false;

    }

    const nombreInput =
        document.getElementById(
            "businessName"
        );

    const descripcionInput =
        document.getElementById(
            "businessDescription"
        );

    const ubicacionInput =
        document.getElementById(
            "businessLocation"
        );

    const instagramInput =
        document.getElementById(
            "businessInstagram"
        );

    const whatsappInput =
        document.getElementById(
            "businessWhatsapp"
        );

    const emailInput =
        document.getElementById(
            "businessEmail"
        );

    if (
        !nombreInput ||
        !descripcionInput ||
        !ubicacionInput
    ) {

        alert(
            "No se encontraron todos los campos del formulario."
        );

        return false;

    }

    const nombre =
        nombreInput.value.trim();

    const descripcion =
        descripcionInput.value.trim();

    const ubicacion =
        ubicacionInput.value;

    const instagram =
        instagramInput
            ? instagramInput.value.trim()
            : "";

    const whatsapp =
        whatsappInput
            ? whatsappInput.value.trim()
            : "";

    const email =
        emailInput
            ? emailInput.value.trim()
            : "";

    if (nombre.length < 2) {

        alert(
            "El nombre debe tener al menos 2 caracteres."
        );

        nombreInput.focus();

        return false;

    }

    if (descripcion.length < 10) {

        alert(
            "La descripción debe tener al menos 10 caracteres."
        );

        descripcionInput.focus();

        return false;

    }

    if (!ubicacion) {

        alert(
            "Selecciona una ubicación."
        );

        return false;

    }

    const categoriasSeleccionadas =
        Array.from(
            document.querySelectorAll(
                'input[name="category"]:checked'
            )
        ).map(function(checkbox) {

            return checkbox.value;

        });

    if (
        categoriasSeleccionadas.length === 0
    ) {

        alert(
            "Selecciona al menos una categoría."
        );

        return false;

    }


    // -----------------------------------------
    // IMÁGENES NUEVAS
    // -----------------------------------------

    const profileInput =
        document.getElementById(
            "businessProfileImage"
        );

    const coverInput =
        document.getElementById(
            "businessCoverImage"
        );

    const galleryInput =
        document.getElementById(
            "businessGalleryImages"
        );


    // Validar nuevas imágenes

    if (
        profileInput &&
        profileInput.files.length > 0
    ) {

        const archivo =
            profileInput.files[0];

        if (!esImagenValida(archivo)) {

            alert(
                "La foto de perfil debe ser una imagen."
            );

            return false;

        }

        if (
            !validarTamanoImagen(
                archivo
            )
        ) {

            alert(
                "La foto de perfil no debe superar los 3 MB."
            );

            return false;

        }

    }


    if (
        coverInput &&
        coverInput.files.length > 0
    ) {

        const archivo =
            coverInput.files[0];

        if (!esImagenValida(archivo)) {

            alert(
                "La foto de portada debe ser una imagen."
            );

            return false;

        }

        if (
            !validarTamanoImagen(
                archivo
            )
        ) {

            alert(
                "La foto de portada no debe superar los 3 MB."
            );

            return false;

        }

    }


    if (
        galleryInput &&
        galleryInput.files.length > 0
    ) {

        const archivos =
            Array.from(
                galleryInput.files
            );

        if (
            archivos.length > 10
        ) {

            alert(
                "Puedes seleccionar hasta 10 fotos."
            );

            return false;

        }

        for (
            const archivo of archivos
        ) {

            if (!esImagenValida(archivo)) {

                alert(
                    "Todas las fotos deben ser imágenes."
                );

                return false;

            }

            if (
                !validarTamanoImagen(
                    archivo
                )
            ) {

                alert(
                    "Cada foto no debe superar los 3 MB."
                );

                return false;

            }

        }

    }


    normalizarImagenesEmprendimiento(
        emprendimiento
    );


    let nuevaFotoPerfil = "";
    let nuevaFotoPortada = "";
    let nuevaGaleria = [];


    try {

        nuevaFotoPerfil =
            await obtenerImagenDesdeInput(
                "businessProfileImage"
            );

        nuevaFotoPortada =
            await obtenerImagenDesdeInput(
                "businessCoverImage"
            );

        nuevaGaleria =
            await obtenerGaleriaDesdeInput(
                "businessGalleryImages"
            );

    }

    catch (error) {

        console.error(
            "Error al procesar imágenes:",
            error
        );

        alert(
            "No se pudieron procesar las imágenes."
        );

        return false;

    }


    if (nuevaFotoPerfil) {

        emprendimiento.fotoPerfil =
            nuevaFotoPerfil;

    }


    if (nuevaFotoPortada) {

        emprendimiento.fotoPortada =
            nuevaFotoPortada;

    }


    if (
        nuevaGaleria.length > 0
    ) {

        emprendimiento.galeria =
            [
                ...emprendimiento.galeria,
                ...nuevaGaleria
            ];

    }


    // Máximo 10 fotos

    emprendimiento.galeria =
        emprendimiento.galeria.slice(
            0,
            10
        );


    // -----------------------------------------
    // CATEGORÍAS
    // -----------------------------------------

    const nombresCategorias = {

        alimentacion: "🍔 Alimentación",
        moda: "👕 Moda",
        diseno: "🎨 Diseño",
        tecnologia: "💻 Tecnología",
        belleza: "💄 Belleza",
        servicios: "🔧 Servicios",
        educacion: "📚 Educación",
        comercio: "🛍️ Comercio"

    };

    const categoriaTexto =
        categoriasSeleccionadas
            .map(function(categoria) {

                return (
                    nombresCategorias[
                        categoria
                    ] || categoria
                );

            })
            .join(" · ");


    const nombresUbicaciones = {

        guayaquil: "📍 Guayaquil",
        quito: "📍 Quito",
        cuenca: "📍 Cuenca"

    };

    const ubicacionTexto =
        nombresUbicaciones[
            ubicacion
        ] ||
        `📍 ${ubicacion}`;


    // -----------------------------------------
    // ACTUALIZAR DATOS
    // -----------------------------------------

    emprendimiento.nombre =
        nombre;

    emprendimiento.descripcion =
        descripcion;

    emprendimiento.categorias =
        categoriasSeleccionadas;

    emprendimiento.categoriaTexto =
        categoriaTexto;

    emprendimiento.ubicacion =
        ubicacion;

    emprendimiento.ubicacionTexto =
        ubicacionTexto;

    emprendimiento.instagram =
        instagram;

    emprendimiento.whatsapp =
        whatsapp;

    emprendimiento.email =
        email;

    emprendimiento.logo =
        nombre
            .charAt(0)
            .toUpperCase();


    // -----------------------------------------
    // GUARDAR LOCALSTORAGE
    // -----------------------------------------

    let guardados = [];

    try {

        guardados =
            JSON.parse(
                localStorage.getItem(
                    CLAVE_EMPRENDIMIENTOS
                )
            ) || [];

        if (
            !Array.isArray(
                guardados
            )
        ) {
            guardados = [];
        }

    }

    catch (error) {

        console.error(
            "Error al leer emprendimientos:",
            error
        );

        alert(
            "No se pudieron leer los datos guardados."
        );

        return false;

    }


    const indice =
        guardados.findIndex(function(item) {

            return item.id === id;

        });

    if (indice === -1) {

        alert(
            "No se encontró el emprendimiento guardado."
        );

        return false;

    }


    guardados[indice] =
        emprendimiento;


    try {

        localStorage.setItem(
            CLAVE_EMPRENDIMIENTOS,
            JSON.stringify(
                guardados
            )
        );

    }

    catch (error) {

        console.error(
            "Error al guardar los cambios:",
            error
        );

        alert(
            "No se pudieron guardar los cambios.\n\n" +
            "Las imágenes pueden ocupar demasiado espacio."
        );

        return false;

    }


    alert(
        "¡Los cambios se guardaron correctamente!"
    );


    window.location.href =
        `perfil.html?id=${encodeURIComponent(
            emprendimiento.id
        )}`;

    return true;

}


// =========================================================
// 24. ELIMINAR EMPRENDIMIENTO
// =========================================================

function eliminarEmprendimiento(
    emprendimientoId
) {

    const usuario =
        obtenerUsuarioActual();

    if (!usuario) {

        alert(
            "Debes iniciar sesión para eliminar un emprendimiento."
        );

        window.location.href =
            "login.html";

        return;

    }

    const emprendimiento =
        emprendimientos.find(function(item) {

            return item.id ===
                emprendimientoId;

        });

    if (!emprendimiento) {

        alert(
            "No se encontró el emprendimiento."
        );

        return;

    }

    if (
        IDS_EMPRENDIMIENTOS_ORIGINALES.includes(
            emprendimiento.id
        )
    ) {

        alert(
            "Los emprendimientos originales de Creative Drive no pueden eliminarse."
        );

        return;

    }

    if (
        !emprendimiento.esPersonalizado
    ) {

        alert(
            "Este emprendimiento no puede eliminarse."
        );

        return;

    }

    if (
        emprendimiento.usuarioId !==
        usuario.id
    ) {

        alert(
            "No tienes permiso para eliminar este emprendimiento."
        );

        return;

    }

    const confirmar =
        confirm(

            `¿Seguro que quieres eliminar "${emprendimiento.nombre}"?\n\n` +
            "Esta acción no se puede deshacer."

        );

    if (!confirmar) {
        return;
    }

    let guardados = [];

    try {

        guardados =
            JSON.parse(
                localStorage.getItem(
                    CLAVE_EMPRENDIMIENTOS
                )
            ) || [];

        if (
            !Array.isArray(
                guardados
            )
        ) {
            guardados = [];
        }

    }

    catch (error) {

        console.error(
            "Error al leer los emprendimientos:",
            error
        );

        alert(
            "No se pudo acceder a los datos guardados."
        );

        return;

    }

    guardados =
        guardados.filter(function(item) {

            return item.id !==
                emprendimientoId;

        });

    try {

        localStorage.setItem(
            CLAVE_EMPRENDIMIENTOS,
            JSON.stringify(
                guardados
            )
        );

    }

    catch (error) {

        console.error(
            "Error al eliminar el emprendimiento:",
            error
        );

        alert(
            "No se pudo eliminar el emprendimiento."
        );

        return;

    }

    emprendimientos =
        emprendimientos.filter(function(item) {

            return item.id !==
                emprendimientoId;

        });


    // Eliminar reseñas

    const todasLasResenas =
        obtenerResenas();

    if (
        todasLasResenas[
            emprendimientoId
        ]
    ) {

        delete todasLasResenas[
            emprendimientoId
        ];

        guardarResenas(
            todasLasResenas
        );

    }


    // Eliminar votos de sellos

    eliminarVotosEmprendimiento(
        emprendimientoId
    );

    alert(
        "El emprendimiento se eliminó correctamente."
    );

    window.location.href =
        "index.html#directorio";

}


// =========================================================
// 25. NAVBAR
// =========================================================

function actualizarNavbar() {

    const navActions =
        document.querySelector(
            ".nav-actions"
        );

    if (!navActions) {
        return;
    }

    const usuario =
        obtenerUsuarioActual();


    // -----------------------------------------
    // SIN SESIÓN
    // -----------------------------------------

    if (!usuario) {

        navActions.innerHTML = `

            <button
                type="button"
                class="add-business-btn"
                onclick="abrirFormulario()"
            >
                + Agregar emprendimiento
            </button>


            <button
                type="button"
                class="login-btn"
                onclick="iniciarSesion()"
            >
                Iniciar sesión
            </button>

        `;

        return;

    }


    // -----------------------------------------
    // CON SESIÓN
    // -----------------------------------------

    const nombre =
        usuario.name ||
        usuario.nombre ||
        usuario.email ||
        "Usuario";

    navActions.innerHTML = `

        <button
            type="button"
            class="add-business-btn"
            onclick="abrirFormulario()"
        >
            + Agregar emprendimiento
        </button>


        <div class="user-session">

            <a
                href="mi-cuenta.html"
                class="user-name"
            >
                👤 ${escaparHTML(
                    nombre
                )}
            </a>


            <button
                type="button"
                class="login-btn"
                onclick="cerrarSesion()"
            >
                Cerrar sesión
            </button>

        </div>

    `;

}


// =========================================================
// 26. INICIAR CREATIVE DRIVE
// =========================================================

cargarEmprendimientos();


// =========================================================
// 27. DETECTAR PÁGINA
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // -------------------------------------
        // NAVBAR
        // -------------------------------------

        actualizarNavbar();


        // -------------------------------------
        // DIRECTORIO
        // -------------------------------------

        const businessGrid =
            document.getElementById(
                "businessGrid"
            );

        if (businessGrid) {

            mostrarEmprendimientos(

                ordenarEmprendimientos(
                    emprendimientos,
                    "defecto"
                )

            );

        }


        // -------------------------------------
        // PERFIL
        // -------------------------------------

        const profileContainer =
            document.getElementById(
                "profileContainer"
            );

        if (profileContainer) {

            mostrarPerfil();

        }


        // -------------------------------------
        // FORMULARIO
        // -------------------------------------

        const formulario =
            document.querySelector(
                "form"
            );

        const idEdicion =
            obtenerIdEdicion();

        if (
            formulario &&
            idEdicion
        ) {

            cargarFormularioEdicion();

        }

    }
);