import NotificationCard from "../../components/NotificationCard";
import {useEffect, useRef, useState} from "react";
import {Button, Grid, Page, Row, Spacer, Text, Tooltip, useToasts} from "@geist-ui/react";
import useArConnect from "use-arconnect";
import {feed} from "message-choice";
import CreateNotificationInput from "../../components/CreateNotificationInput";
import User from "../../components/User";
import {fetchIdentity} from "../../utils/identity";

const arConnectPermissions = [
  "ACCESS_ADDRESS",
  "ACCESS_ALL_ADDRESSES",
  "SIGN_TRANSACTION",
];


const Index = () => {

  const createNotificationModalRef = useRef();

  const [addr, setAddr] = useState("");
  const [myFeed, setMyFeed] = useState([]);
  const [identity, setIdentity] = useState({});
  const [, setToast] = useToasts();

  const arConnect = useArConnect();

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

  useEffect(() => {
    if (!addr) return;
    else {
      loadNotificationFeed(addr)
      fetchIdentity(addr).then((res) => {
        setIdentity(res)
      })
    }

  }, [addr])

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
    setMyFeed(f);
  }

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
          <Grid.Container gap={2} justify="center">
            {
              myFeed.map((f) => {
                return (
                  <Grid>
                    <NotificationCard props={f}/>
                  </Grid>
                )
              })
            }
          </Grid.Container>
        </Page.Content>
      </Page>
      <CreateNotificationInput ref={createNotificationModalRef}/>
    </>
  )

}

export default Index;