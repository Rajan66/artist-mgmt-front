import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUser } from "@/utils/get-user";

import { ArtistForm, ManagerEditForm } from ".";

const AccountSettings = () => {
  const user = getUser();
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          {user?.role === "artist" ? <ArtistForm /> : <ManagerEditForm />}
        </CardContent>
      </Card>
    </div>
  );
};
export default AccountSettings;
