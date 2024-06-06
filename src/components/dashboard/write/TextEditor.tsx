import { useState, useRef } from "react";
import { Input, Checkbox } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { topicsOfInterestList } from "@/data/topicsOfInterestList";
import { formats, modules } from "../../../utils/text-editor/customization";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadProps } from "antd/lib/upload";
import { Button } from "@/components/commons/Buttons";
import { EditorFormProps } from "@/models/props/write/EditorFormProps";
import { newArticleService } from "@/services/write/new-article-service";

const { Dragger } = Upload;
const { TextArea } = Input;

export const TextEditor = () => {
  const initialRef = useRef(null);
  const [values, setFormValues] = useState<EditorFormProps>({
    title: "",
    body: "",
    featuredImage: null,
    excerpt: "",
    topicsOfInterest: [],
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState<{
    [key: string]: boolean;
  }>({
    draft: false,
    publish: false,
  });

  const props: UploadProps = {
    name: "file",
    accept: "image/*",
    beforeUpload: (file) => {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Image must be smaller than 5MB!");
      }
      return false;
    },
    onChange(info) {
      const fileList = info.fileList.slice(-1);
      const file = fileList[0]?.originFileObj || null;
      setFormValues({ ...values, featuredImage: file });
      if (file) {
        message.success(`${file.name} file selected successfully.`);
      }
    },
    onDrop(e) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.size / 1024 / 1024 < 5) {
        setFormValues({ ...values, featuredImage: droppedFile });
        message.success(`${droppedFile.name} file selected successfully.`);
      } else {
        message.error("Image must be smaller than 5MB!");
      }
    },
  };

  const handleCheckboxChange = (topic: string, checked: boolean) => {
    if (checked) {
      setFormValues({
        ...values,
        topicsOfInterest: [...values.topicsOfInterest, topic],
      });
    } else {
      setFormValues({
        ...values,
        topicsOfInterest: values.topicsOfInterest.filter((t) => t !== topic),
      });
    }
  };

  const handleCreateArticle = async (
    // e: React.FormEvent<HTMLFormElement>,
    action: string
  ) => {
    // e.preventDefault();
    await newArticleService(
      values,
      setFormErrors,
      setErrorMsg,
      setLoading,
      action
    );
  };

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row justify-between gap-x-10 gap-y-4 items-start my-10">
        <div className="lg:w-[60%] flex flex-col gap-y-6">
          <div className="">
            <h1 className="text-base mb-2">Title</h1>
            <Input
              name="title"
              placeholder="Enter title"
              value={values.title}
              onChange={(e) =>
                setFormValues({ ...values, title: e.target.value })
              }
            />
            {formErrors.title && (
              <p className="text-red-500">{formErrors.title}</p>
            )}
          </div>
          <div className="border-b">
            <h1 className="text-base mb-2">Body</h1>
            <ReactQuill
              theme="snow"
              formats={formats}
              modules={modules}
              ref={initialRef}
              value={values.body}
              onChange={(e) => setFormValues({ ...values, body: e })}
              className="h-[15rem] overflow-y-auto"
            />
            {formErrors.body && (
              <p className="text-red-500">{formErrors.body}</p>
            )}
          </div>
          <div>
            <h1 className="text-base mb-2">Featured image</h1>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                You can only upload one image not more than 5MB in size
              </p>
            </Dragger>
            {formErrors.featuredImage && (
              <p className="text-red-500">{formErrors.featuredImage}</p>
            )}
          </div>
        </div>
        <div className="lg:w-[40%] flex flex-col gap-y-6">
          <div>
            <h1 className="text-base mb-2">Excerpt</h1>
            <TextArea
              rows={4}
              placeholder="Enter excerpt"
              name="excerpt"
              value={values.excerpt}
              onChange={(e) =>
                setFormValues({ ...values, excerpt: e.target.value })
              }
            />
            {formErrors.excerpt && (
              <p className="text-red-500">{formErrors.excerpt}</p>
            )}
          </div>
          <div>
            <h2 className="mb-4 text-base">
              Select topics for your write-up (at least 3)
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
              {topicsOfInterestList.map((topic) => (
                <Checkbox
                  key={topic}
                  onChange={(e) =>
                    handleCheckboxChange(topic, e.target.checked)
                  }
                  checked={values.topicsOfInterest.includes(topic)}>
                  {topic}
                </Checkbox>
              ))}
            </div>
            {formErrors.topicsOfInterest && (
              <p className="text-red-500">{formErrors.topicsOfInterest}</p>
            )}
          </div>
        </div>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      </div>
      <div className="flex flex-col lg:flex-row gap-8 mb-20">
        <Button
          variant="outlined"
          buttonText="Save Draft"
          className="mt-4 lg:mt-20 lg:w-[50%] m-auto"
          onClick={() => handleCreateArticle("draft")}
          loading={loading["draft"]}
        />
        <Button
          variant="primary"
          buttonText="Publish"
          className="lg:mt-20 lg:w-[50%] m-auto"
          onClick={() => handleCreateArticle("publish")}
          loading={loading["publish"]}
        />
      </div>
    </>
  );
};
