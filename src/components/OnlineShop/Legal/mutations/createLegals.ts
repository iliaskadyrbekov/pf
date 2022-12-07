import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { LegalType } from 'src/shared/enums/LegalType';

import { MultiLanguageField } from 'src/shared/interfaces';
import { ILegal } from 'src/shared/interfaces/Legal';

export interface ICreateLegalsRes {
  createLegals: ILegal[];
}

export interface ICreateLegalsVars {
  shopId?: string;
  input: Record<LegalType, MultiLanguageField[]>;
}

export const CREATE_LEGALS = gql`
  mutation CreateLegals($shopId: ObjectId!, $input: CreateLegalInput!) {
    createLegals(shopId: $shopId, input: $input) {
      type
      content {
        value
        lang
        country
      }
    }
  }
`;

export const useCreateLegals = () => {
  const [mutate, { data, loading, error }] = useMutation<ICreateLegalsRes, ICreateLegalsVars>(CREATE_LEGALS);

  return { mutate, data, loading, error };
};
