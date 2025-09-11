import { useMediaQuery } from 'react-responsive';

export function useTypeDevice() {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return { isDesktopOrLaptop, isTablet, isMobile };
}
