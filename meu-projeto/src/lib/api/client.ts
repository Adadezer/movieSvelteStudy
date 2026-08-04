import { PUBLIC_API_URL } from '$env/static/public';
export const get = async <T>(url: string): Promise<T> => {
	const response = await fetch(`${PUBLIC_API_URL}${url}`);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	return data as T;
};
