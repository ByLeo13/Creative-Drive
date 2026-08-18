// ==========================================
// EDITOR DE IMÁGENES
// ==========================================

function renderEditorImagenes(emprendimiento){

    normalizarImagenesEmprendimiento(emprendimiento);

    renderFotoPerfil(emprendimiento);

    renderFotoPortada(emprendimiento);

    renderGaleria(emprendimiento);

}

// ==========================================
// FOTO DE PERFIL
// ==========================================

function renderFotoPerfil(emprendimiento){

    const contenedor=document.getElementById("previewPerfil");

    if(!contenedor) return;

    if(!emprendimiento.fotoPerfil){

        contenedor.innerHTML=`
            <div class="sin-imagen">
                Sin foto de perfil
            </div>
        `;

        return;

    }

    contenedor.innerHTML=`

        <img
            src="${emprendimiento.fotoPerfil}"
            class="preview-imagen">

        <button
            class="btnEliminarImagen"
            onclick="quitarFotoPerfil()">

            Eliminar

        </button>

    `;

}

// ==========================================
// PORTADA
// ==========================================

function renderFotoPortada(emprendimiento){

    const contenedor=document.getElementById("previewPortada");

    if(!contenedor) return;

    if(!emprendimiento.fotoPortada){

        contenedor.innerHTML=`
            <div class="sin-imagen">
                Sin portada
            </div>
        `;

        return;

    }

    contenedor.innerHTML=`

        <img
            src="${emprendimiento.fotoPortada}"
            class="preview-portada">

        <button
            class="btnEliminarImagen"
            onclick="quitarFotoPortada()">

            Eliminar

        </button>

    `;

}

// ==========================================
// GALERÍA
// ==========================================

function renderGaleria(emprendimiento){

    const contenedor=document.getElementById("previewGaleria");

    if(!contenedor) return;

    if(!emprendimiento.galeria.length){

        contenedor.innerHTML=`
            <p>No hay imágenes.</p>
        `;

        return;

    }

    let html="";

    emprendimiento.galeria.forEach(function(imagen){

        html+=`

        <div class="cardImagen">

            <img
                src="${imagen.url}"
                class="preview-imagen">

            <textarea

                class="descripcionImagen"

                placeholder="Descripción"

                onchange="editarDescripcionImagen(
                    '${imagen.id}',
                    this.value
                )"

            >${imagen.descripcion}</textarea>

            <button

                class="btnEliminarImagen"

                onclick="eliminarImagenGaleria(
                    '${imagen.id}'
                )"

            >

                Eliminar

            </button>

        </div>

        `;

    });

    html+=`

        <div class="contadorGaleria">

            ${emprendimiento.galeria.length}
            / 10 imágenes

        </div>

    `;

    contenedor.innerHTML=html;

}

function quitarFotoPerfil(){

    if(!confirm("¿Eliminar foto de perfil?"))
        return;

    emprendimientoEditando.fotoPerfil="";

    guardarEmprendimientos();

    renderEditorImagenes(emprendimientoEditando);

}

function quitarFotoPortada(){

    if(!confirm("¿Eliminar portada?"))
        return;

    emprendimientoEditando.fotoPortada="";

    guardarEmprendimientos();

    renderEditorImagenes(emprendimientoEditando);

}

function eliminarImagenGaleria(id){

    if(!confirm("¿Eliminar imagen?"))
        return;

    eliminarFotoGaleria(

        emprendimientoEditando,

        id

    );

    guardarEmprendimientos();

    renderEditorImagenes(emprendimientoEditando);

}

function editarDescripcionImagen(

    id,

    descripcion

){

    actualizarDescripcionImagen(

        emprendimientoEditando,

        id,

        descripcion

    );

    guardarEmprendimientos();

}