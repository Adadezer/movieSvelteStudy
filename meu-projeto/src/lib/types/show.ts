export type TVMazeResult = {
	id: number;
	name: string;
	premiered: string | null;
	genres: string[];

	rating: {
		average: number | null;
	};

	image: {
		medium: string;
		original: string;
	} | null;
};

export type TVMazeSearchResult = {
	score: number;
	show: TVMazeResult;
};

export type Show = {
	id: number;
	title: string;
	rating: number;
	year: string;
	image: string;
	genres: string[];
};
