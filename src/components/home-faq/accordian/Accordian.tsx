import React, { useRef, useState } from "react";

import "./Accordian.css";

interface Faq {
  title: string;
  content: string;
}

const Accordian = (faq: Faq) => {
  const [active, setActive] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <React.Fragment>
      <div className="accordian">
        <div className="header" onClick={() => setActive(!active)}>
          <span className="title">{faq.title}</span>
          <span className="icon">{active ? "-" : "+"}</span>
        </div>

        <div
          style={{
            maxHeight: active ? `${contentRef.current?.scrollHeight}px` : "0",
          }}
        >
          <div className="content" ref={contentRef}>
            {faq.content}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Accordian;
