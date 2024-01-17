import ProposalForm from "@/components/forms/proposalForm";
import UploadForm from "@/components/forms/uploadForm";
import React from "react";

export default function page() {
  return (
    <div className="mt-32 xl:mt-10 lg-mt-10 mb-5 mx-auto space-y-10">
      <ProposalForm/>
      <UploadForm/>
    </div>
  );
}
