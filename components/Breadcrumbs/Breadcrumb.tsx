import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BreadcrumbProps {
  pageName: string;
  handleGoBack?: () => void;
}

const Breadcrumb = ({ pageName, handleGoBack }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-[26px] flex  items-center gap-x-4 font-bold leading-[30px] text-dark dark:text-white">
        {handleGoBack && (
          <ArrowLeft
            className="cursor-pointer "
            name="Back"
            onClick={handleGoBack}
          />
        )}
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Form /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
