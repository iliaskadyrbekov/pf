import React from 'react';
import { DeltaStatic, Sources } from 'quill';
import dynamic from 'next/dynamic';

import { EditorBlockLayout } from '../EditorBlock';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { MultiLanguageField } from 'src/shared/interfaces';
import { LangSwitcher } from '@components/common/LangSwitcher';
import { getValueByLanguage } from 'src/helpers';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface IEditorBlockProps {
  value: MultiLanguageField[];
  title: string;
  description: string;
  onChange(field: MultiLanguageField[]): void;
}

const EditorBlock = ({ value, title, description, onChange }: IEditorBlockProps) => {
  const { lang } = React.useContext(FormLanguageContext);

  const handleChange = (val: string, _: DeltaStatic, source: Sources) => {
    if (source === 'api') {
      return;
    }

    if (!value.some((v) => lang.languageId === v.lang && lang.countryId === v.country)) {
      onChange([...value, { value: val, lang: lang.languageId, country: lang.countryId }]);
    } else {
      onChange(
        value.map((v) => (lang.languageId === v.lang && lang.countryId === v.country ? { ...v, value: val } : v)),
      );
    }
  };

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['link'],
    ['clean'],
  ];

  return (
    <EditorBlockLayout
      langSwitcher={<LangSwitcher />}
      title={title}
      description={description}
      editor={
        <ReactQuill
          modules={{ toolbar: toolbarOptions }}
          theme="snow"
          value={getValueByLanguage(value, lang, '')}
          onChange={handleChange}
        />
      }
    />
  );
};

export default EditorBlock;
