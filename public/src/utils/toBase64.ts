export const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let result = reader.result as string;
      if (file.type === "image/svg+xml" && !result.includes("svg+xml")) {
        result = result.replace("data:image/svg", "data:image/svg+xml");
      }
      resolve(result);
    };
    reader.onerror = (error) => reject(error);
  });
};
