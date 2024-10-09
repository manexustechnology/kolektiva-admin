"use client";

import { Button, Card } from "@chakra-ui/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignInClientPage: React.FC = () => {
  const { data } = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const providers = await getProviders();
        setProviders(providers);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  if (data) {
    router.push("/dashboard");
    return <></>;
  }

  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
      <Card maxW="md" rounded="xl" className="w-full">
        <div className="w-full p-8 gap-8 flex flex-col items-center">
          {providers &&
            Object.values(providers).map((provider) => (
              <div className="w-full" key={provider.name}>
                <Button
                  colorScheme="primary"
                  w="full"
                  type="submit"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: "/dashboard",
                    })
                  }
                >
                  Sign in with {provider.name}
                </Button>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default SignInClientPage;
