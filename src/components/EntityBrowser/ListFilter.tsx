import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

import { Filter, FilterCondition } from "./EntityBrowser.types";
import { FormField } from "../Form";
import {
  truncateText,
  validateConditionForField,
  validateValueForFieldType,
} from "./ListFilter.util";
import { colors } from "./colors";

interface ListFilterProps {
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
  filterableFields: FormField[];
}

const ListFilter = ({
  filters,
  setFilters,
  filterableFields,
}: ListFilterProps) => {
  const [newFilter, setNewFilter] = useState<Filter>({
    field: "",
    operator: FilterCondition.Equals,
    value: "",
  });
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleNewFilterChange = (
    field: keyof Filter,
    value: string | FilterCondition
  ) => {
    setNewFilter({ ...newFilter, [field]: value });
  };

  const addFilter = () => {
    let msgError = "";
    const selectedField = filterableFields.find(
      (f) => f.name === newFilter.field
    );

    if (!selectedField || !newFilter.field) {
      msgError = "Selecione o campo a ser filtrado.";
    } else if (!newFilter.operator) {
      msgError = "Defina a condição.";
    } else if (
      !newFilter.value ||
      !validateValueForFieldType(newFilter.value, selectedField.type)
    ) {
      msgError = "Valor do filtro inválido.";
    } else if (
      !validateConditionForField(
        FilterCondition[newFilter.operator],
        selectedField.type
      )
    ) {
      msgError = "Condição inválida para este campo.";
    }

    if (!msgError) {
      setFilters([...filters, newFilter]);
      setNewFilter({ field: "", operator: "", value: "" });
    } else {
      setErrorMsg(msgError);
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }
  };

  const removeFilter = (index: number) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const getLabel = (fieldName: string): string => {
    const field = filterableFields.find((field) => field.name === fieldName);
    return field ? field.label : fieldName;
  };

  const inputsColor = `${colors.text.light} bg-white`;

  const [isOpen, setIsOpen] = useState(true);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex sm:hidden justify-between mb-2"
        onClick={toggleFilter}
      >
        <div>Filtros</div>
        <div className="flex sm:hidden w-4 cursor-pointer">
          <FaAngleDown />
        </div>
      </div>
      <div
        className={`mb-4 w-full ${isOpen ? "" : "hidden"} sm:flex sm:flex-col`}
      >
        {errorMsg && (
          <div
            className={`items-center ${colors.messages.error.text.light} dark:${colors.messages.error.text.dark}`}
          >
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-4 space-x-0 sm:space-x-2 mb-4 w-full">
          <select
            className={`p-2 border rounded w-full sm:w-auto ${inputsColor} `}
            value={newFilter.field}
            onChange={(e) => handleNewFilterChange("field", e.target.value)}
          >
            <option value="">Selecione o campo</option>
            {filterableFields.map(({ name, label }: FormField) => (
              <option key={name} value={name}>
                {label}
              </option>
            ))}
          </select>

          <select
            className={`p-2 border rounded w-full sm:w-auto ${inputsColor}`}
            value={newFilter.operator}
            onChange={(e) => handleNewFilterChange("operator", e.target.value)}
          >
            <option value="">Selecione a condição</option>
            {Object.entries(FilterCondition).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Valor"
            className={`p-2 border rounded w-full sm:w-auto ${inputsColor}`}
            value={newFilter.value}
            onChange={(e) => handleNewFilterChange("value", e.target.value)}
          />

          <button
            className={`${colors.actions.filter.background} hover:${colors.actions.filter.hover.background} text-white px-4 py-2 rounded w-64"`}
            onClick={addFilter}
          >
            Filtrar
          </button>
        </div>

        <div className="mb-8">
          {filters.length > 0 && (
            <div className="flex flex-wrap space-x-2 items-center">
              <h3 className="text-sm font-semibold">Filtros:</h3>

              {filters
                .sort((a, b) => a.field.localeCompare(b.field))
                .map((filter, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-200 text-blue-800 px-2 py-0 rounded-full m-1"
                  >
                    <span className="mr-1 text-xs">{`${getLabel(
                      filter.field
                    )} ${
                      FilterCondition[
                        filter.operator as keyof typeof FilterCondition
                      ]
                    } ${truncateText(filter.value, 15)}`}</span>
                    <button
                      className={`${colors.text.light}  px-1 py-0 rounded-full"`}
                      onClick={() => removeFilter(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              <span
                className={`text-xs cursor-pointer ${colors.actions.filter.text}`}
                onClick={() => clearFilters()}
              >
                (Limpar todos)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListFilter;
