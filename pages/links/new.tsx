import { useState } from 'react';
import { useRouter } from 'next/router';

import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import axios from 'axios';

import Layout from 'components/Layout';
import Steps from 'components/Steps';
import StepBody from 'components/StepBody';

const LAST_STEP = 3;

function LinkNew() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [quizLink, setQuizLink] = useState({});

  const handleNextClick = async (data: any) => {
    const nextStep = step + 1;
    const newQuizLink = { ...quizLink, ...data };

    if (nextStep === LAST_STEP) {
      try {
        const {
          data: { data: insertedId },
        } = await axios.post('/api/links', newQuizLink);

        router.push(
          {
            pathname: '/links/complete',
            query: {
              link: `${location.origin}/links/${insertedId}`,
            },
          },
          '/link/complete',
        );
      } catch (err) {
        // TOOD: 에러 처리
        console.error(err);
      }

      return;
    }

    setStep(nextStep);
    setQuizLink(newQuizLink);
  };

  const StepBodyComponent = StepBody[`Step${step}`];

  return (
    <Layout fluid>
      <div className="flex flex-col items-center gap-y-4">
        <Steps step={step} />
        <StepBodyComponent onNextClick={handleNextClick} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale = 'ko',
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'links'])),
    },
  };
};

export default LinkNew;
