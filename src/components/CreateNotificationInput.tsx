import {Input, Modal, useInput, useModal} from "@geist-ui/react";
import {forwardRef, useImperativeHandle} from "react";

const CreateNotificationInput = forwardRef((props, ref) => {

  const {setVisible, bindings} = useModal();

  const { state: headlineInput, bindings: headlineBindings } = useInput('')
  const { state: urlInput, bindings: urlBindings } = useInput('')
  const { state: thumbnailInput, bindings: thumbnailBindings } = useInput('')

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

  }


  return (
    <>
      <Modal {...bindings}>
        <Modal.Title>Create new notification</Modal.Title>
        <Modal.Content>
          <Input {...headlineBindings} required>Headline</Input>
          <Input {...urlBindings} required>URL</Input>
          <Input {...thumbnailBindings} required>Thumbnail</Input>
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