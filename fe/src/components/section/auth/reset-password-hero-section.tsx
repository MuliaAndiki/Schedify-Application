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
import { FormResetPassword } from "@/types/form/auth.form";

interface ResetProps {
  formResetPassword: FormResetPassword;
  setFormResetPassword: React.Dispatch<React.SetStateAction<FormResetPassword>>;
  isPending: boolean;
  onReset: () => void;
  confirmPassword: string | null;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string | null>>;
}

const ResetPasswordHeroSection: React.FC<ResetProps> = ({
  confirmPassword,
  formResetPassword,
  isPending,
  onReset,
  setConfirmPassword,
  setFormResetPassword,
}) => {
  return (
    <view className="w-full h-full overflow-hidden">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">New Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onReset();
              }}
            >
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">New Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formResetPassword.password}
                    onChange={(e) =>
                      setFormResetPassword((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Confirm Password</FieldLabel>
                  <Input
                    id="confirm password"
                    type="password"
                    required
                    value={confirmPassword!}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPasswordHeroSection;
