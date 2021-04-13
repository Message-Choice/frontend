import {Input, Modal, useInput, useModal} from "@geist-ui/react";
import {forwardRef, useImperativeHandle} from "react";
import {publish} from "message-choice";

const CreateNotificationInput = forwardRef((props, ref) => {

  const {setVisible, bindings} = useModal();

  const {state: headlineInput, bindings: headlineBindings} = useInput('')
  const {state: urlInput, bindings: urlBindings} = useInput('')
  const {state: thumbnailInput, bindings: thumbnailBindings} = useInput('')

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));

  const createNotification = async () => {

    const data = {
      headline: headlineInput,
      url: urlInput,
      thumbnail: thumbnailInput,
    }
    await publish(Buffer.from(JSON.stringify(data)))
  }


  return (
    <>
      <Modal {...bindings}>
        <Modal.Title>Create new notification</Modal.Title>
        <Modal.Content>
          <Input {...headlineBindings} required width={"100%"}>Headline</Input>
          <Input {...urlBindings} required width={"100%"}>URL</Input>
          <Input {...thumbnailBindings} required width={"100%"}>Thumbnail</Input>
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={async () => {
          await createNotification()
          setVisible(false)
        }}>
          Create
        </Modal.Action>
      </Modal>
    </>
  )
});

export default CreateNotificationInput;