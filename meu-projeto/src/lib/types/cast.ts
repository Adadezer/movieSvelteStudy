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
	id: number;
	actor: string;
	character: string;
	image: string;
	// self: boolean;
	voice: boolean;
};
