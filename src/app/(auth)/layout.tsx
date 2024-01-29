import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication"
};

const AuthenticationLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <>
        {children}
        </>
    );
  };
  
  export default AuthenticationLayout;