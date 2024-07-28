import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInforContext } from "@/context/ResumeInforContext";
import ResumePreview from "@/dashboard/resume/component/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../services/GlobalApi";
import { RWebShare } from "react-web-share";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  const handleDownload = () => {
    window.print();
  };
  return (
    <ResumeInforContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36 ">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate Resume is ready
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download the resume or you can share unique
            resuem url with your friends and family
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={() => handleDownload()}>Download</Button>

            <RWebShare
              data={{
                text: "Hello Everyone this is my resume please open url to see",
                url:
                  import.meta.env.VITE_BASE_URL +
                  "my-resume/" +
                  resumeId +
                  "/view",
                title:
                  resumeInfo?.firstName + " " + resumeInfo?.lastName + "resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share 🔗</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div className="my-10 mx-10 md:mx-20 lg:mx-36 ">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInforContext.Provider>
  );
}

export default ViewResume;
