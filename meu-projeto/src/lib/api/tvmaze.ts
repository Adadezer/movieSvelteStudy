import { get } from '$lib/api/client';
import type { CastMember, TVMazeCastResult } from '$lib/types/cast';
import type { Show, TVMazeResult, TVMazeSearchResult } from '$lib/types/show';

function mapStatus(status: string | null): string {
	switch (status) {
		case 'Running':
			return 'Em exibição';

		case 'Ended':
			return 'Finalizada';

		case 'In Development':
			return 'Em desenvolvimento';

		case 'To Be Determined':
			return 'A definir';

		default:
			return status ?? 'Desconhecido';
	}
}

function mapToShow(result: TVMazeResult): Show {
	return {
		id: result.id,
		title: result.name,
		rating: result.rating.average,
		year: result.premiered?.slice(0, 4) ?? '-',
		image: result.image?.medium ?? result.image?.original ?? '',
		genres: result.genres,
		summary: result.summary ?? '',
		status: mapStatus(result.status),
		officialSite: result.officialSite ?? ''
	};
}

function mapToCastMember(entry: TVMazeCastResult): CastMember {
	return {
		// id: entry.person.id, // forçar erro para ver bug e tratamento de erro, aqui e em client.ts (filme: Person of Interest)
		id: `${entry.person.id}-${entry.character.id}`, // resolve bug de um personagem ter 2 atores diferentes, resultando em erro na navegação e pagina indo para o topo da home.
		actor: entry.person.name,
		character: entry.character.name,
		image: entry.character.image?.medium ?? entry.person.image?.medium ?? '',
		voice: entry.voice
	};
}

export async function getTVMazeShows(page: number) {
	const results = await get<TVMazeResult[]>(`/shows?page=${page}`);

	return results.map(mapToShow);
}

export async function searchShows(query: string) {
	const results = await get<TVMazeSearchResult[]>(`/search/shows?q=${encodeURIComponent(query)}`);

	return results.map((result) => mapToShow(result.show));
}

export async function getShowById(id: string) {
	const result = await get<TVMazeResult>(`/shows/${id}`);
	return mapToShow(result);
}

export async function getShowCastById(id: string) {
	const results = await get<TVMazeCastResult[]>(`/shows/${id}/cast`);
	return results.map(mapToCastMember);
}
