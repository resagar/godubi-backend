export class CreateTeamDto {
  invitedLink: string;
  businessName: string;
  logo: string;
  description: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
