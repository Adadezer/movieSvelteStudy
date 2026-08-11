import { getShowById, getShowCastById } from '$lib/api/tvmaze';

export async function load({ params }) {
	const show = await getShowById(params.id);
	const cast = await getShowCastById(params.id);
	console.log('params.id: ', params.id);
	console.log('cast: ', cast);

	return { show, cast };
}
