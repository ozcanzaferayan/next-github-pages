import Image from "next/image";

async function getPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
  const pokemons = await res.json();

  const promises = await Promise.allSettled(
    pokemons.results.map((pokemon: any) => fetchPokemonData(pokemon)),
  );
  return promises.map((promise: any) => promise.value);
}
const fetchPokemonData = async (pokemon: any) => {
  let url = pokemon.url;
  const res = await fetch(url);
  const data = await res.json();
  return {
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map((typeInfo: any) => typeInfo.type.name),
  };
};

const page = async () => {
  const pokemons = await getPokemons();
  return (
    <div className="flex h-dvh w-full flex-wrap gap-4 bg-slate-50">
      {pokemons.map((pokemon: any) => (
        <div key={pokemon.name} className="flex flex-1 flex-col ">
          <Image
            className="h-24 w-24"
            src={pokemon.image}
            alt={pokemon.name}
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold">{pokemon.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default page;
