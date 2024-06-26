"use client";

import { PageDTO } from "@/domain/models/dto/page-dto";
import SectionBox from "@/components/layout/section-box";
import { ReactSortable } from "react-sortablejs";
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
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ButtonDTO } from "@/domain/models/dto/button-dto";
import { toFirstLetterUpperCase } from "@/libs/utils";
import SubmitButton from "../buttons/submit-button";
import { actionSavePageButtons } from "@/actions/actions-for-page";

const allButtons: ButtonDTO[] = [
  {
    id: 1,
    key: "email",
    label: "e-mail",
    icon: faEnvelope,
    placeholder: "test@example.com",
  },
  {
    id: 2,
    key: "mobile",
    label: "mobile",
    icon: faMobile,
    placeholder: "+27 123 123 123",
  },
  {
    id: 3,
    key: "instagram",
    label: "instagram",
    icon: faInstagram,
    placeholder: "https://www.instagram.com/profile/...",
  },
  {
    id: 4,
    key: "facebook",
    label: "facebook",
    icon: faFacebook,
    placeholder: "https://facebook.com/profile/... ",
  },
  {
    id: 5,
    key: "discord",
    label: "discord",
    icon: faDiscord,
    placeholder: "https://discord.com/profile/...",
  },
  {
    id: 6,
    key: "tiktok",
    label: "tiktok",
    icon: faTiktok,
    placeholder: "https://www.tiktok.com/@username?...",
  },
  {
    id: 7,
    key: "youtube",
    label: "youtube",
    icon: faYoutube,
    placeholder: "https://www.youtube.com/@channel",
  },
  {
    id: 8,
    key: "whatsapp",
    label: "whatsapp",
    icon: faWhatsapp,
    placeholder: "+27 123 123 123",
  },
  {
    id: 9,
    key: "github",
    label: "github",
    icon: faGithub,
    placeholder: "https://github.com/username",
  },
  { 
    id: 10,
    key: "telegram",
    label: "telegram",
    icon: faTelegram, 
    placeholder: "https://t.me/+RXdMWg9G24tmNzB7" },
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

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const pageSavedButtonsKeys = Object.keys(page.buttons[0]);

  const pageSavedButtonsInfo = pageSavedButtonsKeys.map(k => allButtons.find(b => b.key === k)) as ButtonDTO[];

  const [activeButtons, setActiveButtons] = useState<ButtonDTO[]>(pageSavedButtonsInfo);

  const availableButtons = allButtons.filter(b1 => !activeButtons.find(b2 => b1.key === b2.key));

  const addButtonToProfileClick = (button: ButtonDTO) => {
    setActiveButtons((prevButton) => {
      return [...prevButton, button];
    });
  };

  const removeButtonFromProfileClick = ({ key: keyToRemove }: ButtonDTO) => {
    setActiveButtons((prevButton) => {
      return prevButton.filter((b) => b.key !== keyToRemove)
  })
};

  const saveButtons = async (formData: FormData) => {

    await actionSavePageButtons(formData);

    toast.success("Button settings saved!");
  }

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SectionBox>
        <form action={saveButtons}>
          <h2 className="text-2xl font-bold mb-4">Buttons</h2>
          <ReactSortable list={activeButtons} setList={setActiveButtons}>

          { activeButtons.map((button) => {
            return (
              <>
                <div className="mb-4 flex items-center" key={button.key}>
                  <div className="w-48 flex h-full text-gray-700 p-2 gap-2 items-center">
                    <FontAwesomeIcon icon={faGripLines} className="cursor-pointer text-gray-400" />
                    <FontAwesomeIcon icon={button.icon} />
                    <span>{toFirstLetterUpperCase(button.label)}:</span>
                  </div>
                  <input
                    type="text"
                    style={{ marginBottom: "0" }}
                    name={button.key}
                    defaultValue={page.buttons[0][button.key]}
                    placeholder={button.placeholder}
                  />
                  <button onClick={() => removeButtonFromProfileClick(button) } type="button" className="p-2 bg-gray-300 py-2 px-4 cursor-pointer text-red-500">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </>
            );
          })}
          </ReactSortable>

          <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
            {availableButtons.map((button) => {
              return (
                  <button
                    onClick={() => addButtonToProfileClick(button)}
                    key={button.key}
                    className="flex gap-1 p-2 items-center bg-gray-200 hover:bg-slate-300 hover:text-blue-500"
                  >
                    <FontAwesomeIcon icon={button.icon} />
                    <span>{toFirstLetterUpperCase(button.label)}</span>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
              );
            })}
          </div>
          <div className="max-w-[200px] mx-auto mt-8">
            <SubmitButton>
              <FontAwesomeIcon icon={faSave} />
              <span>Save</span>
            </SubmitButton>
          </div>
        </form>
      </SectionBox>
    </>
  );
};

export default PageButtonsForm;
