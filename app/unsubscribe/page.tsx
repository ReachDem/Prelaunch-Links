'use client'

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { unsubscribeFromNewsletter } from '@/app/actions/unsubscribe';

function UnsubscribeForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleUnsubscribe = async () => {
    if (!email) {
      toast.error('Veuillez entrer votre adresse email');
      return;
    }

    setIsLoading(true);
    try {
      const result = await unsubscribeFromNewsletter(email);
      
      if (result.success) {
        setIsUnsubscribed(true);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors du désabonnement');
      console.error('Unsubscribe error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isUnsubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-600">
              Désabonnement réussi
            </CardTitle>
            <CardDescription>
              Vous avez été désabonné avec succès de notre newsletter.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Nous sommes désolés de vous voir partir. Vous ne recevrez plus d'emails de notre part.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Se désabonner
          </CardTitle>
          <CardDescription>
            Entrez votre adresse email pour vous désabonner de notre newsletter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            <Button 
              onClick={handleUnsubscribe}
              disabled={isLoading || !email}
              className="w-full"
              variant="destructive"
            >
              {isLoading ? 'Désabonnement en cours...' : 'Se désabonner'}
            </Button>
            <div className="text-center">
              <Button 
                variant="link" 
                onClick={() => window.location.href = '/'}
                className="text-sm text-gray-600"
              >
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <p>Chargement...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <UnsubscribeForm />
    </Suspense>
  );
}