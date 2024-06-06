import { EditorFormProps } from "@/models/props/write/EditorFormProps";
import { openNotification } from "@/components/commons/Toasts";
import { handleValidationError } from "@/utils/general/handleValidationErrors";
import { articleValidationSchema } from "@/validations/write/article-validation";

export const newArticleService = async (
  values: EditorFormProps,
  setFormErrors: (errors: { [key: string]: string }) => void,
  setErrorMsg: (msg: string) => void,
  setLoading: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>,
  action: string
) => {
  try {
    await articleValidationSchema.validate(values, {
      abortEarly: false,
    });

    setLoading((prevState) => ({
      ...prevState,
      [action]: true,
    }));
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("body", values.body);
    formData.append("excerpt", values.excerpt);
    formData.append(
      "topicsOfInterest",
      JSON.stringify(values.topicsOfInterest)
    );
    if (values.featuredImage) {
      formData.append("featuredImage", values.featuredImage);
    }
    formData.append("action", action);

    const res = await fetch("/api/write/new-article", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      openNotification("Success", data.message, "success");
    }
    return res;
  } catch (err: any) {
    handleValidationError(err, setFormErrors, setErrorMsg);
    console.error(err);
  } finally {
    setLoading((prevState) => ({
      ...prevState,
      [action]: false,
    }));
  }
};
