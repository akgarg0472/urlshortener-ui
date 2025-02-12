import confetti from "canvas-confetti";
import { Clipboard, X } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useRef, useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import "./CreateUrlSuccess.css";

interface CreateUrlSuccessProps {
  shortUrl: string;
  onClose: () => void;
}

export const CreateUrlSuccess = (props: CreateUrlSuccessProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    console.log("rendering CreateUrlSuccess");
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQRCode = () => {
    if (qrRef.current) {
      const qrImageUrl = qrRef.current.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = qrImageUrl;
      a.download = `${props.shortUrl}.png`;
      a.click();
    }
  };

  return (
    <React.Fragment>
      {isOpen && (
        <div className="generated__short__url__modal__overlay">
          <div className="generated__short__url__modal">
            <div className="generated__short__url__modal__header">
              <h2>🎉 Short URL Created!</h2>
              <button
                className="generated__short__url__close__btn"
                onClick={() => {
                  setIsOpen(false);
                  props.onClose();
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="generated__short__url__qr__section">
              <QRCodeCanvas value={props.shortUrl} size={180} ref={qrRef} />
              <p className="generated__short__url__scan__text">
                Scan to visit:
              </p>
              <div className="generated__short__url__url__box">
                <input type="text" value={props.shortUrl} readOnly={true} />
                <button onClick={handleCopy}>
                  <Clipboard size={18} />
                </button>
              </div>
              {copied && (
                <span className="generated__short__url__copied__text">
                  Copied!
                </span>
              )}
            </div>

            <div className="generated__short__url__share__section">
              <div className="generated__short__url__social__icons">
                <WhatsappShareButton
                  url={props.shortUrl}
                  title="Hey! I found this interesting link, check it out!"
                >
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>

                <TwitterShareButton
                  url={props.shortUrl}
                  title="Just discovered this amazing link! Don't miss out!"
                >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>

                <FacebookShareButton url={props.shortUrl} hashtag="#CoolLink">
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
              </div>

              <button
                className="generated__short__url__qr__download__btn"
                onClick={handleDownloadQRCode}
              >
                Download QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
