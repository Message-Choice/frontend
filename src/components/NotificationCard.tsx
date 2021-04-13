import {Avatar, Card, Col, Image, Row, Text,} from "@geist-ui/react";
import {truncate} from "../utils/truncate";
import {useRouter} from "next/router";
import moment from "moment";

const NotificationCard = ({props}) => {

  const router = useRouter()

  const url = props.data.url
  const thumbnail = props.data.thumbnail
  const headline = props.data.headline

  // todo get from verto id
  const avatar = "https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
  const username = props.from
  const date = moment.unix(props.timestamp).format("MM/DD/YYYY");

  return (
    <>
      <Card width="300px">
        <Image
          style={{cursor: "pointer", objectFit: 'cover', minHeight: "200px", maxHeight: "200px"}}
          onClick={() => {
            window.open(url, '_blank');
          }}
          src={thumbnail}
          height={200} width={400}/>
        <Text h4
              style={{cursor: "pointer", marginBottom: '0', minHeight: "100px", maxHeight: "100px"}}
              onClick={() => {
                window.open(url, '_blank');
              }}>{headline}</Text>
        <Card.Footer>
          <Row align={"middle"}>
            <span>
              <Avatar src={avatar} size="small"/>
              <Text type={"secondary"} style={{cursor: "pointer"}} onClick={() => {
                router.push(`/feed/${username}`)
              }}> {truncate(username)}</Text>
            </span>
            <Row justify={"end"}>
              <Text span>{date}</Text>
            </Row>
          </Row>
        </Card.Footer>
      </Card>
    </>
  )

}

export default NotificationCard