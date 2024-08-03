'use client';
import {useFormState, useFormStatus} from 'react-dom';
import {useRef} from 'react';

import Contentful from '../Contentful/Contentful';
import {MainPageData} from '@/api/getMainPageContent';
import {submitContactForm} from '@/api/submitContactForm';

const SubmitButton = () => {
  const {pending} = useFormStatus();
  return (
    <button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? 'Loading...' : 'Submit'}
    </button>
  );
};

type ContactFormProps = Omit<MainPageData['cta'], 'text' | 'title'>;

const ContactForm = ({contactTitle, messageTitle}: ContactFormProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [state, formAction] = useFormState(
    async (_: any, formData: FormData) => {
      const res = await submitContactForm(_, formData);
      if (res?.message && emailRef.current && messageRef.current) {
        emailRef.current.value = '';
        messageRef.current.value = '';
      }
      return res;
    },
    null,
  );

  return (
    <div
      id="contact_box"
      className="w-full lg:w-1/2 pb-12 lg:pb-24 pt-6 lg:pt-24 pr-24 pl-24 lg:pl-12">
      <form
        action={formAction}
        id="contact_form"
        className="w-full flex flex-col items-start h-full">
        <div className="w-full mb-4">
          <label htmlFor="email">
            <Contentful document={contactTitle} />
          </label>
          <input
            key={emailRef?.current?.value}
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            className="w-full text-black"
            required
          />
        </div>
        <div className="w-full h-full mb-8">
          <label htmlFor="message">
            <Contentful document={messageTitle} />
          </label>
          <textarea
            key={messageRef?.current?.value}
            ref={messageRef}
            id="message"
            name="message"
            className="w-full h-200 lg:h-full text-black"
            required
          />
        </div>
        <SubmitButton />
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
