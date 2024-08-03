import Instagram from '@/svgs/Instagram';
import MenuArrow from '@/svgs/MenuArrow';
import VerticalDivider from '@/svgs/VerticalDivider';

import Contentful, {H5} from '../Contentful/Contentful';
import {MainPageData} from '@/api/getHomeContent';
import BgImage from './BgImage';

type NavProps = MainPageData['navigation'];

const Nav = ({menu, name, contacts, bgImage}: NavProps) => {
  return (
    <nav
      id="navigation"
      className="h-720 md:h-720 xl:h-1080 flex flex-row items-start justify-center sm:justify-center md:justify-between lg:justify-between xl:justify-between w-full p-6 sm:p-12 md:p-12 lg:p-12 xl:p-12">
      {/* BG Image */}
      {bgImage ? <BgImage url={bgImage} /> : null}
      {/* Menu */}
      <div
        id="navigation_menu"
        className="hidden md:flex flex-row justify-start items-center">
        {menu.map((el, i, self) => {
          if (i === self.length - 1) {
            return <H5 key={el}>{el}</H5>;
          } else {
            return (
              <div id={el} key={el} className="flex flex-row">
                <H5>{el}</H5>
                <div aria-hidden className="ml-2 mr-2 mt-1">
                  <MenuArrow />
                </div>
              </div>
            );
          }
        })}
      </div>
      {/* Logo (name) */}
      <Contentful
        document={name}
        className="w-64 md:w-32 lg:w-64 text-center"
      />
      {/* Contacts */}
      <div
        id="navigation_contacts"
        className="hidden md:flex flex-row justify-start items-center">
        {contacts.map((el, i, self) => {
          const Contact = () => {
            if (el.toLowerCase() === 'instagram') {
              return (
                <div
                  id={'contact_via_' + el}
                  className="relative -top-1"
                  key={el}>
                  <Instagram />
                </div>
              );
            } else {
              return <H5 key={el}>{el}</H5>;
            }
          };

          if (i === self.length - 1) {
            return <Contact key={el} />;
          } else {
            return (
              <div className="flex flex-row" key={el}>
                <Contact key={el} />
                <div aria-hidden className="ml-2 mr-2 relative -top-1">
                  <VerticalDivider />
                </div>
              </div>
            );
          }
        })}
      </div>
    </nav>
  );
};

export default Nav;
