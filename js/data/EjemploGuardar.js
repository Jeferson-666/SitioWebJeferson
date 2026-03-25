
 export class EjemploGuardar{

    static KEY="mis_pokemon";
    static guardarPokemons(pokemones){
        localStorage.setItem(this.KEY,JSON.stringify(pokemones));
    }   

    static obtenerPokemons(){
        const datos=localStorage.getItem(this.KEY);
        return datos ? JSON.parse.datos:[];

    }




}