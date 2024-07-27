import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../component/FormSection";
import ResumePreview from "../../component/ResumePreview";
import { ResumeInforContext } from "@/context/ResumeInforContext";
import Dummy from "@/data/Dummy";
import GlobalApi from "./../../../../../services/GlobalApi";

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };
  return (
    <ResumeInforContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FormSection />
        {/* Preview Section  */}
        <ResumePreview />
      </div>
    </ResumeInforContext.Provider>
  );
}

export default EditResume;
