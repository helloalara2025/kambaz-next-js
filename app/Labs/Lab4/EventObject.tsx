import { useState, MouseEvent } from "react";
export default function EventObject() {
  const [event, setEvent] = useState<Record<string, unknown> | null>(null);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const evt = {
      target: (e.target as HTMLElement)?.outerHTML ?? null,
      type: e.type,
      clientX: e.clientX,
      clientY: e.clientY,
      button: e.button
    };
    setEvent(evt);
  };
  return (
    <div>
      <h2>Event Object</h2>
      <button onClick={(e) => handleClick(e)}
        className="btn btn-primary"
        id="wd-display-event-obj-click">
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr/>
    </div>
);}
