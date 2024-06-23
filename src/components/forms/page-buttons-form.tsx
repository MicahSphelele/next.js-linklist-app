"use client";

import { PageDTO } from "@/domain/models/dto/page-dto";
import SectionBox from "@/components/layout/section-box";
//import { ReactSortable } from "react-sortablejs";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faInstagramSquare,
  faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import {
  faEnvelope,
  faGripLines,
  faMobile,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast from "react-hot-toast";
import { ButtonDTO } from "@/domain/models/dto/button-dto";
import { toFirstLetterUpperCase } from "@/libs/utils";
import SubmitButton from "../buttons/submit-button";

export const allButtons: ButtonDTO[] = [
  {
    key: "email",
    label: "e-mail",
    icon: faEnvelope,
    placeholder: "test@example.com",
  },
  {
    key: "mobile",
    label: "mobile",
    icon: faMobile,
    placeholder: "+27 123 123 123",
  },
  {
    key: "instagram",
    label: "instagram",
    icon: faInstagram,
    placeholder: "https://facebook.com/profile/...",
  },
  { key: "facebook", label: "facebook", icon: faFacebook },
  { key: "discord", label: "discord", icon: faDiscord },
  { key: "tiktok", label: "tiktok", icon: faTiktok },
  { key: "youtube", label: "youtube", icon: faYoutube },
  { key: "whatsapp", label: "whatsapp", icon: faWhatsapp },
  { key: "github", label: "github", icon: faGithub },
  { key: "telegram", label: "telegram", icon: faTelegram },
];

type Props = {
  page: PageDTO;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};


const PageButtonsForm = ({ page, user }: Props) => {
  
  const [activeButtons, setActiveButtons] = useState<ButtonDTO[]>([]);

  const availableButtons = allButtons.filter((b1) => !activeButtons.find((b2) => b1.key === b2.key));

  const addButtonToProfileClick = (button: ButtonDTO) => {
    setActiveButtons((prevButton) => {
        return [...prevButton, button];
    });
 }

  return (
    <>
      <SectionBox>
        
      <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        {
          activeButtons.map((button) => {
            return (<>
              <div className="mb-4 flex items-center">

                <div className="w-36 flex h-full text-gray-700 p-2 gap-2 items-center">
                <FontAwesomeIcon icon={button.icon} />
                <span>{toFirstLetterUpperCase(button.label)}:</span>
                </div>

                <input type="text" style={{marginBottom: '0'}} name={button.key} placeholder={button.placeholder}/>
              </div>
            </>)
          })
        }
        <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
       
          {availableButtons.map((button) => {
            return (
              <>
                <button onClick={() => addButtonToProfileClick(button)} key={button.key} className="flex gap-1 p-2 items-center bg-gray-200 hover:bg-slate-300 hover:text-white">
                  <FontAwesomeIcon icon={button.icon} />
                  <span>{toFirstLetterUpperCase(button.label)}</span>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </>
            );
          })}
        </div>
        <div className="max-w-xs mx-auto mt-8">
        <SubmitButton>
          <FontAwesomeIcon icon={faSave}/>
          <span>Save</span>
        </SubmitButton>
        </div>    
      </SectionBox>
    </>
  );
};

export default PageButtonsForm;
