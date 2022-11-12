interface TImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}
interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}
export interface TAudio extends SanityBody {
  _type: "audio";
  title: string;
  audio: any;
}

export interface TUser extends SanityBody {
  _type: "user";
  username?: string;
}
export interface TPlaylist extends SanityBody {
  _type: "playlist";
  title: string;
  slug: string;
  songs: TAudio[];
}
export interface TExerciseType extends SanityBody {
  _type: "exerciseType";
  title: string;
  description: string;
}

export interface TExercise extends SanityBody {
  _type: "exercise";
  title: string;
  exerciseType: TExerciseType;
  duration: number;
}
export interface TWorkout extends SanityBody {
  _type: "exerciseType";
  slug: string;
  title: string;
  mainImage: TImage;
  Exercises: TExercise[];
  playlist: TPlaylist;
  private?: boolean;
}

export interface TLike extends SanityBody {
  _type: "like";
  user: TUser;
  workout: TWorkout;
}
export interface TSession {
  user: string;
  expires: any;
  name: string;
}
