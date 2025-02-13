import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="container mx-auto py-8 flex flex-col items-center gap-y-5">
      <h3 className="text-3xl font-bold">این صفحه وجود ندارد</h3>
      <Link
        to="/"
        className="bg-secondary text-primary text-xl font-bold p-3 max-w-[200px] rounded-md"
      >
        رفتن به صفحه اصلی
      </Link>
    </div>
  );
};

export default PageNotFound;
