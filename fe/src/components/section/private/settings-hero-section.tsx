import SettingsLogout from "@/components/partial/private/settings/setting-logout";
import SettingsProfilePartial from "@/components/partial/private/settings/settings-profile";
import SettingsSecurityPartial from "@/components/partial/private/settings/settings-security";
import SettingsAll from "@/components/partial/private/settingsAll";
import { FormUpdateProfile } from "@/types/form/auth.form";
import { IAuth } from "@/types/schema";
import { PopUpInterface } from "@/types/ui";

interface SettingsProps {
  userData: IAuth;
  onLogout: () => void;
  isPending: boolean;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopUpInterface>>;
  onUpdateProfile: () => void;
  onChangePitch: (e: any) => void;
  formUpdateProfile: FormUpdateProfile;
  setFormUpdateProfile: React.Dispatch<React.SetStateAction<FormUpdateProfile>>;
  priview: string | null;
  setPriview: React.Dispatch<React.SetStateAction<string | null>>;
  popUpModal: PopUpInterface;
  handleOpenPopUp: (data: any) => void;
}

const SettingsHeroSection: React.FC<SettingsProps> = ({
  userData,
  onLogout,
  isPending,
  onUpdateProfile,
  onChangePitch,
  formUpdateProfile,
  setFormUpdateProfile,
  setPopUpModal,
  priview,
  popUpModal,
  setPriview,
  handleOpenPopUp,
}) => {
  return (
    <view className="w-full h-full overflow-x-hidden relative">
      <div className="w-full flex justify-start items-center flex-col h-full gap-6 p-4">
        <div className="w-full">
          <h1 className="text-2xl font-bold">Pengaturan</h1>
          <p className="text-muted-foreground text-sm">
            Kelola akun dan preferensi Anda
          </p>
        </div>

        <SettingsProfilePartial
          handlePopUp={handleOpenPopUp}
          userData={userData}
          formUpdateProfile={formUpdateProfile}
          setFormUpdateProfile={setFormUpdateProfile}
          preview={priview}
          onChangePitch={onChangePitch}
          setPopUpModal={setPopUpModal}
          setPreview={setPriview}
          popUpModal={popUpModal}
          onUpdate={onUpdateProfile}
          isPending={isPending}
        />

        <SettingsSecurityPartial />
        <SettingsAll />

        <SettingsLogout isPending={isPending} onLogout={onLogout} />
      </div>
    </view>
  );
};

export default SettingsHeroSection;
