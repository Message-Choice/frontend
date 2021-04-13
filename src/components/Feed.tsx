import {Grid, Text} from "@geist-ui/react";
import NotificationCard from "./NotificationCard";
import {feed} from "message-choice";
import {useEffect, useState} from "react";

const Feed = (props) => {

  const [notifications, setMyNotifications] = useState([]);

  const loadNotificationFeed = async (address) => {
    console.log("Loading")
    const f = []
    const full = await feed(address)
    console.log(full)
    for (let item of full) {
      try {
        item.data = JSON.parse(item.data)
        f.push(item)
      } catch (e) {

      }
    }
    setMyNotifications(f);
  }

  useEffect(() => {
    console.log("HERE")
    if (!props.addr) return;
    else {
      console.log("I am here")
      loadNotificationFeed(props.addr)
    }

  }, [JSON.stringify(props.addr)])

  return (
    <Grid.Container gap={2} justify="center">
      {
        notifications.map((notification) => {
          return (
            <Grid>
              <NotificationCard props={notification}/>
            </Grid>
          )
        })
      }
      {
        notifications.length === 0 ? <Text>No notifications found</Text> : undefined
      }
    </Grid.Container>
  )
}

export default Feed;