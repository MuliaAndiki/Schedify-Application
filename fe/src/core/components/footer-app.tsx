import { Activity, ChartBarStacked, House, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
const FooterApp: React.FC = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState<
    "Default" | "Home" | "Task" | "Profile" | "Settings"
  >("Default");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const time = setTimeout(() => {
      setVisible(false);
    }, 1000);
    return () => clearTimeout(time);
  }, [isActive]);

  const NavigationItems = [
    { name: "Home", icon: <House />, href: "/dashboard" },
    { name: "Task", icon: <Activity />, href: "/task" },
    { name: "Profile", icon: <ChartBarStacked />, href: "/category" },
    { name: "Settings", icon: <Settings />, href: "/settings" },
  ] as const;

  const handleRedirect = (name: typeof isActive) => {
    setVisible(true);
    setIsActive(name);

    const item = NavigationItems.find((item) => item.name === name);
    if (!item) return;

    setTimeout(() => {
      router.push(item.href);
    }, 1000);
  };

  const renderContent = () => {
    const baseClass = `flex justify-center items-center flex-col transition-opacity duration-1000 ease-in-out ${
      visible ? "opacity-100" : "opacity-0"
    }`;

    switch (isActive) {
      case "Home":
        return (
          <main key="home" className={baseClass}>
            <House className="text-foreground" />
            <h1 className="text-sm md:text-4xl font-bold">Home</h1>
          </main>
        );
      case "Task":
        return (
          <main key="task" className={baseClass}>
            <Activity className="text-foreground" />
            <h1 className="text-sm md:text-4xl font-bold">Task</h1>
          </main>
        );
      case "Profile":
        return (
          <main key="profile" className={baseClass}>
            <ChartBarStacked className="text-foreground" />
            <h1 className="text-sm md:text-4xl font-bold">Category</h1>
          </main>
        );
      case "Settings":
        return (
          <main key="settings" className={baseClass}>
            <Settings className="text-foreground" />
            <h1 className="text-sm md:text-4xl font-bold">Settings</h1>
          </main>
        );
    }
  };

  return (
    <main className="w-full h-full ">
      {renderContent()}
      <main className="flex justify-around items-center bg-muted-foreground rounded-lg m-2 p-1 shadow-md/20">
        {NavigationItems.map((items) => (
          <Button
            key={items.name}
            variant="ghost"
            className="text-background"
            onClick={() => handleRedirect(items.name)}
            disabled={isActive === items.name}
          >
            {items.icon}
          </Button>
        ))}
      </main>
    </main>
  );
};

export default FooterApp;
