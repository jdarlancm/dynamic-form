import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { EntityForm } from "../Form";
import { formatValue, getAlignmentClass } from "./entityBrowser.util";
import { ActionsItem } from "./EntityBrowser.types";
import { colors } from "./colors";

interface ListTableProps<T> {
  items: T[];
  entityForm: EntityForm<T>;
  actions: ActionsItem<T>;
}
const ListTable = <T,>({ items, entityForm, actions }: ListTableProps<T>) => {
  return (
    <table className="min-w-full">
      <thead
        className={`${colors.list.header.light} dark:${colors.list.header.dark} ${colors.text.light} dark:${colors.text.dark}`}
      >
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
                ? `${colors.list.oddRow.light} dark:${colors.list.oddRow.dark}`
                : `${colors.list.evenRow.light} dark:${colors.list.evenRow.dark}`
            } hover:${colors.background.hover.light} dark:hover:${
              colors.background.hover.dark
            }`}
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
                className={`${colors.actions.view.text} cursor-pointer"`}
                onClick={() => actions.view(item)}
              />
              <FaRegEdit
                className={`${colors.actions.update.text} cursor-pointer"`}
                onClick={() => actions.edit(item)}
              />
              <FaRegTrashAlt
                className={`${colors.actions.delete.text} cursor-pointer`}
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
