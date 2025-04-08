import { GetRequest, PostRequest } from "@/lib/axios/axios";

export const exportCSV = async (role: string, id?: string) => {
  let endpoint = `/api/v1/songs/csv/export/admin/`;

  if (role === "artist_manager") {
    endpoint = `/api/v1/songs/csv/export/manager/${id}/`;
  } else if (role === "artist") {
    endpoint = `/api/v1/songs/csv/export/artist/${id}/`;
  }

  try {
    const response = await GetRequest(endpoint, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const a = document.createElement("a");
    a.href = url;
    a.download = "songs.csv";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error("Error downloading CSV:", error);
    return false;
  }
};

export const importCSV = async (url: string, formData: FormData) => {
  try {
    console.log(formData);
    const response = await PostRequest(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
};
