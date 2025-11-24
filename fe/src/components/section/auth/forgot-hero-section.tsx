import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormForgotPassword } from "@/types/form/auth.form";

interface ForgotProps {
  formForgot: FormForgotPassword;
  setFormForgot: React.Dispatch<React.SetStateAction<FormForgotPassword>>;
  isPending: boolean;
  onForgot: () => void;
}

const ForgotHeroSection: React.FC<ForgotProps> = ({
  formForgot,
  isPending,
  onForgot,
  setFormForgot,
}) => {
  return (
    <view className="w-full h-full overflow-hidden">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Reset Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onForgot();
              }}
            >
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={formForgot.email}
                    onChange={(e) =>
                      setFormForgot((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </Field>

                <Field>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Wait" : "Verify"}
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="/login">Sign In</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our{" "}
          <Link href="#">Terms of Service</Link> and{" "}
          <Link href="#">Privacy Policy</Link>.
        </FieldDescription>
      </div>
    </view>
  );
};

export default ForgotHeroSection;
