import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Steps from 'components/Steps';
import { useState } from 'react';
import ShareButton from 'components/ShareButton';

function LinkComplete() {
  const { t } = useTranslation('common');

  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const {
    query: { link = '' },
  } = router;

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(link as string);
    setCopied(true);
  };

  return (
    <div className="flex flex-col items-center gap-y-4">
      <Steps step={3} />
      <Link href={link as string} passHref>
        <a className="link link-accent">{link}</a>
      </Link>
      <div className="indicator">
        {copied && (
          <span className="indicator-item">
            <span className="badge badge-secondary animate-head-shake">
              {t('copied')}
            </span>
          </span>
        )}
        {/* <button className="btn btn-wide" onClick={handleCopyClick}>
          {t('copy')}
        </button> */}
        <ShareButton url={link as string} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale = 'ko',
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default LinkComplete;
