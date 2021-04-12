import {Avatar, Button, Text} from "@geist-ui/react";
import {subscribe} from "message-choice";
import {truncate} from "../utils/truncate";

const User = (props) => {

  return (
    <div className="user">
      <Avatar
        size="large"
        text={props.address}
        src={props.avatar}
        draggable={false}
      />
      <div className="names">
        <Text h3 style={{marginTop: 0, marginBottom: 0}}>
          {props.hasIdentity ? props.name : truncate(props.address)}
        </Text>
        <Button type="secondary" size={"small"} style={{marginTop: 0, marginBottom: 0}} onClick={async () => {
          const txId = await subscribe(props.address)
          console.log(txId)
        }}>Subscribe</Button>
      </div>

      <style jsx>{`
        .user {
          display: inline-flex;
          padding: 0 20;
          justify-content: center;
          align-items: center;
          width: max-content;
          max-width: 100%;
        }
        .names {
          margin-left: 40;
          display: inline-flex;
          flex-direction: column;
          white-space: nowrap;
        }
      `}</style>
    </div>
  )

}

export default User;