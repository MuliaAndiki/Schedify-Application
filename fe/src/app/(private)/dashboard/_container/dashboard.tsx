"use client";
import DashboardHeroSection from "@/components/section/private/dashboard-hero-section";
import { SidebarLayout } from "@/core/layouts/sidebar.layout";
import useService from "@/hooks/service/props.service";
import { useAppNameSpase } from "@/hooks/useNameSpace";

const DashboardContainer = () => {
  const namespace = useAppNameSpase();
  const service = useService();
  const authDataAll = service.Auth.query();
  const categoryQuery = service.Category.query();
  const taskQuery = service.Task.query();
  const doneMutation = service.Task.mutation.useDoneTask();
  const remindedQuery = service.reminded.query();

  const handleDoneTask = (id?: string) => {
    if (!id) {
      namespace.alert.toast({
        title: "perhatian",
        message: "id tidak valid",
        icon: "warning",
      });
    } else {
      doneMutation.mutate(id);
    }
  };

  return (
    <SidebarLayout>
      <main className="w-full min-h-screen flex flex-col ">
        <DashboardHeroSection
          onDone={handleDoneTask}
          reminded={remindedQuery.useRemindedQuery ?? []}
          userData={authDataAll.profileQuery ?? ""}
          categories={categoryQuery.CategoryQuery}
          tasks={taskQuery.TaskQuery}
          isLoading={categoryQuery.isLoading || taskQuery.isLoading}
        />
      </main>
    </SidebarLayout>
  );
};

export default DashboardContainer;
