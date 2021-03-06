import LoopIcon from '@material-ui/icons/Loop';
import './styles.scss';

export function LoaderButton(props) {
  return (
    <button
      disabled={props.disabled || props.isLoading}
      className={`LoaderButton ${props.className}`}
      onClick={props.onClick}
    >
      {props.isLoading && <LoopIcon className="LoaderSpinning" />}
      {props.children}
    </button>
  );
}
