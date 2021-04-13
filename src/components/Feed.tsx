import {Grid, Page, Text} from "@geist-ui/react";
import NotificationCard from "./NotificationCard";
import {feed} from "message-choice";
import {useEffect, useState} from "react";
import {fetchIdentity} from "../utils/identity";

const Feed = (props) => {

  const [notifications, setMyNotifications] = useState([]);

  const loadNotificationFeed = async (address) => {
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
    if (!props.addr) return;
    else {
      loadNotificationFeed(props.addr)
    }

  }, [props.addr])

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