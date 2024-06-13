import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

import MainActions from "./MainAction";
import Form, { EntityForm, FormAction } from "../Form";
import Modal from "./Modal";
import {
  ActionReturn,
  ActionsItem,
  MainAction,
  PaginatedData,
} from "./EntityBrowser.types";
import List from "./List";

interface EntityBrowserProps<T> {
  title: string;
  mainActions?: MainAction[];
  fetchEntities: (page: number, pageSize: number) => Promise<PaginatedData<T>>;
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

  useEffect(() => {
    fetchEntities(currentPage, pageSize).then((data) => {
      setItems(data.paginatedData);
      setTotalPages(data.totalPages);
    });
  }, [fetchEntities, currentPage, pageSize]);

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
    className: "bg-green-500 hover:bg-green-600 text-white",
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

  return (
    <div className="container w-full mx-auto mt-4 rounded-md p-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-primary-dark dark:text-primary-light">
          {title}
        </h1>

        <MainActions actions={[createAction, ...mainActions]} />
      </div>

      {submitSuccess && (
        <div className="mb-4 p-2 bg-green-300 text-green-800 rounded">
          {submitSuccess}
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Search/Filter</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded w-full"
          />
          <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded">
            Search
          </button>
        </div>
      </div>

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
