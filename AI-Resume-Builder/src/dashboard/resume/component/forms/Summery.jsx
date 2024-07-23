import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInforContext } from "@/context/ResumeInforContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../services/GlobalApi";
import { LoaderCircle } from "lucide-react";

function Summery({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInforContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      summery: summery,
    };
    GlobalApi.UpateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        enableNext(true);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        console.log(params?.resumeId);
      }
    );
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summery</h2>
      <p>Add Summery for your job title</p>
      <form className="mt-7" onSubmit={onSave}>
        <div className="flex justify-between items-end">
          <label>Add summery</label>
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary"
          >
            Generate from AI
          </Button>
        </div>
        <Textarea
          className="mt-5"
          required
          onChange={(e) => setSummery(e.target.value)}
        />
        <div className=" mt-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Summery;
