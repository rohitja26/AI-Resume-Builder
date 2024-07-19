import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInforContext } from "@/context/ResumeInforContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../services/GlobalApi";
import Dummy from "@/data/Dummy";
import { LoaderCircle } from "lucide-react";

function PersonalDetail({ enableNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInforContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    enableNext(false);

    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({ ...resumeInfo, [name]: value });
  };
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData,
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
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              defaultValue={resumeInfo?.firstName}
              name="firstName"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              defaultValue={resumeInfo?.lastName}
              name="lastName"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              defaultValue={resumeInfo?.jobTitle}
              name="jobTitle"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              defaultValue={resumeInfo?.address}
              name="address"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              defaultValue={resumeInfo?.phone}
              name="phone"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              defaultValue={resumeInfo?.email}
              name="email"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
export default PersonalDetail;
