import { useMemo, useState } from 'react';
import { BackdropContext } from './BackdropContext';

/**
 * The {@link BackdropProvider} component.
 *
 * @param {Object} param0 The component props.
 * @param {React.ReactNode} param0.children The children components.
 * @returns {React.JSX.Element} The {@link BackdropProvider} component.
 */
export default function BackdropProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [style, setStyle] = useState({});
  const [pressListeners, setPressListeners] = useState([]);

  const backdropState = useMemo(() => ({
    isVisible,
    pressListeners,
    setIsVisible,
    setPressListener: (onPress) => {
      setPressListeners([...pressListeners, onPress]);
      return () => setPressListeners(pressListeners.filter((listener) => listener !== onPress));
    },
    setStyle,
    style,
  }), [isVisible, pressListeners, style]);

  return (
    <BackdropContext.Provider value={backdropState}>
      { children }
    </BackdropContext.Provider>
  );
}
