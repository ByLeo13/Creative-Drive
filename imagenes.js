// ==========================================
// SISTEMA DE IMÁGENES
// Creative Drive
// ==========================================

const MAX_FOTOS_GALERIA = 10;

/*
Cada imagen tendrá esta estructura

{
    id: "",
    url: "",
    descripcion: ""
}
*/

function generarIdImagen() {

    return "img_" +
        Date.now() +
        "_" +
        Math.random().toString(36).substring(2,8);

}

// ==========================================
// NORMALIZAR IMÁGENES
// ==========================================

function normalizarImagenesEmprendimiento(emprendimiento){

    if(!emprendimiento) return;

    if(!emprendimiento.fotoPerfil){

        emprendimiento.fotoPerfil="";

    }

    if(!emprendimiento.fotoPortada){

        emprendimiento.fotoPortada="";

    }

    if(!Array.isArray(emprendimiento.galeria)){

        emprendimiento.galeria=[];

    }

    emprendimiento.galeria=
        emprendimiento.galeria.map(function(imagen){

            // Compatibilidad con imágenes antiguas

            if(typeof imagen==="string"){

                return{

                    id:generarIdImagen(),

                    url:imagen,

                    descripcion:""

                };

            }

            return{

                id:imagen.id || generarIdImagen(),

                url:imagen.url,

                descripcion:imagen.descripcion || ""

            };

        });

}

// ==========================================
// LEER IMAGEN
// ==========================================

function leerImagenComoDataURL(archivo){

    return new Promise(function(resolve,reject){

        const lector=new FileReader();

        lector.onload=function(e){

            resolve(e.target.result);

        };

        lector.onerror=reject;

        lector.readAsDataURL(archivo);

    });

}

// ==========================================
// PERFIL
// ==========================================

async function obtenerImagenPerfil(idInput){

    const input=document.getElementById(idInput);

    if(!input) return "";

    if(!input.files.length) return "";

    return await leerImagenComoDataURL(input.files[0]);

}

// ==========================================
// PORTADA
// ==========================================

async function obtenerImagenPortada(idInput){

    const input=document.getElementById(idInput);

    if(!input) return "";

    if(!input.files.length) return "";

    return await leerImagenComoDataURL(input.files[0]);

}

// ==========================================
// GALERÍA
// ==========================================

async function obtenerGaleriaNueva(idInput){

    const input=document.getElementById(idInput);

    if(!input) return [];

    if(!input.files.length) return [];

    const resultado=[];

    for(const archivo of input.files){

        const url=await leerImagenComoDataURL(archivo);

        resultado.push({

            id:generarIdImagen(),

            url:url,

            descripcion:""

        });

    }

    return resultado;

}

// ==========================================
// AGREGAR FOTOS
// ==========================================

function agregarFotosGaleria(emprendimiento,nuevas){

    normalizarImagenesEmprendimiento(emprendimiento);

    const disponibles=
        MAX_FOTOS_GALERIA-
        emprendimiento.galeria.length;

    if(disponibles<=0){

        alert("Máximo 10 imágenes.");

        return false;

    }

    emprendimiento.galeria.push(

        ...nuevas.slice(0,disponibles)

    );

    return true;

}

// ==========================================
// ELIMINAR FOTO
// ==========================================

function eliminarFotoGaleria(

    emprendimiento,

    idImagen

){

    emprendimiento.galeria=
        emprendimiento.galeria.filter(function(img){

            return img.id!==idImagen;

        });

}

// ==========================================
// ELIMINAR PERFIL
// ==========================================

function eliminarFotoPerfil(

    emprendimiento

){

    emprendimiento.fotoPerfil="";

}

// ==========================================
// ELIMINAR PORTADA
// ==========================================

function eliminarFotoPortada(

    emprendimiento

){

    emprendimiento.fotoPortada="";

}

// ==========================================
// CAMBIAR DESCRIPCIÓN
// ==========================================

function actualizarDescripcionImagen(

    emprendimiento,

    idImagen,

    descripcion

){

    const imagen=
        emprendimiento.galeria.find(function(img){

            return img.id===idImagen;

        });

    if(imagen){

        imagen.descripcion=descripcion;

    }

}

// Comprime una imagen usando Canvas y devuelve una Promesa con la cadena Base64 optimizada
function comprimirImagen(file, maxWidth = 800, calidad = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Devuelve la imagen comprimida en formato JPEG
                const dataUrl = canvas.toDataURL('image/jpeg', calidad);
                resolve(dataUrl);
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
}

const archivo = inputElement.files[0];
comprimirImagen(archivo, 800, 0.75).then(base64Optimizado => {
    // Guardar base64Optimizado en el objeto del emprendimiento
});