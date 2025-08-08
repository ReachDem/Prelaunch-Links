import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
} from '@react-email/components';

interface NewsletterWelcomeProps {
  unsubscribeUrl?: string;
}

const NewsletterWelcome = ({ unsubscribeUrl }: NewsletterWelcomeProps) => {
  return (
    <Html lang="fr" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Bienvenue dans notre newsletter !</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white max-w-[600px] mx-auto rounded-[8px] overflow-hidden">
            {/* Header */}
            <Section className="bg-black text-center py-[32px] px-[24px]">
              <Heading className="text-[18px] font-normal m-0">
                Links by ReachDem
              </Heading>
            </Section>

            {/* Contenu principal */}
            <Section className="px-[32px] py-[32px]">
              <Heading className="text-black text-[24px] font-bold mb-[20px] mt-0">
                Bienvenue sur Links by ReachDem ! 🎉
              </Heading>
              
              <Text className="text-gray-700 text-[16px] leading-[24px] mb-[20px] mt-0">
                Merci de vous &ecirc;tre inscrit &agrave; notre newsletter ! Vous allez maintenant recevoir 
                nos dernières actualités, conseils et nouveautés directement dans votre boîte mail.
              </Text>

              <Text className="text-gray-700 text-[16px] leading-[24px] mb-[20px] mt-0">
                Restez connect&eacute; pour ne rien manquer de l&apos;univers Links By ReachDem.
              </Text>

              <Hr className="border-gray-200 border-solid my-[24px]" />

              <Text className="text-gray-600 text-[14px] leading-[20px] mb-[0] mt-0">
                À très bientôt dans votre boîte mail !<br />
                L'équipe Links By ReachDem
              </Text>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-50 px-[32px] py-[24px] border-t-[1px] border-gray-200 border-solid">
              <Text className="text-gray-500 text-[12px] leading-[16px] text-center m-0 mb-[8px]">
                <strong>ReachDem</strong>
              </Text>
              <Text className="text-gray-500 text-[12px] leading-[16px] text-center m-0 mb-[8px]">
                PK13, Eva Hotel
              </Text>
              <Text className="text-gray-500 text-[12px] leading-[16px] text-center m-0 mb-[16px]">
                © 2025 ReachDem. Tous droits réservés.
              </Text>
              
              <Text className="text-gray-400 text-[11px] leading-[14px] text-center m-0">
                <Link href={unsubscribeUrl || '#'} className="text-gray-500 underline">
                  Se désabonner
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

NewsletterWelcome.PreviewProps = {
  unsubscribeUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?email=test@example.com`
} as NewsletterWelcomeProps;

export default NewsletterWelcome;