import { X } from "lucide-react";

import { TaskListPartial } from "@/components/partial/private/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PopUp from "@/components/ui/pop-up";
import { FormCreateReminder } from "@/types/form/reminded.form";
import { IReminder, ITask } from "@/types/schema";
import { PopUpInterface } from "@/types/ui";

interface NotifyProps {
  taskData: ITask[];
  RemindedData: IReminder[];
  isLoading: boolean;
  setSelectID?: React.Dispatch<React.SetStateAction<string | null>>;
  selectID: string | null;
  popUpModal: PopUpInterface;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopUpInterface>>;
  isPending: boolean;
  formCreateReminded: FormCreateReminder;
  setFormCreateReminded: React.Dispatch<
    React.SetStateAction<FormCreateReminder>
  >;
  onCreate: () => void;
}
const NotifyHeroSection: React.FC<NotifyProps> = ({
  taskData,
  isLoading,
  selectID,
  setSelectID,
  popUpModal,
  isPending,
  setPopUpModal,
  formCreateReminded,
  setFormCreateReminded,
  onCreate,
  RemindedData,
}) => {
  return (
    <view className="w-full h-full overflow-x-hidden">
      <div className="w-full min-h-screen flex justify-start flex-col">
        {selectID && (
          <Button
            className="mb-10 flex items-center"
            variant={"outline"}
            onClick={() => setPopUpModal("reminded")}
          >
            + Reminded
          </Button>
        )}

        <div className="w-full ">
          <TaskListPartial
            tasks={taskData}
            isLoading={isLoading}
            selectID={selectID}
            setSelectID={setSelectID}
            remindedData={RemindedData ?? []}
          />
        </div>
      </div>
      <PopUp
        isOpen={popUpModal === "reminded"}
        onClose={() => setPopUpModal(null)}
      >
        <view className="w-full h-full">
          <div className="w-full flex justify-between items-center">
            <h1 className="font-medium">Reminded</h1>
            <X onClick={() => setPopUpModal(null)} />
          </div>
          <div className="w-full my-2">
            <Input
              className="w-full"
              type="date"
              value={formCreateReminded.reminded}
              onChange={(e) =>
                setFormCreateReminded((prev) => ({
                  ...prev,
                  reminded: e.target.value,
                }))
              }
            />
          </div>
          <div className="w-full">
            <Button
              className="w-full"
              disabled={isPending}
              onClick={() => onCreate()}
            >
              {isPending ? "wait" : "loading"}
            </Button>
          </div>
        </view>
      </PopUp>
    </view>
  );
};

export default NotifyHeroSection;
