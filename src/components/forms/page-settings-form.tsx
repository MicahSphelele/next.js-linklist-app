"use client";

import { PageDTO } from "@/domain/models/dto/page-dto";
import RadioTogglers from "./form-items/radio-togglers";
import { useState } from "react";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SubmitButton from "../buttons/submit-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { actionSavePageSettings } from "@/actions/actions-for-page";
import { MessageResponse } from "@/domain/models/message-response";
import { MessageType } from "@/domain/enums/enums";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  page: PageDTO;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

const PageSettingsForm = ({ page, user }: Props) => {

  const [defaultValue, setDefaultValue] = useState("color");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const result = (await actionSavePageSettings(formData)) as MessageResponse;

    if (result.type === MessageType.Success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="-m-4">
      <form action={handleSubmit}>
        <div className="py-16 flex justify-center items-center" style={{backgroundColor: page.bgColor}}>
          <div>
            <RadioTogglers
              options={[
                { value: "color", icon: faPalette, label: "Color" },
                { value: "image", icon: faImage, label: "Image" },
              ]}
              defaultValue={page.bgType ?? "color"}
            />
            <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
            {page.bgType === "color" && (
              <div className="flex gap-2 justify-center">
                <span>Background color:</span>
                <input type="color" name="bgColor" defaultValue={page.bgColor} />
              </div>
            )}
            </div>

          </div>
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
          <label className="input-label" htmlFor="nameIn">
            Display name
          </label>
          <input
            className="outline-none"
            id="nameIn"
            name="displayName"
            type="text"
            placeholder="John Doe"
            defaultValue={page.displayName}
          />
          <label className="input-label" htmlFor="locationIn">
            Location
          </label>
          <input
            className="outline-none"
            id="locationIn"
            name="location"
            type="text"
            placeholder="Somewhere in the world"
            defaultValue={page.location}
          />
          <label className="input-label" htmlFor="bioIn">
            Bio
          </label>
          <textarea
            className="outline-none"
            name="bio"
            placeholder="Your Bio goes here..."
            id="bioIn"
            defaultValue={page.bio}
          />
          <div className="max-w-[200px] mx-auto">
            <SubmitButton>
              <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
              <span>Save</span>
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PageSettingsForm;
