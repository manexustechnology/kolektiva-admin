'use client';

import { Button, Card } from '@chakra-ui/react';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignInClientPage: React.FC = async () => {
  const { data } = useSession();
  const router = useRouter();

  if (data) {
    router.push('/dashboard');
    return (<></>);
  }

  const providers = await getProviders();

  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
      <Card maxW='md' rounded='xl' className='w-full'>
        <div className='w-full p-8 gap-8 flex flex-col items-center'>
          {providers &&
            Object.values(providers).map((provider) => (
              <div className='w-full' key={provider.name}>
                <Button colorScheme='primary' w='full' type='submit' onClick={() => signIn(provider.id, { callbackUrl: '/dashboard' })}>Sign in with {provider.name}</Button>
              </div>
            ))}
        </div>
      </Card>
    </div >
  )
}

export default SignInClientPage;