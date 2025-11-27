import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SettingLogoutProps {
  isPending: boolean;
  onLogout: () => void;
}

const SettingsLogout: React.FC<SettingLogoutProps> = ({
  isPending,
  onLogout,
}) => {
  return (
    <Card className="w-full border-destructive mb-10">
      <CardHeader>
        <CardTitle className="text-destructive">Zona Berbahaya</CardTitle>
        <CardDescription>Tindakan yang tidak dapat diurungkan</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full"
          disabled={isPending}
          type="button"
          variant="destructive"
          onClick={() => onLogout()}
        >
          {isPending ? "Tunggu..." : "Logout"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsLogout;
