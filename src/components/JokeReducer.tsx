export interface Joke {
  id: number;
  description: string;
  rating: number;
}

export interface State {
  jokes: Joke[];
  loading: boolean;
  error: string | null;
}

export type Action =
  | { type: 'FETCH_JOKE_REQUEST' }
  | { type: 'FETCH_JOKE_SUCCESS'; payload: Joke }
  | { type: 'FETCH_JOKE_FAILURE'; payload: string }
  | { type: 'ADD_USER_JOKE'; payload: Joke }
  | { type: 'INCREASE_RATING'; payload: number }
  | { type: 'DECREASE_RATING'; payload: number };

export const initialState: State = {
  jokes: [],
  loading: false,
  error: null,
};

export const jokeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_JOKE_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_JOKE_SUCCESS':
      return {
        ...state,
        loading: false,
        jokes: [...state.jokes, action.payload],
      };
    case 'FETCH_JOKE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'ADD_USER_JOKE':
      return {
        ...state,
        jokes: [...state.jokes, action.payload],
      };
    case 'INCREASE_RATING':
      return {
        ...state,
        jokes: state.jokes.map((joke) =>
          joke.id === action.payload ? { ...joke, rating: joke.rating + 1 } : joke
        ),
      };
    case 'DECREASE_RATING':
      return {
        ...state,
        jokes: state.jokes.map((joke) =>
          joke.id === action.payload ? { ...joke, rating: joke.rating > 1 ? joke.rating - 1 : joke.rating } : joke
        ),
      };
    default:
      return state;
  }
};
