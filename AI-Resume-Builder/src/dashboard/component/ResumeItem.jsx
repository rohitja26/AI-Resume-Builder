import { Notebook } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function ResumeCardItem({ resume }) {
  console.log(resume);
  return (
    <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
      <div
        className="p-14  bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200
        h-[280px] 
          rounded-t-lg border-t-4
        "
        style={{
          borderColor: resume?.themeColor,
        }}
      >
        {/* <Notebook /> */}
      </div>
      <h2 className="text-center my-1">{resume.title}</h2>
    </Link>
  );
}

export default ResumeCardItem;
