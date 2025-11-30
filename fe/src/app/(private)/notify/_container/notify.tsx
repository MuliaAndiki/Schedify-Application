"use client";
import { useEffect, useState } from "react";

import NotifyHeroSection from "@/components/section/private/notify/notify-hero-section";
import { SidebarLayout } from "@/core/layouts/sidebar.layout";
import useService from "@/hooks/service/props.service";
import { useAppNameSpase } from "@/hooks/useNameSpace";
import { FormCreateReminder } from "@/types/form/reminded.form";
import { PopUpInterface } from "@/types/ui";

const NotifyContainer = () => {
  const namespace = useAppNameSpase();
  const service = useService();
  const remindedQuery = service.reminded.query();
  const taskQuery = service.Task.query();
  const remindedCreate = service.reminded.mutation.useCreate();
  const remindedUpdate = service.reminded.mutation.useUpdate();
  const remindedDeleteAll = service.reminded.mutation.useDeleteAll();
  const remindedDeleteByID = service.reminded.mutation.useDeleteById();

  const [selectID, setSelectID] = useState<string | null>(null);
  const [popUpModal, setPopUpModal] = useState<PopUpInterface>(null);
  const [formCreateReminded, setFormCreateReminded] =
    useState<FormCreateReminder>({
      reminded: "",
      taskID: selectID!,
    });

  const handleCreateReminded = () => {
    if (!selectID) {
      namespace.alert.toast({
        title: "perhatian",
        message: "server internal error",
        icon: "warning",
      });
    } else {
      const dateValid = new Date(formCreateReminded.reminded).toISOString();
      remindedCreate.mutate(
        {
          ...formCreateReminded,
          reminded: dateValid,
        },
        {
          onSuccess: () => {
            setPopUpModal(null);
          },
        }
      );
    }
  };

  useEffect(() => {
    setFormCreateReminded((prev) => ({
      ...prev,
      taskID: selectID!,
    }));
  }, [selectID]);

  return (
    <SidebarLayout>
      <main className="w-full min-h-screen flex flex-col overflow-x-hidden">
        <NotifyHeroSection
          RemindedData={remindedQuery.useRemindedQuery ?? []}
          setSelectID={setSelectID}
          isLoading={taskQuery.isLoading}
          taskData={taskQuery.TaskQuery ?? []}
          selectID={selectID}
          popUpModal={popUpModal}
          setPopUpModal={setPopUpModal}
          formCreateReminded={formCreateReminded}
          onCreate={() => handleCreateReminded()}
          setFormCreateReminded={setFormCreateReminded}
          isPending={remindedCreate.isPending}
        />
      </main>
    </SidebarLayout>
  );
};

export default NotifyContainer;
