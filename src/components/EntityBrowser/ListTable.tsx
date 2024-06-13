import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { EntityForm } from "../Form";
import { formatValue, getAlignmentClass } from "./entityBrowser.util";
import { ActionsItem } from "./EntityBrowser";

interface ListTableProps<T> {
  items: T[];
  entityForm: EntityForm<T>;
  actions: ActionsItem<T>;
}
const ListTable = <T,>({ items, entityForm, actions }: ListTableProps<T>) => {
  return (
    <table className="min-w-full bg-white dark:bg-gray-700">
      <thead className="bg-gray-300 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
        <tr>
          {entityForm.baseSchema
            .filter((field) => field.visibleInList !== false)
            .map((field) => (
              <th
                key={field.name}
                className={`py-2 px-4 border-b ${getAlignmentClass(
                  field.type
                )}`}
                style={{ width: field.widthInList || "" }}
              >
                {field.label}
              </th>
            ))}
          <th className="py-2 px-4 border-b"></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr
            key={index}
            className={`h-12 ${
              index % 2 === 0
                ? "bg-gray-100 dark:bg-gray-800"
                : "bg-white dark:bg-gray-700"
            } hover:bg-gray-200 dark:hover:bg-gray-900`}
          >
            {entityForm.baseSchema
              .filter((field) => field.visibleInList !== false)
              .map((field) => (
                <td
                  key={field.name}
                  className={`py-4 px-4 ${getAlignmentClass(field.type)}`}
                >
                  {formatValue(
                    item[field.name as keyof T],
                    field.type,
                    field.mask
                  )}
                </td>
              ))}
            <td className="flex space-x-3 py-4 px-4 text-right">
              <FaMagnifyingGlass
                className="text-gray-400 cursor-pointer "
                onClick={() => actions.view(item)}
              />
              <FaRegEdit
                className="text-blue-400 cursor-pointer "
                onClick={() => actions.edit(item)}
              />
              <FaRegTrashAlt
                className="text-red-400 cursor-pointer"
                onClick={() => actions.delete(item)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListTable;
