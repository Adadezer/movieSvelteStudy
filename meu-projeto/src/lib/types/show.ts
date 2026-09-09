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

	summary: string | null;
	status: string | null;
	officialSite: string | null;
};

export type TVMazeSearchResult = {
	score: number;
	show: TVMazeResult;
};

export type Show = {
	id: number;
	title: string;
	// null = a API não tem avaliação. NÃO troque por 0: 'sem nota' e 'nota zero' são coisas diferentes, e nenhum show do TVMaze tem 0 real.
	rating: number | null;
	year: string;
	image: string;
	genres: string[];
	summary: string;
	status: string;
	officialSite: string;
};
