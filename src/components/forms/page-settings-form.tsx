"use client";

import { PageDTO } from "@/domain/models/dto/page-dto";

type PageSettingsFormProps = {
  page: PageDTO;
};

const PageSettingsForm = ({ page }: PageSettingsFormProps) => {
  return (
    <div className="-m-4">
      <form>
        <div className="bg-gray-300 h-32">
          <label>
            <input type="radio" name="bgType" value="color" />
            <span>Color</span>
          </label>
          <label className="ml-4">
            <input type="radio" name="bgType" value="image" />
            <span>Image</span>
          </label>
        </div>
        <div>avater</div>
      </form>
    </div>
  );
};

export default PageSettingsForm;
