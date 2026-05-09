"use client";

import { useEffect, useMemo } from "react";
import { Modal, Spin } from "antd";
import type { ModalProps } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import type { CSSProperties, ReactNode } from "react";
import "./GenericModal.css";
import Button from "@/components/ui/Button";

type ButtonProps = React.ComponentProps<typeof Button>;
type ButtonVariant = NonNullable<ButtonProps["variant"]>;
type ButtonSize = NonNullable<ButtonProps["size"]>;
type LegacyActionType =
  | "default"
  | "primary"
  | "ghost"
  | "secondary"
  | "outline"
  | "danger"
  | "success"
  | "warning"
  | "link";

interface GenericModalAction {
  key?: string | number;
  label: ReactNode;
  variant?: ButtonVariant;
  type?: LegacyActionType;
  icon?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  size?: ButtonSize;
}

interface GenericModalProps extends Omit<
  ModalProps,
  | "open"
  | "onCancel"
  | "title"
  | "footer"
  | "width"
  | "className"
  | "style"
  | "styles"
> {
  open?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children?: ReactNode;
  actions?: GenericModalAction[];
  loading?: boolean;
  width?: number | string;
  showCloseButton?: boolean;
  closable?: boolean;
  allowBodyScroll?: boolean;
  className?: string;
  style?: CSSProperties;
  headerStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  footerStyle?: CSSProperties;
}

const GenericModal = ({
  open = false,
  onClose,
  title = "",
  children,
  actions = [],
  loading = false,
  width = "800px",
  showCloseButton = true,
  closable = true,
  allowBodyScroll = false, // Default to false - prevent background scroll
  className = "",
  style = {},
  headerStyle = {},
  bodyStyle = {},
  footerStyle = {},
  ...modalProps
}: GenericModalProps) => {
  // Handle modal visibility with animation and body scroll
  useEffect(() => {
    if (open) {
      if (!allowBodyScroll) {
        document.body.style.overflow = "hidden";
        document.body.classList.add("modal-open");
      }
    } else {
      if (!allowBodyScroll) {
        document.body.style.overflow = "";
        document.body.classList.remove("modal-open");
      }
    }

    // Cleanup function
    return () => {
      if (!allowBodyScroll) {
        document.body.style.overflow = "";
        document.body.classList.remove("modal-open");
      }
    };
  }, [open, allowBodyScroll]);

  // Default actions if none provided
  const defaultActions: GenericModalAction[] = useMemo(
    () => [
      {
        key: "close",
        label: "Close",
        variant: "secondary",
        onClick: onClose,
      },
    ],
    [onClose],
  );

  const modalActions = actions.length > 0 ? actions : defaultActions;

  // Map action props to Button component props
  const mapActionToButtonProps = (action: GenericModalAction): ButtonProps => {
    // Map Ant Design button types to our Button variants
    const variantMap: Record<LegacyActionType, ButtonVariant> = {
      default: "secondary",
      primary: "primary",
      ghost: "ghost",
      secondary: "secondary",
      outline: "outline",
      danger: "danger",
      success: "success",
      warning: "warning",
      link: "link",
    };

    // Use variant if provided, otherwise map from type
    const variant: ButtonVariant =
      action.variant || (action.type ? variantMap[action.type] : "secondary");

    // If danger is true, override variant to danger
    const finalVariant = action.danger ? "danger" : variant;

    return {
      variant: finalVariant,
      loading: action.loading || false,
      leftIcon: action.icon || action.leftIcon,
      rightIcon: action.rightIcon,
      onClick: action.onClick,
      disabled: action.disabled || false,
      className: action.className || "min-w-[100px]",
      size: action.size || "md",
    };
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.3,
      },
    },
  };

  return (
    <Modal
      open={open}
      onCancel={closable ? onClose : undefined}
      closable={false}
      maskClosable={closable}
      title={
        title ? (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between w-full"
          >
            <h2 className="text-xl font-bold text-white m-0">{title}</h2>
            {showCloseButton && (
              <Button
                type="button"
                variant="ghost"
                leftIcon={<FaTimes className="text-white" />}
                onClick={onClose}
                className="text-white hover:bg-white/20 bg-transparent! border-none min-w-0 px-2 h-8"
                size="sm"
              />
            )}
          </motion.div>
        ) : null
      }
      width={width}
      className={`generic-modal no-padding p-0! m-0! ${className}`}
      style={{
        padding: 0,
        ...style,
      }}
      centered
      styles={{
        mask: {
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        // Ant Design 6: outer inset is `.ant-modal-container` padding (contentPadding), not body.
        container: {
          padding: 0,
        },
        header: {
          background: "linear-gradient(135deg, #8319f4 0%, #7c3aed 100%)",
          // borderRadius: "12px 12px 0 0",
          border: "none",
          padding: "20px 24px",
          minHeight: title ? "auto" : "0",
          ...headerStyle,
        },
        body: {
          padding: 0,
          margin: 0,
          maxHeight: "calc(90vh - 180px)",
          overflowY: "auto",
          overflowX: "hidden",
          ...bodyStyle,
        },
        footer: {
          borderTop: "1px solid #f0f0f0",
          padding: "16px 24px",
          borderRadius: "0 0 12px 12px",
          ...footerStyle,
        },
      }}
      footer={
        modalActions.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-end gap-3"
          >
            {modalActions.map((action, index) => {
              const buttonProps = mapActionToButtonProps(action);
              return (
                <motion.div
                  key={action.key || index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button type="button" {...buttonProps}>
                    {action.label}
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        ) : null
      }
      {...modalProps}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-12"
          >
            <Spin size="large" />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default GenericModal;
