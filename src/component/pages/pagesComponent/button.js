import React from 'react';

const Button = (props) => {
  const buttonStyle = {
    padding: props.padding,
    borderRadius: props.br,
    fontSize: props.fs,
    fontFamily: props.ff,
    color: props.color,
    backgroundColor: props.bg,
    border: props.border
  };

  return (
    <>
      {props.type === "inverse" ? (
        <button disabled={props.disabled} type="button" style={buttonStyle} className='reuse_button_inverse'>
          {props.content}
        </button>
      ) : props.type === "heading" ? (
        <button disabled={props.disabled} type="button" style={buttonStyle} className='reuse_heading'>
          {props.content}
        </button>
      ) : props.type === "header" ? (
        <button disabled={props.disabled} type="button" style={buttonStyle} className='reuse_header'>
          {props.content}
        </button>
      ) : (
        <button disabled={props.disabled} type="button" style={buttonStyle} className='reuse_button'>
          {props.content}
        </button>
      )}
    </>
  );
};

export default Button;
