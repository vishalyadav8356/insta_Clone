import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const preservedRoutes = new Set(['/', '/saved-posts']);

const ScrollManager = () => {
    const location = useLocation();
    const navigationType = useNavigationType();
    const frameRef = useRef(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const storageKey = useMemo(() => `scroll:${location.pathname}`, [location.pathname]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

        updatePreference();
        mediaQuery.addEventListener('change', updatePreference);

        return () => {
            mediaQuery.removeEventListener('change', updatePreference);
        };
    }, []);

    useEffect(() => {
        const restoreScroll = () => {
            const savedY = sessionStorage.getItem(storageKey);
            if (savedY !== null) {
                window.scrollTo({ top: Number(savedY), behavior: 'auto' });
                return;
            }
            window.scrollTo({ top: 0, behavior: 'auto' });
        };

        if (preservedRoutes.has(location.pathname) && navigationType === 'POP') {
            restoreScroll();
        } else {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
            });
        }

        const saveScrollPosition = () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }

            frameRef.current = requestAnimationFrame(() => {
                sessionStorage.setItem(storageKey, String(window.scrollY));
            });
        };

        window.addEventListener('scroll', saveScrollPosition, { passive: true });

        return () => {
            sessionStorage.setItem(storageKey, String(window.scrollY));
            window.removeEventListener('scroll', saveScrollPosition);
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [location.pathname, navigationType, prefersReducedMotion, storageKey]);

    return null;
};

export default ScrollManager;