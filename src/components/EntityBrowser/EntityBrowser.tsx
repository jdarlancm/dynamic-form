import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

import MainActions, { MainAction } from "./MainAction";
import Form, { EntityForm, FormAction } from "../Form";
import Modal from "./Modal";
import ListTable from "./ListTable";
import ListCard from "./ListCard";

export type ActionsItem<T> = {
  view: (item: T) => void;
  edit: (item: T) => void;
  delete: (item: T) => void;
  [key: string]: ((item: T) => void) | undefined;
};

interface EntityBrowserProps<T> {
  title: string;
  mainActions: MainAction[];
  fetchEntities: () => Promise<T[]>;
  entityForm: EntityForm<T>;
}

const EntityBrowser = <T,>({
  title,
  mainActions,
  fetchEntities,
  entityForm,
}: EntityBrowserProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [selectedItem, setSelectedItem] = useState<EntityForm<T> | null>(
    entityForm
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formAction, setFormAction] = useState<FormAction>(FormAction.VIEW);

  useEffect(() => {
    fetchEntities().then(setItems);
  }, [fetchEntities]);

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
    if (formAction === FormAction.CREATE) {
      entityForm.onCreate(obj);
      fetchEntities().then(setItems);
      closeModal();
    } else if (formAction == FormAction.UPDATE) {
      entityForm.onUpdate(obj);
      fetchEntities().then(setItems);
      closeModal();
    }
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
  };

  return (
    <div className="container w-full mx-auto mt-4 rounded-md p-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-primary-dark dark:text-primary-light">
          {title}
        </h1>

        <MainActions actions={[createAction, ...mainActions]} />
      </div>

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

      <div>
        <div className="hidden md:block overflow-x-auto">
          <ListTable
            entityForm={entityForm}
            items={items}
            actions={actionsItem}
          />
        </div>

        <div className="md:hidden">
          <ListCard
            entityForm={entityForm}
            items={items}
            actions={actionsItem}
          />
        </div>
      </div>

      {isModalOpen && selectedItem && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Form
            schema={selectedItem.createFormSchema(formAction)}
            columns={2}
            action={formAction}
            onSubmit={handleSubmit}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default EntityBrowser;
