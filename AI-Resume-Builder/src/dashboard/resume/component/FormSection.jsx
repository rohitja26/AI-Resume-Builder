import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <Button variant="outline">
          <LayoutGrid /> Theme
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 0 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            disabled={!enableNext}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Personal Detail  */}
      {activeFormIndex === 1 ? (
        <PersonalDetail enableNext={(v) => setEnableNext(v)} />
      ) : null}
      {/* Summery */}
      {/* Experience */}
      {/* Education */}
      {/* Skills */}
    </div>
  );
}

export default FormSection;
