import { CalendarDays } from "lucide-react";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { AuthSchemaProps } from "@/types/props.types";

const HeaderDashboardPartial: React.FC<AuthSchemaProps> = ({ data }) => {
  return (
    <Card className="w-full">
      <div className="w-full flex  rounded-lg justify-between items-center p-2">
        <div className="flex items-center gap-2 ">
          <Image
            alt="avatar"
            src={data.photoUrl ? data.photoUrl : "/avatars/1.jpeg"}
            width={80}
            height={80}
            className="object-cover aspect-square rounded-full"
          />
          <div className="flex flex-col justify-start">
            <h1 className="text-xl font-bold text-muted-foreground/60">
              Welcome
            </h1>
            <h1 className="text-md font-bold ">{data.fullName}</h1>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HeaderDashboardPartial;
