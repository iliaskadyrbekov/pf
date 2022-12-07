export const fileToDataUrl = (file: File) => {
  return new Promise<string>((resolve) => {
    const fr = new FileReader();
    fr.onload = function () {
      resolve(fr.result as string);
    };
    fr.readAsDataURL(file);
  });
};
