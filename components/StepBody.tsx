import React, { useState } from 'react';

import { Trans, useTranslation } from 'next-i18next';

import DefaultInput from 'components/DefaultInput';
import MarkdownView from 'components/MarkdownView';
import FormGroup from 'components/FormGroup';
import LoadableButton from 'components/LoadableButton';
import Label from 'components/Label';

type Props = {
  onNextClick: ({
    url,
    correct,
    contents,
  }: {
    url?: string;
    correct?: string;
    contents?: string;
  }) => void;
};

function Step1Body({ onNextClick }: Props) {
  const { t } = useTranslation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { url } = Object.fromEntries(formData);
    onNextClick({
      url: url as string,
    });
  };

  return (
    <div className="flex flex-col items-center w-full gap-y-4">
      <form className="w-full max-w-lg" id="step1" onSubmit={handleSubmit}>
        <DefaultInput
          label="Link"
          feedback={
            <Trans i18nKey="links:stepBody.step1.feedback1">
              정답을 맞혔을 때 이동할 링크를 입력해 주세요.
              <br />
              이동할 링크가 없다면{' '}
              <a
                className="link"
                href="https://celebration.minung.dev"
                target="_blank"
                rel="noreferrer"
              >
                celebration.minung.dev
              </a>
              를 활용해보세요.
            </Trans>
          }
          name="url"
          type="url"
          placeholder="https://aaaa.com/bbbb"
          required
        />
      </form>
      <button className="btn btn-wide" type="submit" form="step1">
        {t('common:next')}
      </button>
    </div>
  );
}

function Step2Body({ onNextClick }: Props) {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(
    t('links:stepBody.step2.example') as string,
  );

  const handleQuizChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setValue(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { correct, contents } = Object.fromEntries(formData);
    onNextClick({
      correct: correct as string,
      contents: contents as string,
    });
    setIsLoading(true);
  };

  return (
    <div className="flex flex-col items-center w-full gap-y-4">
      <div className="flex flex-col lg:flex-row items-center lg:justify-center lg:items-start w-full gap-6 gap-y-4">
        <form className="w-full max-w-lg" id="step2" onSubmit={handleSubmit}>
          <DefaultInput
            label="Correct"
            feedback={t('links:stepBody.step2.feedback1')}
            name="correct"
            placeholder=""
            required
          />
          <FormGroup
            label="Quiz Contents"
            feedback={t('links:stepBody.step2.feedback2')}
          >
            <textarea
              className="textarea w-full h-48 textarea-bordered"
              name="contents"
              placeholder=""
              value={value}
              onChange={handleQuizChange}
              required
            />
          </FormGroup>
        </form>
        <div className="w-full max-w-lg">
          <Label>Preview</Label>
          <MarkdownView contents={value} />
        </div>
      </div>
      <LoadableButton className="btn-wide" type="submit" form="step2">
        {t('common:next')}
      </LoadableButton>
    </div>
  );
}

const StepBody: { [key: string]: (props: Props) => JSX.Element } = {
  Step1: Step1Body,
  Step2: Step2Body,
};

export default StepBody;
