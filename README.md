# NextJS Github pages

1. Change nextConfig in next.config.js file

```js
const nextConfig = {
  basePath: "/next-github-pages",
  output: "export",
  images: {
    unoptimized: true,
  },
};
```

2. Use fetch to get data from API

```js
async function getPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
  const pokemons = await res.json();

  const promises = await Promise.allSettled(
    pokemons.results.map((pokemon: any) => fetchPokemonData(pokemon)),
  );
  return promises.map((promise: any) => promise.value);
}
```

3. Render data in page

```js
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
```

4. Activate github actions in your repository

5. Add nextjs.yml file from
   https://github.com/gregrickaby/nextjs-github-pages/blob/main/.github/workflows/deploy.yml

6. Make commit and push to your repository
