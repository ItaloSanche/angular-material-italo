export type Sex = 'Masculino' | 'Femenino';

export interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  sex: Sex;
  photoUrl?: string;
  healthStatus?: string;
  allergies?: string;
  medicalHistory?: string;
  medicalNotes?: string;
}

/** Entidad de dominio independiente de Angular y de la persistencia. */
export class User implements UserData {
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly sex: Sex;
  readonly photoUrl: string;
  readonly healthStatus: string;
  readonly allergies: string;
  readonly medicalHistory: string;
  readonly medicalNotes: string;

  constructor(
    readonly id: string,
    data: UserData,
  ) {
    this.username = data.username.trim();
    this.firstName = data.firstName.trim();
    this.lastName = data.lastName.trim();
    this.sex = data.sex;
    this.photoUrl = data.photoUrl ?? '';
    this.healthStatus = data.healthStatus?.trim() ?? '';
    this.allergies = data.allergies?.trim() ?? '';
    this.medicalHistory = data.medicalHistory?.trim() ?? '';
    this.medicalNotes = data.medicalNotes?.trim() ?? '';
    if (
      this.photoUrl &&
      !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(this.photoUrl)
    ) {
      throw new Error('La foto debe ser una imagen JPG, PNG o WebP.');
    }
    if (
      [this.healthStatus, this.allergies, this.medicalHistory, this.medicalNotes].some(
        (value) => value.length > 2000,
      )
    ) {
      throw new Error('Cada campo de salud admite hasta 2000 caracteres.');
    }
    if (!id || !this.username || !this.firstName || !this.lastName) {
      throw new Error('Completa todos los campos del usuario.');
    }
    if (!['Masculino', 'Femenino'].includes(this.sex)) {
      throw new Error('Selecciona un sexo válido.');
    }
  }
}
