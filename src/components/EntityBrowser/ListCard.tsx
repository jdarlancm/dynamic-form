import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { EntityForm, FormField } from "../Form";
import { formatValue } from "./entityBrowser.util";
import { ActionsItem } from "./EntityBrowser.types";
import { colors } from "./colors";

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

  const cardColor = `${colors.list.border.light} ${colors.text.light} ${colors.list.oddRow.light} hover:${colors.list.hover.light} dark:${colors.list.border.dark} dark:${colors.text.dark} dark:${colors.list.oddRow.dark} dark:hover:${colors.list.hover.dark}`;

  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className={`p-4 border-b text-sm md:text-md ${cardColor}`}
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
              className={`${colors.text.primary}`}
            >
              {expandedCardIndex === index ? "Mostrar menos" : "Mostrar mais"}
            </button>
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
          </div>
        </div>
      ))}
    </>
  );
};

export default ListCard;
