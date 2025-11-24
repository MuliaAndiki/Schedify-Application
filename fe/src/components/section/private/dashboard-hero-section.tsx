import DashboardCategoryPartial from "@/components/partial/private/dashboard-category";
import DashboardTaskPartial from "@/components/partial/private/dashboard-task";
import HeaderDashboardPartial from "@/components/partial/private/header-dashboard";
import { IAuth, ICategory, ITask } from "@/types/schema";

interface DashboardProps {
  userData: IAuth;
  categories: ICategory[];
  tasks: ITask[];
  isLoading: boolean;
}

const DashboardHeroSection: React.FC<DashboardProps> = ({
  userData,
  categories,
  tasks,
  isLoading,
}) => {
  const recentTasks = tasks.slice(0, 3);
  const pendingTasks = tasks.filter((t) => !t.isDone).length;
  const completedTasks = tasks.filter((t) => t.isDone).length;

  return (
    <view className="w-full h-full overflow-x-hidden relative">
      <div className="w-full flex justify-start items-center flex-col h-full gap-6 p-4">
        <HeaderDashboardPartial data={userData ?? ""} key={userData.id} />

        {/* Statistics */}
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Kategori</p>
            <p className="text-2xl font-bold mt-2">{categories.length}</p>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Tugas</p>
            <p className="text-xs text-muted-foreground mt-2">
              {pendingTasks} pending, {completedTasks} selesai
            </p>
          </div>
        </div>

        {/* Recent Categories */}
        <DashboardCategoryPartial
          categories={categories.slice(0, 3)}
          isLoading={isLoading}
        />

        {/* Recent Tasks */}
        <DashboardTaskPartial
          tasks={recentTasks}
          categories={categories}
          isLoading={isLoading}
        />
      </div>
    </view>
  );
};

export default DashboardHeroSection;
