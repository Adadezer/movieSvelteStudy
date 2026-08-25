import { getShowById, getShowCastById } from '$lib/api/tvmaze';

export async function load({ params }) {
	// As duas chamadas disparam juntas, em vez de uma esperar a outra.
	const [show, cast] = await Promise.all([getShowById(params.id), getShowCastById(params.id)]);

	return { show, cast };
}
