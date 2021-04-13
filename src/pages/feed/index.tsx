import {useEffect, useRef, useState} from "react";
import {Button, Page, Row, Spacer, Text, Tooltip, useToasts} from "@geist-ui/react";
import useArConnect from "use-arconnect";
import CreateNotificationInput from "../../components/CreateNotificationInput";
import Feed from "../../components/Feed";
import {subscriptions} from "message-choice";

const arConnectPermissions = [
  "ACCESS_ADDRESS",
  "ACCESS_ALL_ADDRESSES",
  "SIGN_TRANSACTION",
];


const Index = () => {

  const createNotificationModalRef = useRef();

  const [addr, setAddr] = useState("");
  const [mySubscriptions, setMySubscriptions] = useState([]);
  const [, setToast] = useToasts();

  const arConnect = useArConnect();

  // load subscriptions
  useEffect(() => {
    if (!addr) return;
    else {
      subscriptions(addr).then((s) => {
        // add own addr because you want to see own content
        console.log(s)
        s.push(addr)
        console.log(s)
        setMySubscriptions(s)
      })
    }

  }, [addr])

  useEffect(() => {
    if (!arConnect) return;
    (async () => {
      try {
        if ((await arConnect.getPermissions()).includes("ACCESS_ADDRESS")) {
          setAddr(await arConnect.getActiveAddress());
        }
      } catch {
      }
    })();
  }, [arConnect]);

  const connectWallet = async () => {
    if (!arConnect) return window.open("https://arconnect.io");
    // logout
    if (addr !== "") {
      await arConnect.disconnect();
      setAddr("");
    } else {
      // login
      try {
        await arConnect.connect(arConnectPermissions);
        setAddr(await arConnect.getActiveAddress());
        window.addEventListener("walletSwitch", (e: any) =>
          setAddr(e.detail.address)
        );
      } catch {
        setToast({text: "Could not connect to ArConnect", type: "error"});
      }
    }
  };


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
              <Text onClick={connectWallet} style={{cursor: "pointer"}}>
                {(arConnect && (addr === "" ? "Log In" : "Logout")) ||
                "Install ArConnect"}
              </Text>
            </Tooltip>
          </Row>
        </Page.Header>
        <Page.Content>
          <Row justify={"center"}>
            <Text h3> Recent Notifications</Text>
          </Row>
          <Spacer y={2}/>
          <Feed {...{addr: mySubscriptions}}/>
        </Page.Content>
      </Page>
      <CreateNotificationInput ref={createNotificationModalRef}/>
    </>
  )

}

export default Index;