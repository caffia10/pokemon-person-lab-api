export interface Professor {
  id: string;
  name: string;
  lastName: string;
  laboratoryDesigned: string;
}

export interface CreateProfessorDto {
  name: string;
  lastName: string;
  laboratoryDesigned: string;
}
