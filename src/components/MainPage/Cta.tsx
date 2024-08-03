import {MainPageData} from '@/api/getHomeContent';
import Contentful from '../Contentful/Contentful';
import Instagram from '@/svgs/Instagram';

type FooterProps = {cta: MainPageData['cta']; footer: MainPageData['footer']};

const Footer = ({cta, footer}: FooterProps) => {
  return (
    <div
      id="contact_footer"
      className="flex flex-col w-full h-auto lg:h-1080 bg-anne-indigo-medium">
      <section
        id="contact"
        className="flex flex-col lg:flex-row w-full h-auto lg:h-2/3 bg-anne-indigo-light">

        <div
          id="get_in_touch"
          className="flex flex-col w-full lg:w-1/2 h-full gap-8 lg:gap-16 pb-6 lg:pb-24 pt-12 lg:pt-24 pl-24 pr-24 lg:pr-12">
          <Contentful document={cta.title} />
          <Contentful document={cta.text} />
        </div>

        <div id="contact_box" className="w-full lg:w-1/2 pb-12 lg:pb-24 pt-6 lg:pt-24 pr-24 pl-24 lg:pl-12">
          <form
            id="contact_form"
            className="w-full flex flex-col items-start h-full">
            <div id="contact_email" className="w-full mb-4">
              <Contentful document={cta.contactTitle} />
              <input className="w-full" />
            </div>
            <div id="contact_message" className="w-full h-full mb-8">
              <Contentful document={cta.messageTitle} />
              <textarea className="w-full h-200 lg:h-full" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>

      <section
        id="footer"
        className="flex flex-col items-center justify-center w-full h-auto lg:h-1/3 gap-8 p-24">
        <Contentful document={footer.text} className="text-center" />
        {footer.contacts.map(contact => {
          return (
            <div
              id={'contact_via_' + contact}
              className="relative -top-1"
              key={contact}>
              <Instagram />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Footer;
