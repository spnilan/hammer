import React, { useEffect } from "react";

const Editable = ({
  text,
  childRef,
  handleEvent,
  isEditing
}) => {

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);


  return (
    <section>
      {isEditing ? (
        <div
          onBlur={handleEvent}
          onKeyDown={handleEvent}
        >
          <input type='text' value={text} ref={childRef} onChange={handleEvent} />
        </div>
      ) : (
        <div
          className={`rounded py-2 px-3 text-gray-700 leading-tight whitespace-pre-wrap hover:shadow-outline `}
          onClick={handleEvent}
        >
          <span className={`${text ? "text-black" : "text-gray-500"}`}>
            {text}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;


