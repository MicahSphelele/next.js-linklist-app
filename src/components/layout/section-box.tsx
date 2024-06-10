
const SectionBox = ({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <div className="bg-white m-8 p-4 shadow">
        {children}
      </div>
    );
  }

  export default SectionBox;