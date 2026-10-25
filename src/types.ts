export type SceneId =
  | 'welcome'
  | 'scene1' // Welcome to Safari
  | 'scene2' // Meet the Elephant
  | 'scene3' // Guess the Sound
  | 'scene4' // Move like an animal
  | 'scene5' // Match the animal
  | 'scene6'; // Favorite animal & Reflection

export type AnimalId = 'gajah' | 'bebek' | 'kelinci' | 'burung';

export interface Animal {
  id: AnimalId;
  name: string;
  syllables: string;
  soundName: string;
  soundText: string;
  audioPath: string;
  characteristic: string;
  movementPrompt: string;
  movementAction: string;
  color: string;
  badge: string;
}

export interface FeedbackState {
  type: 'idle' | 'correct' | 'incorrect' | 'hint';
  message: string;
  submessage?: string;
}
