import { showNotification } from "@mantine/notifications";
import {
  MdCheck as SuccessIcon,
  MdClose as ErrorIcon,
  MdOutlineWarningAmber as WarningIcon,
} from "react-icons/md";

interface NotifyProps {
  id: string;
  color?: string;
  title: string;
  message: string;
  autoClose?: number;
  icon?: string;
  loading?: boolean;
  withCloseButton?: boolean;
}

export default function Notify({
  id,
  color,
  title,
  message,
  autoClose,
  icon,
  loading,
  withCloseButton,
}: NotifyProps) {
  showNotification({
    id: id,
    color: color,
    title: title,
    message: message,
    loading: loading,
    autoClose: autoClose ? autoClose : false,
    withCloseButton: withCloseButton,

    icon:
      icon === "success" ? (
        <SuccessIcon />
      ) : icon === "error" ? (
        <ErrorIcon />
      ) : icon === "warning" ? (
        <WarningIcon />
      ) : undefined,
  });
}
