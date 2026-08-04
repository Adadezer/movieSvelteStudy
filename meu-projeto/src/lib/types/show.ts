export type TVMazeSearchResult = {
	// score: number;

	// show: {
	id: number;
	name: string;
	premiered: string;
	genres: string[];

	rating: {
		average: number | null;
	};

	image: {
		medium: string;
		original: string;
	} | null;
	// };
};

export type Show = {
	id: number;
	title: string;
	rating: number;
	year: string;
	image: string;
	genres: string[];
};
