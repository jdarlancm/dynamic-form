import { colors } from "./colors";

interface ListPaginationProps {
  goToPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const paginationColors = `${colors.background.light} ${colors.text.light} dark:${colors.background.dark} dark:${colors.text.dark}`;
const btnGoToStyle = `${paginationColors} py-2 px-4 rounded`;

const ListPagination = ({
  goToPage,
  currentPage,
  totalPages,
}: ListPaginationProps) => {
  return (
    <div className="flex items-center justify-center mt-4 align-middle space-x-2">
      <button
        className={`${btnGoToStyle} ${
          currentPage === 1
            ? "cursor-not-allowed"
            : `hover:${colors.background.hover.light} dark:hover:${colors.background.hover.dark}`
        }`}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      <span>
        Página&nbsp;
        <input
          type="number"
          min="1"
          max={totalPages}
          className={`p-0 border-b ${colors.list.border.light} dark:${colors.list.border.dark} text-center w-16 ${paginationColors}`}
          value={currentPage}
          onChange={(e) => {
            const pageNumber = parseInt(e.target.value, 10);
            goToPage(pageNumber);
          }}
        />
        {` de ${totalPages}`}
      </span>

      <button
        className={`${btnGoToStyle} ${
          currentPage === totalPages
            ? "cursor-not-allowed"
            : `hover:${colors.background.hover.light} dark:hover:${colors.background.hover.dark}`
        }`}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default ListPagination;
