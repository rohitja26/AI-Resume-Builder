import { useEffect, useState } from "react";
import AddResume from "./component/AddResume";
import GlobalApi from "./../../services/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItem from "./component/ResumeItem";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  useEffect(() => {
    user && GetResumeList();
  }, [user]);

  /**  Used to  Get user Resuem list*   */
  const GetResumeList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (resp) => {
        setResumeList(resp.data.data);
        console.log(resp.data.data);
      }
    );
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating you AI Resume to you next job role</p>
      <div
        className="grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-5 gap-5
      mt-10"
      >
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCardItem
              resume={resume}
              key={index}
              refereshData={GetResumeList}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
