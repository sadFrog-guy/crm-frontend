// useCustomLocation.ts
import { siteConfig } from '@/config/site';
import { useLocation } from 'react-router-dom';

function usePageLabel() {
    const location = useLocation()
    const currentPageName = siteConfig.navItems.find(navItem => navItem.href === location.pathname)

    if (currentPageName === undefined) {
      return "Неизвестная страница"
    } else {
      return currentPageName.label
    }
  }

export default usePageLabel;
