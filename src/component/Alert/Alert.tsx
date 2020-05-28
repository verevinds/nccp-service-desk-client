import React, { useMemo } from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
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

  const options: ToastOptions = useMemo(() => {
    return {
      position: 'top-right',
      autoClose: !!autoClose ? autoClose : false,
      hideProgressBar: !autoClose,
      closeOnClick: false,
      rtl: false,
      draggable: true,
    };
  }, [autoClose]);

  switch (type) {
    case 'info':
      toast.info(body, options);
      break;
    case 'success':
      toast.success(body, options);
      break;
    case 'warn':
      toast.warn(body, options);
      break;
    default:
      toast(body, options);
      break;
  }
  return <ToastContainer />;
};

export default Alert;
