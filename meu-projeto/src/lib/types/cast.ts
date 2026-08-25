type TVMazeImage = {
	medium: string;
	original: string;
};

export type TVMazeCastResult = {
	person: {
		id: number;
		name: string;

		image: TVMazeImage | null;
	};

	character: {
		id: number;
		name: string;

		image: TVMazeImage | null;
	};

	// self: boolean;
	voice: boolean;
};

export type CastMember = {
	// person.id + character.id: dois atores podem dividir o mesmo personagem
	// (temporadas diferentes), então character.id sozinho se repete.
	id: string;
	actor: string;
	character: string;
	image: string;
	// self: boolean;
	voice: boolean;
};
