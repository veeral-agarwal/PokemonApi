import "./App.css"
import { useState } from "react"
import Axios from "axios"

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false)
  const [pokemon, setPokemon] =useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=>{
    setPokemon({
      name: pokemonName,
      species: response.data.species.name,
      img: response.data.sprites.front_default,
      hp: response.data.stats[0].base_stat,
      attack: response.data.stats[1].base_stat,
      defense: response.data.stats[2].base_stat,
      type: response.data.types[0].type.name,
    })
    setPokemonChosen(true)
    console.log(pokemon);
    })
  }
  
  return (
    <div className="App">
      <div className="TitleSection">
        <h1>
          Pokemon Stats
        </h1>
        <input type="text" onChange={(event) => {setPokemonName(event.target.value)}}></input>
        <button onClick={searchPokemon}>search pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
        <h1>choose a pokemon</h1>
        ) : (
        <>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.img}></img>
          <h3>species : {pokemon.species}</h3>
          <h3>type : {pokemon.type}</h3>
          <h4>hp: {pokemon.hp}</h4>
          <h4>attack: {pokemon.attack}</h4>
          <h4>defense: {pokemon.defense}</h4>
        </>
        )}
      </div>
    </div>
  )
}

export default App;