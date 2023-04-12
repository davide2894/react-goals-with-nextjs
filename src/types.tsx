export interface User {
  email: string;
  uid: string;
  userDocId: string;
}

export interface GoalFormData {
  show: boolean;
  goalTitle: string;
  goalScore: string;
}

export interface Goal {
  title: string;
  score: {
    max: number;
    min: number;
    actual: number;
  };
  id: string;
}

export interface FormProps {
  goalToEditId?: number;
  titleToEdit?: string;
  maxScoreToEdit?: string;
  mode?: string;
  onGoalFormSubmit?: () => void;
}
