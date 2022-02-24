import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GoogleAd.css';

const propTypes = {
  slot: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  timeout: PropTypes.number,
};

const defaultProps = {
  classNames: '',
  timeout: 0,
};

const GoogleAd = ({ slot, classNames, timeout }) => {
  const [googleInit, setGoogleInit] = useState(null);

  useEffect(() => {
    const newTimeout = setTimeout(() => {
      if (typeof window !== 'undefined') {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error('Failed to push ad to window');
        }
      }
    }, timeout);

    setGoogleInit((oldTimeout) => {
      if (oldTimeout) clearTimeout(oldTimeout);
      return newTimeout;
    });

    return () => { clearTimeout(googleInit); };
  }, [timeout]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classNames}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2487321199626270"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

GoogleAd.propTypes = propTypes;
GoogleAd.defaultProps = defaultProps;

export default GoogleAd;
