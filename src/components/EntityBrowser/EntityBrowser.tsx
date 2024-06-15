import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

import MainActions from "./MainAction";
import Form, { EntityForm, FormAction, FormField } from "../Form";
import Modal from "./Modal";
import {
  ActionReturn,
  ActionsItem,
  Filter,
  MainAction,
  PaginatedData,
} from "./EntityBrowser.types";
import List from "./List";
import ListFilter from "./ListFilter";
import { colors } from "./colors";

interface EntityBrowserProps<T> {
  title: string;
  mainActions?: MainAction[];
  fetchEntities: (
    page: number,
    pageSize: number,
    filters?: Filter[]
  ) => Promise<PaginatedData<T>>;
  entityForm: EntityForm<T>;
  pageSize?: number;
}

const EntityBrowser = <T,>({
  title,
  mainActions = [],
  fetchEntities,
  entityForm,
  pageSize = 10,
}: EntityBrowserProps<T>) => {
  const [items, setItems] = useState<T[]>([]);

  const [selectedItem, setSelectedItem] = useState<EntityForm<T> | null>(
    entityForm
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formAction, setFormAction] = useState<FormAction>(FormAction.VIEW);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [filters, setFilters] = useState<Filter[]>([]);

  useEffect(() => {
    fetchEntities(currentPage, pageSize, filters).then((data) => {
      setItems(data.paginatedData);
      setTotalPages(data.totalPages);
    });
  }, [fetchEntities, currentPage, pageSize, filters]);

  const handleActionView = (item: T) => {
    entityForm.object = item;
    setSelectedItem(entityForm);
    setFormAction(FormAction.VIEW);
    setIsModalOpen(true);
  };

  const handleActionCreate = () => {
    entityForm.object = entityForm.newObject;
    setSelectedItem(entityForm);
    setFormAction(FormAction.CREATE);
    setIsModalOpen(true);
  };

  const handleActionUpdate = (item: T) => {
    entityForm.object = item;
    setSelectedItem(entityForm);
    setFormAction(FormAction.UPDATE);
    setIsModalOpen(true);
  };

  const handleActionDelete = (item: T) => {
    entityForm.object = item;
    setSelectedItem(entityForm);
    setFormAction(FormAction.DELETE);
    setIsModalOpen(true);
  };

  const handleSubmit = (obj: T) => {
    let result: ActionReturn = {
      success: false,
      message: "",
    };

    if (formAction === FormAction.CREATE) {
      result = entityForm.onCreate(obj);
    } else if (formAction == FormAction.UPDATE) {
      result = entityForm.onUpdate(obj);
    } else if (formAction == FormAction.DELETE) {
      result = entityForm.onDelete(obj);
    }

    if (result.success) {
      fetchEntities(currentPage, pageSize).then((data) => {
        setItems(data.paginatedData);
        setTotalPages(data.totalPages);
      });
      displaySuccessMessage(result.message);
      closeModal();
    } else {
      setSubmitError(result.message);
    }
  };

  const handleChangeFilters = (filters: Filter[]) => {
    setCurrentPage(1);
    setFilters(filters);
  };

  const displaySuccessMessage = (message: string) => {
    setSubmitSuccess(message);
    setTimeout(() => {
      setSubmitSuccess(null);
    }, 5000);
  };

  const actionsItem: ActionsItem<T> = {
    view: handleActionView,
    edit: handleActionUpdate,
    delete: handleActionDelete,
  };

  const createAction = {
    icon: FaPlusCircle,
    label: "Novo",
    onClick: handleActionCreate,
    className: `${colors.actions.create.background} hover:${colors.actions.create.hover} ${colors.actions.create.text}`,
  };

  const closeModal = () => {
    setFormAction(FormAction.VIEW);
    setIsModalOpen(false);
    setSelectedItem(null);
    setSubmitError(null);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filterableFields = entityForm.baseSchema.filter(
    (field: FormField) => field.filtrableInList
  );

  return (
    <div
      className={`container w-full mx-auto mt-4 rounded-md p-4 ${colors.background.light} dark:${colors.background.dark} ${colors.text.light} dark:${colors.text.dark}`}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className={`text-2xl font-semibold ${colors.text.primary}`}>
          {title}
        </h1>

        <MainActions actions={[createAction, ...mainActions]} />
      </div>

      {submitSuccess && (
        <div
          className={`mb-4 p-2 ${colors.messages.success.background} ${colors.messages.success.text} rounded`}
        >
          {submitSuccess}
        </div>
      )}

      {filterableFields && filterableFields.length > 0 && (
        <ListFilter
          filters={filters}
          setFilters={handleChangeFilters}
          filterableFields={filterableFields}
        />
      )}

      <List
        entityForm={entityForm}
        items={items}
        actions={actionsItem}
        goToPage={goToPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {isModalOpen && selectedItem && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Form
            schema={selectedItem.createFormSchema(formAction)}
            columns={2}
            action={formAction}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            submitError={submitError}
          />
        </Modal>
      )}
    </div>
  );
};

export default EntityBrowser;
