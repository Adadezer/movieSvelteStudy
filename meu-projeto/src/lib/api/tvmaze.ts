import { get } from '$lib/api/client';
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
		rating: result.rating.average ?? 0,
		year: result.premiered?.slice(0, 4) ?? '-',
		image: result.image?.medium ?? result.image?.original ?? '',
		genres: result.genres,
		summary: result.summary ?? '',
		status: mapStatus(result.status),
		officialSite: result.officialSite ?? ''
	};
}
export async function getShows() {
	const results = await get<TVMazeResult[]>('/shows');
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
