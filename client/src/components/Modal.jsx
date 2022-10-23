import { onCleanup } from "solid-js";

const clickOut = (el, acc) => {
  const onClick = e => !el.contains(e.target) && acc()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}

const Modal = props => {

  return <div class="modal" use:clickOut={() => props.onClose()}>
    {props.children}
    <button class="modal-close" onClick={props.onClose}>X</button>
  </div>
}

export default Modal;