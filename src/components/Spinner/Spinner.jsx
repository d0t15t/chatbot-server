import style from "./Spinner.css"

export const Spinner = ({ status }) => {
  const isWaiting = () => status === "waiting"
  return isWaiting() ? (
    <div class={style.ldsRipple}>
      <div />
      <div />
    </div>
  ) : null
}

export default Spinner
