import type { Metadata } from "next";
import SectionBox from "../../../components/layout/section-box";

export const metadata: Metadata = {
    title: "Analytics",
    description: "This is the analytics page, that helps a user view stats on their page activity",
  };

const AnalyticsPage = () => {
    return(<div>
        <SectionBox>
        <h1>Analytics Page</h1>
        </SectionBox>
        
    </div>)
}

export default AnalyticsPage;