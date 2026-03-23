const btnBuscar = document.getElementById('btnBuscar');
const inputNombrePokemon = document.getElementById('pokemonName');
const sectionInfoPokemon = document.getElementById('infoPokemon');

btnBuscar.addEventListener('click', () => {
    const nombre = inputNombrePokemon.value.trim().toLowerCase();

    if (nombre === "") {
        sectionInfoPokemon.innerHTML = '<p>Escribe el nombre de un Pokémon.</p>';
        sectionInfoPokemon.className = 'info-pokemon';
        return;
    }

    buscarPokemon(nombre);
});

async function buscarPokemon(nombre) {
    sectionInfoPokemon.innerHTML = '<p>Buscando Pokémon...</p>';
    sectionInfoPokemon.className = 'info-pokemon';

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

        if (!respuesta.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const datos = await respuesta.json();
        mostrarInfoPokemon(datos);

    } catch (error) {
        sectionInfoPokemon.innerHTML = '<p>Ocurrió un error o el Pokémon no existe.</p>';
        sectionInfoPokemon.className = 'info-pokemon';
    }
}

function traducirTipo(tipo) {
    if (tipo === 'water') return 'Agua';
    if (tipo === 'electric') return 'Eléctrico';
    if (tipo === 'fire') return 'Fuego';
    return tipo;
}

function mostrarInfoPokemon(datos) {

    const tipoPrincipal = datos.types[0].type.name;

    const tipoTexto = datos.types.map(function(t) {
        return traducirTipo(t.type.name);
    }).join(', ');

    // Comprobar si la respueta esta disponible
    let habilidad = 'No disponible';
    if (datos.abilities.length > 0) {
        habilidad = datos.abilities[0].ability.name;
    }

    let primerMovimiento = 'No disponible';
    if (datos.moves.length > 0) {
        primerMovimiento = datos.moves[0].move.name;
    }

    // 3 tipos que ocupo Electrico , agua y fuego
    if (tipoPrincipal === 'water' || tipoPrincipal === 'electric' || tipoPrincipal === 'fire') {
        sectionInfoPokemon.className = 'info-pokemon tipo-' + tipoPrincipal;
    } else {
        sectionInfoPokemon.className = 'info-pokemon';
    }

    sectionInfoPokemon.innerHTML = `
        <div class="tarjeta-pokemon">
            <img src="${datos.sprites.other['official-artwork'].front_default}" alt="${datos.name}">
            <h2>${datos.name}</h2>

            <div class="datos-pokemon">
                <div class="dato"><strong>Tipo:</strong> ${tipoTexto}</div>
                <div class="dato"><strong>Habilidad:</strong> ${habilidad}</div>
                <div class="dato"><strong>Primer movimiento:</strong> ${primerMovimiento}</div>
            </div>
        </div>
    `;
}