import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { EntityForm, FormField } from "../Form";
import { formatValue } from "./entityBrowser.util";
import { ActionsItem } from "./EntityBrowser.types";

interface ListCardProps<T> {
  items: T[];
  entityForm: EntityForm<T>;
  actions: ActionsItem<T>;
}

const ListCard = <T,>({ items, entityForm, actions }: ListCardProps<T>) => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(
    null
  );

  const toggleExpandCard = (index: number) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };

  const qtdFieldsShowed = 2;

  const fieldVisible = entityForm.baseSchema.filter(
    (field) => field.visibleInList !== false
  );

  const renderField = (item: T, field: FormField) => {
    return (
      <div key={field.name} className="mb-2">
        <strong>{field.label}: </strong>
        {formatValue(item[field.name as keyof T], field.type, field.mask)}
      </div>
    );
  };

  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className={`p-4 border-b text-sm md:text-md border-gray-800 dark:border-gray-200 
            text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800`}
        >
          {fieldVisible
            .slice(0, qtdFieldsShowed)
            .map((field) => renderField(item, field))}

          {expandedCardIndex === index &&
            fieldVisible
              .slice(qtdFieldsShowed)
              .map((field) => renderField(item, field))}

          <div className="flex space-x-3">
            <button
              onClick={() => toggleExpandCard(index)}
              className="text-blue-400"
            >
              {expandedCardIndex === index ? "Mostrar menos" : "Mostrar mais"}
            </button>
            <FaMagnifyingGlass
              className="text-gray-400 cursor-pointer"
              onClick={() => actions.view(item)}
            />
            <FaRegEdit
              className="text-yellow-400 cursor-pointer"
              onClick={() => actions.edit(item)}
            />
            <FaRegTrashAlt
              className="text-red-400 cursor-pointer"
              onClick={() => actions.delete(item)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default ListCard;
