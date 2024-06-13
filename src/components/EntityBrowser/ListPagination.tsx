interface ListPaginationProps {
  goToPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const ListPagination = ({
  goToPage,
  currentPage,
  totalPages,
}: ListPaginationProps) => {
  return (
    <div className="flex items-center justify-center mt-4 align-middle space-x-2">
      <button
        className={`bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-300 py-2 px-4 rounded ${
          currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-400"
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
          className="p-0 border-b text-center w-16 bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
          value={currentPage}
          onChange={(e) => {
            const pageNumber = parseInt(e.target.value, 10);
            goToPage(pageNumber);
          }}
        />
        {` de ${totalPages}`}
      </span>

      <button
        className={`bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-300 py-2 px-4 rounded ${
          currentPage === totalPages
            ? "cursor-not-allowed"
            : "hover:bg-gray-400"
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
