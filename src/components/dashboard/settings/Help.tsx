import { Help } from "@/models/props/settings/Help";
import { useState } from "react";
import { Input } from "antd";
import { Button } from "@/components/commons/Buttons";
import { helpAndFeedbackService } from "@/services/settings/help-service";
import { useRouter } from "next/navigation";

const { TextArea } = Input;

export const HelpAndFeedBack = () => {
  const [values, setValues] = useState<Help>({
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();
  const handleSubmitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await helpAndFeedbackService(values, router, setLoading, setErrMsg);
  };
  return (
    <>
      <div className="text-sm my-6">
        <h2 className="font-bold text-xl md:text-2xl text-[#1E5ED4] mb-2">
          Feedback and Help
        </h2>
        <p className="text-[#586179] mb-6">
          Report an issue, raise a suggestion
        </p>
        <form
          className="lg:w-[70%] flex flex-col gap-y-6"
          onSubmit={handleSubmitFeedback}>
          <div>
            <h2 className="font-bold">Subject</h2>
            <Input
              name="subject"
              value={values.subject}
              placeholder="What do you want to report/suggest?"
              onChange={(e) =>
                setValues({ ...values, subject: e.target.value })
              }></Input>
          </div>
          <div>
            <h2 className="font-bold">Message</h2>
            <TextArea
              placeholder="start typing"
              rows={6}
              name="message"
              value={values.message}
              maxLength={500}
              onChange={(e) =>
                setValues({ ...values, message: e.target.value })
              }></TextArea>
          </div>
          <Button
            buttonText="Submit"
            variant="primary"
            loading={loading}></Button>
        </form>
        {errMsg && <p className="text-red-500 text-left">{errMsg}</p>}
      </div>
    </>
  );
};
