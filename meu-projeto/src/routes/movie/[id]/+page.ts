import { getShowById } from '$lib/api/tvmaze';

export async function load({ params }) {
	const show = await getShowById(params.id);
	console.log('params.id: ', params.id);

	return { show };
}
