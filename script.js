const btnBuscar = document.getElementById('btnBuscar');
const inputNombrePokemon = document.getElementById('pokemonName');
const sectionInfoPokemon = document.getElementById('infoPokemon');

btnBuscar.addEventListener('click', () => {
    const nombre = inputNombrePokemon.value.trim().toLowerCase();

    if (nombre === "") {
        sectionInfoPokemon.innerHTML = '<p>Por favor, escribe el nombre de un Pokémon.</p>';
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
    const tipos = {
        water: 'Agua',
        electric: 'Eléctrico',
        fire: 'Fuego',
        grass: 'Planta',
        poison: 'Veneno',
        normal: 'Normal',
        bug: 'Bicho',
        ground: 'Tierra',
        psychic: 'Psíquico',
        ice: 'Hielo',
        fighting: 'Lucha',
        rock: 'Roca',
        ghost: 'Fantasma',
        dragon: 'Dragón',
        dark: 'Siniestro',
        steel: 'Acero',
        fairy: 'Hada',
        flying: 'Volador'
    };

    return tipos[tipo] || tipo;
}

function mostrarInfoPokemon(datos) {
    const tipoPrincipal = datos.types[0].type.name;
    const tipoTexto = datos.types.map(t => traducirTipo(t.type.name)).join(', ');
    const habilidad = datos.abilities[0]?.ability.name || 'No disponible';
    const primerMovimiento = datos.moves[0]?.move.name || 'No disponible';

    sectionInfoPokemon.className = `info-pokemon tipo-${tipoPrincipal}`;

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