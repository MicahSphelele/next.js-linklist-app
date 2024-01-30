"use client";

import { PageDTO } from "@/domain/models/dto/page-dto";
import RadioTogglers from "./form-items/radio-togglers";
import { useState } from "react";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SubmitButton from "../buttons/submit-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  page: PageDTO;
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
};

const PageSettingsForm = ({ page, user }: Props) => {

  const [defaultValue, setDefaultValue] = useState("color");

  return (
    <div className="-m-4">
      <form>
        <div className="bg-gray-300 py-16 flex justify-center items-center">
          <RadioTogglers
            options={[
              { value: "color", icon: faPalette, label: "Color" },
              { value: "image", icon: faImage, label: "Image" },
            ]}
            defaultValue={defaultValue}
            onChange={(value) => setDefaultValue(value)}
          />
        </div>
        <div className="flex justify-center -mb-12">
          <Image
          className="rounded-full relative -top-8 border-4 border-white shadow shadow-black/50"
            alt="User Avatar"
            width={128}
            height={128}
            src={user?.image ?? ""}
            priority
          />
        </div>
        <div className="p-4">
          <label className="input-label" htmlFor="nameIn">Display name</label>
          <input className="outline-none" id="nameIn" name="displayName" type="text" placeholder="John Doe" defaultValue={page.displayName}/>
          <label className="input-label" htmlFor="locationIn">Location</label>
          <input className="outline-none" id="locationIn" name="location"  type="text" placeholder="Somewhere in the world" defaultValue={page.location}/>
          <label className="input-label" htmlFor="bioIn">Bio</label>
          <textarea className="outline-none" name="bio" placeholder="Your Bio goes here..." id="bioIn" defaultValue={page.bio} />
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} className="w-4 h-4"/>
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default PageSettingsForm;
