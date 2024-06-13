import { EntityForm } from "../Form";
import { ActionsItem } from "./EntityBrowser.types";
import ListCard from "./ListCard";
import ListPagination from "./ListPagination";
import ListTable from "./ListTable";

interface ListProps<T> {
  items: T[];
  entityForm: EntityForm<T>;
  actions: ActionsItem<T>;
  goToPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const List = <T,>({
  items,
  entityForm,
  actions,
  goToPage,
  currentPage,
  totalPages,
}: ListProps<T>) => {
  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <ListTable entityForm={entityForm} items={items} actions={actions} />
      </div>

      <div className="md:hidden">
        <ListCard entityForm={entityForm} items={items} actions={actions} />
      </div>

      <ListPagination
        goToPage={goToPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default List;
