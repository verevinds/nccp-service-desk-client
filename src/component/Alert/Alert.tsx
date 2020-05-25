import React, { useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastiry.scss';

interface Props {
  text: string;
  type?: 'default' | 'success' | 'info' | 'warn';
  autoClose?: number;
}

const Alert: React.FC<Props> = ({ text, type, autoClose }) => {
  const body = useMemo(() => {
    const icon = [
      { emoji: '✅', type: 'success' },
      { emoji: '️📰', type: 'info' },
      { emoji: '⚠️', type: 'warn' },
    ];
    let iconSpan = icon.find((item) => item.type === type);
    if (!iconSpan) iconSpan = { emoji: '✉️', type: 'default' };

    return (
      <div className={'alertCustom'}>
        <div className={'alertCustom__title'}>
          <span role="img" aria-label={iconSpan?.type}>
            {iconSpan?.emoji}
          </span>
          <h6>{text}</h6>
        </div>
      </div>
    );
  }, [text, type]);

  switch (type) {
    case 'info':
      toast.info(body);
      break;
    case 'success':
      toast.success(body);
      break;
    case 'warn':
      toast.warn(body);
      break;
    default:
      toast(body);
      break;
  }

  return (
    <ToastContainer
      position="top-right"
      autoClose={autoClose}
      hideProgressBar={!autoClose}
      newestOnTop
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
    />
  );
};

export default Alert;
