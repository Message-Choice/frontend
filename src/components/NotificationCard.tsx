import {Avatar, Card, Image, Text,} from "@geist-ui/react";

const NotificationCard = ({props}) => {
  const url = props.data.url
  const thumbnail = props.data.thumbnail
  const headline = props.data.headline

  // todo get from verto id
  const avatar = "https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
  const username = props.from
  const date = props.timestamp

  return (
    <>
      <Card width="400px" style={{cursor: "pointer"}} onClick={() => {
        window.open(url, '_ blank');
      }}>
        <Image
          src={thumbnail}
          height={200} width={400} style={{objectFit: 'cover'}}/>
        <Text h4 style={{marginBottom: '0'}}>{headline}</Text>
        <Card.Footer>
          <Avatar src={avatar} size="small"/>
          <Text style={{width: "100%"}} type={"secondary"} span> {username}
            <Text style={{textAlign: "right", width: "100%"}} span>{date}</Text>
          </Text>
        </Card.Footer>
      </Card>
    </>
  )

}

export default NotificationCard