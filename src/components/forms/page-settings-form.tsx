"use client";

import { PageDTO } from "@/domain/models/dto/page-dto";
import { ImageUploadResponse } from "@/domain/models/dto/upload-response";
import RadioTogglers from "./form-items/radio-togglers";
import { ChangeEvent, useState } from "react";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faCloudArrowUp,
  faPalette,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SubmitButton from "../buttons/submit-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { actionSavePageSettings } from "@/actions/actions-for-page";
import { MessageResponse } from "@/domain/models/message-response";
import { MessageType } from "@/domain/enums/enums";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import SectionBox from "../layout/section-box";

type Props = {
  page: PageDTO;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

const PageSettingsForm = ({ page, user }: Props) => {

  const getAvater = (): string =>  {
    return user?.image ?? ""
  }

  const router = useRouter();
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImageUrl, setBgImageUrl] = useState(page.bgImageUrl);
  const [bgImageKey, setBgImageKey] = useState(page.bgImageKey);
  const [avater, setAvater] = useState(getAvater());
  const [avaterKey, setAvaterKey] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const result = (await actionSavePageSettings(formData)) as MessageResponse;

    if (result.type === MessageType.Success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  const onChangeBgType = (value: string) => setBgType(value);

  const upload = async (
    e: ChangeEvent<HTMLInputElement>,
    key: string,
    callback: (response: ImageUploadResponse) => void
  ) => {
    const target = e.target;
    const file: File = (target.files as FileList)[0];

    const fileName = user?.email ?? "";
    const data = new FormData();
    data.append("file", file);
    data.append("email", `${fileName}-${key}`);

    await toast.promise(axios.post("/api/upload", data), {
      loading: "Uploading...",
      success: (res) => {
        const result = res.data as ImageUploadResponse;
        callback(result);
        return result.message.message;
      },
      error: "Uploading error",
    });
  };

  const onChangeCoverImage = async (e: ChangeEvent<HTMLInputElement>) => {
    await upload(e, "background", (result) => {
      if (result.message.type == MessageType.Success) {
        setBgImageUrl(result.imageInfo?.imageLink!);
        setBgImageKey(result.imageInfo?.fileName!);
      }
    });
  };

  const onChangeAvaterImage = async (e: ChangeEvent<HTMLInputElement>) => {
    await upload(e, "avater", (result) => {
      if (result.message.type == MessageType.Success) {
        setAvater(result.imageInfo?.imageLink!);
        setAvaterKey(result.imageInfo?.fileName!);
      }
    });
  };

  return (
    <div>
      <SectionBox>
      <form action={handleSubmit}>
        <div
          className="py-4 min-h-[300px] flex justify-center items-center bg-cover bg-center"
          style={
            bgType === "color"
              ? { backgroundColor: bgColor }
              : { backgroundImage: `url(${bgImageUrl})` }
          }
        >
          <div>
            <RadioTogglers
              options={[
                { value: "color", icon: faPalette, label: "Color" },
                { value: "image", icon: faImage, label: "Image" },
              ]}
              defaultValue={bgType ?? "color"}
              onChange={onChangeBgType}
            />

            {bgType === "color" && (
              <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                <div className="flex gap-2 justify-center">
                  <span>Background color:</span>
                  <input
                    type="color"
                    name="bgColor"
                    defaultValue={page.bgColor}
                    onChange={(e) => {
                      setBgColor(e.target.value);
                    }}
                  />
                </div>
              </div>
            )}
            {bgType === "image" && (
              <div className="flex gap-2 justify-center">
                <label className="bg-white shadow px-4 py-2 mt-2 hover:text-blue-500 cursor-pointer">
                  <input type="hidden" name="bgImageUrl" value={bgImageUrl} />
                  <input type="hidden" name="bgImageKey" value={bgImageKey} />
                  <input
                    className="hidden"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={onChangeCoverImage}
                  />
                  <div className="flex gap-2 items-center hover:text-blue-500">
                    <FontAwesomeIcon
                      icon={faCloudArrowUp}
                      className="text-gray-700 hover:text-blue-500"
                    />
                    <span>Change Image</span>
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center -mb-12">
          <div className="relative -top-8 w-[128px] h-[128px]">
            <div className="overflow-hidden rounded-full h-full border-4 border-white shadow shadow-black/50">
              <Image
                className="w-full h-full object-cover"
                alt="User Avatar"
                src={avater}
                width={128}
                height={128}
                priority
              />
            </div>
            <label
              htmlFor="avaterInput"
              className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                size={"xl"}
                className="text-gray-700 hover:text-blue-500"
              />
              <input type="hidden" name="avater" value={avater} />
              <input type="hidden" name="avaterKey" value={avaterKey} />
              <input
                className="hidden"
                id="avaterInput"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={onChangeAvaterImage}
              />
            </label>
          </div>
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
      </SectionBox>
    </div>
  );
};

export default PageSettingsForm;
