import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Analytics",
    description: "This is the analytics page, that helps a user view stats on their page activity",
  };

const AnalyticsPage = () => {
    return(<div>
        <h1>Analytics Page</h1>
    </div>)
}

export default AnalyticsPage;