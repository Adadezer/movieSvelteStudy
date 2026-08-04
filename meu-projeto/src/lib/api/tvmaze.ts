import { PUBLIC_API_URL } from '$env/static/public';
// import type { Show, TVMazeSearchResult } from '$lib/types/show';

export async function getShows() {
	// const url = `${PUBLIC_API_URL}/search/shows?q=pokemon`;
	const url = `${PUBLIC_API_URL}/shows`;
	const response = await fetch(url);
	const data = await response.json();
	console.log('Dados recebidos da API:', data); // Log para verificar os dados recebidos
	return data;
	// return data.map((item: TVMazeSearchResult) => ({
	// 	id: item.show.id,
	// 	title: item.show.name,
	// 	rating: item.show.rating.average ?? 0,
	// 	year: item.show.premiered.slice(0, 4),
	// 	image: item.show.image?.medium ?? item.show.image?.original ?? '',
	// 	genres: item.show.genres
	// }));
}
