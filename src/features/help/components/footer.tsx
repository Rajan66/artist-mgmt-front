import { Mail, PhoneIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Footer = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Need More Help?</CardTitle>
        <CardDescription>
          Our support team is here to assist you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Email Support</p>
            <p className="text-sm text-muted-foreground">
              support@voxcloud.com
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PhoneIcon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Live Chat</p>
            <p className="text-sm text-muted-foreground">+977 9811131089</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Footer;
