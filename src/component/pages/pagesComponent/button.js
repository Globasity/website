import React from 'react'
const Button = (props) => {
  const buttonStyle = {
    padding: props.padding,
    borderRadius:props.br,
    fontSize:props.fs,
    fontFamily:props.ff,
    color:props.color,
    backgroundColor:props.bg,
    border:props.border
  };
  return (
    <>
        <button disabled={props.disabled} type={props.type} style={buttonStyle} className='reuse_button'>{props.content}</button>
      
    </>
  )
}
export default Button
