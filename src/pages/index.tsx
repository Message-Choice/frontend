import {Button, ButtonGroup, Col, Row, Text, Textarea} from "@geist-ui/react"

const Home = () => {

  const messages = [
    {content: "Hi there!", sent: true},
    {content: "How is it going?", sent: true},
    {content: "All good!", sent: false}
  ]

  return (
    <>
      <div style={{minHeight: "80vh"}}>
        <Text h4>MessageChoice</Text>
        {messages.map((message) => {
          return (<Text style={{
            textAlign: message.sent ? "right" : "left",
            paddingLeft: "1em",
            paddingRight: "1em"
          }}>{message.content}</Text>)
        })}
      </div>
      <div style={{minHeight: "20vh"}}>
        <Textarea width="100%" style={{padding: "0em", maxWidth: "100vw"}}/>
        <Button style={{width: "100%"}}>Send</Button>
      </div>
    </>
  )
}

export default Home;