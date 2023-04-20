export interface GoalFormData {
  show: boolean;
  goalTitle: string;
  goalScore: string;
}

export interface GoalType {
  title: string;
  score: {
    max: number;
    min: number;
    actual: number;
  };
  id: string | number;
  userIdRef: string | null;
  timestamp: number;
}

export interface FormProps {
  goalToEditId?: number;
  titleToEdit?: string;
  maxScoreToEdit?: string;
  mode?: string;
  onGoalFormSubmit?: any;
}

export type UserDocId = string | undefined;
