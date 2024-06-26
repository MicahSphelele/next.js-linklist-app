import { PageDTO } from "@/domain/models/dto/page-dto";
import SectionBox from "@/components/layout/section-box";

type Props = {
  page: PageDTO;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

const PageLinksForm = ({ page, user }: Props) => {
  return (
    <SectionBox>
      <div></div>
    </SectionBox>
  );
};

export default PageLinksForm;
