import {useEffect, useRef, useState} from "react";
import {Button, Page, Row, Spacer, Text, Tooltip} from "@geist-ui/react";
import useArConnect from "use-arconnect";
import CreateNotificationInput from "../../components/CreateNotificationInput";
import User from "../../components/User";
import {fetchIdentity} from "../../utils/identity";
import {router} from "next/client";
import Feed from "../../components/Feed";

const Index = () => {

  const createNotificationModalRef = useRef();

  const addr = router.query.address as string
  const [identity, setIdentity] = useState({});

  const arConnect = useArConnect();

  useEffect(() => {
    if (!addr) return;
    else {
      fetchIdentity(addr).then((res) => {
        setIdentity(res)
      })
    }

  }, [addr])

  return (
    <>
      <Page size={"large"} dotBackdrop={true}>
        <Page.Header>
          <Row justify="space-between" align="middle">
            <Button
              type="success-light"
              // @ts-ignore
              onClick={() => createNotificationModalRef.current.open()}
            >
              Create Notification
            </Button>
            <Tooltip
              text={
                <p style={{margin: 0, textAlign: "center"}}>
                  Click here to {addr === "" ? "login" : "logout"}
                </p>
              }
              placement="bottom"
            >
              <Text style={{cursor: "pointer"}}>
                {(arConnect && (addr === "" ? "Log In" : "Logout")) ||
                "Install ArConnect"}
              </Text>
            </Tooltip>
          </Row>
        </Page.Header>
        <Page.Content>
          <Row justify={"center"}>
            <User {...identity}/>
          </Row>
          <Spacer y={2}/>
          <Feed {...{addr}}/>
        </Page.Content>
      </Page>
      <CreateNotificationInput ref={createNotificationModalRef}/>
    </>
  )

}

export default Index;