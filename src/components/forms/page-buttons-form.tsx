'use client';

import { PageDTO } from "@/domain/models/dto/page-dto";

type Props = {
    page: PageDTO;
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  };
  
  const PageButtonsForm = ({ page, user }: Props) => {
    return (<></>);
  }

  export default PageButtonsForm;