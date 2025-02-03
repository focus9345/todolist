import { useCallback, useEffect, useState } from "react";

function useScroll(threshold: number) {
    const [scrolled, setScrolled] = useState(false);

    const onScroll = useCallback(() => {
        setScrolled(window.scrollY > threshold);
    }, [threshold]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [onScroll]);
    // Check the scroll on first load
    useEffect(() => {
        onScroll();
    }, [onScroll]);

    return scrolled;
}

export default useScroll;