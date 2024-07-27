import { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInforContext } from "@/context/ResumeInforContext";
import GlobalApi from "./../../../../../services/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function Skills() {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInforContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
  }, []);

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };
  const AddNewSkill = () => {
    setSkillsList([...skillsList, { name: "", rating: 0 }]);
  };
  const RemoveSkill = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };
    GlobalApi.UpateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast.success("Details Updated");
      },
      (error) => {
        toast.error("Server Error, try again");
        console.log(error);
      }
    );
  };
  useEffect(() => {
    setLoading(true);
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
    setLoading(false);
  }, [skillsList]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your top professional key skills</p>
      <div>
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between mb-2 border rounded-lg p-3 "
          >
            <div>
              <label className="text-xs">Name</label>
              <Input
                className="w-full"
                defaultValue={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              onClick={AddNewSkill}
              variant="outline"
              className="text-primary"
            >
              + Add More Experience
            </Button>
            <Button
              onClick={RemoveSkill}
              variant="outline"
              className="text-primary"
            >
              - Remove
            </Button>
          </div>
          {/* <Button>Save</Button> */}
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Skills;
