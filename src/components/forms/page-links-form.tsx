"use client";

import { PageDTO } from "@/domain/models/dto/page-dto";
import SectionBox from "@/components/layout/section-box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/submit-button";
import { useState } from "react";

type Props = {
  page: PageDTO;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};




const PageLinksForm = ({ page, user }: Props) => {

  const [links, setLinks] = useState(page.links || []);
  
  const save = (formData: FormData) => {};

  const addNewLinkClick = () => {

    setLinks(preLink => {
      return [...preLink, { title: "", subtitle: "", icon: "", url: "" }];
    })
  };


  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <button
        onClick={addNewLinkClick}
          type="button"
          className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="bg-blue-500 text-white p-1 rounded-full aspect-square"
          />
          <span>Add new</span>
        </button>
        <div>
        {
          links.map((link) => (
            <div key={link.title}>

            </div>
          ))
        }
        </div>
        <div className="border-t pt-4 mt-4">
          <SubmitButton className="max-w-[200px] mx-auto">
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageLinksForm;
