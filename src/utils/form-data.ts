import moment from "moment";

export const convertPayloadToFormData = (
  payload: any,
  parentKey = ""
): FormData => {
  const formData = new FormData();

  const appendFormData = (key: string, value: any) => {
    if (value instanceof Date) {
      formData.append(key, moment(value).format("MM/DD/YYYY"));
    } else if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof File)
    ) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        appendFormData(`${key}[${nestedKey}]`, nestedValue);
      });
    } else {
      formData.append(key, value);
    }
  };

  Object.entries(payload).forEach(([key, value]) => {
    appendFormData(parentKey ? `${parentKey}[${key}]` : key, value);
  });

  return formData;
};
