export interface AuthFormData {
  email: string;
  password: string;
}

export interface AdminAuthContextData {
  auth(payload: AuthFormData): Promise<void>;
  isAuthed: boolean;
}
