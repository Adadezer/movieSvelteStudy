import { get } from '$lib/api/client';
import type { TVMazeResult } from '$lib/types/show';

export function getShows() {
	return get<TVMazeResult[]>('/shows');
}
