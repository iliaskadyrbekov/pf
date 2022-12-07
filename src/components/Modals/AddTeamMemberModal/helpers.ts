import { IAddMember } from './AddTeamMemberModal';

export function handleValidate(values: { email: string }): asserts values is IAddMember {
  const errors: { email?: string[] } = {};

  if (!values.email) {
    errors.email = ['Enter email'];
  }

  if (Object.keys(errors).length) {
    throw errors;
  }
}
