import moment from "moment";

export const convertPayloadToFormData = (payload: any): FormData => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value instanceof Date) {
      formData.append(key, moment(value).format("MM/DD/YYYY"));
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};
