import {MainPageData} from '@/api/getHomeContent';
import Contentful from '../Contentful/Contentful';

const styles = {
  cta: 'flex flex-col w-full h-auto lg:h-1/2 bg-anne-indigo-light',
};

type FooterProps = {cta: MainPageData['cta']};

const Footer = ({cta: {contactTitle, messageTitle, text, title}}: FooterProps) => {
  return (
    <section
      id="contact_footer"
      className="flex w-full h-auto lg:h-1080 bg-anne-indigo-medium">
      <div id="get_in_touch" className={`${styles.cta} gap-16 py-24 pl-24 pr-12`}>
        <Contentful document={title} />
        <Contentful document={text} />
      </div>
      <div id="contact_box" className={`${styles.cta} py-24 pr-24 pl-12`}>
        <form
          id="contact_form"
          className="w-full flex flex-col items-start h-full">
          <div id="contact_email" className="w-full mb-4">
            <Contentful document={contactTitle} />
            <input className="w-full" />
          </div>
          <div id="contact_message" className="w-full h-full mb-8">
            <Contentful document={messageTitle} />
            <textarea className="w-full h-full" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Footer;
