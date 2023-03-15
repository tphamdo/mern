import MessageType from '../MessageType'

const successStyle = {
  color: 'green',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const Notification = ({message}) => {
  if (message.text === null || message.messageType === null) {
    console.log('null')
    return null
  }

  const style = message.messageType === MessageType.ERROR? errorStyle : successStyle;
  return (
    <div style={style}>
      {message.text}
    </div>
  )
}

export default Notification
