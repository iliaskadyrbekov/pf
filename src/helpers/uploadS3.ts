interface IField {
  name: string;
  value: string;
}

export const uploadS3 = (url: string, fields: IField[], file: File) => {
  const formData = getFormData(fields, file);

  return fetch(url, {
    method: 'POST',
    body: formData,
  }).then((res) => {
    if (res.status === 400) {
      throw new Error('error');
    }
  });
};

const getFormData = (fields: { name: string; value: string }[], file: File) => {
  const formData = new FormData();

  fields.forEach(({ name, value }) => {
    formData.append(name, value);
  });

  formData.append('file', file);

  return formData;
};
