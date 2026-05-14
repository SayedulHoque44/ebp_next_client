import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  errorMessages,
  validatePin,
  validationPatterns,
} from "../utils/profileValidation";
import { IProfileUser } from "../types";

type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  group: string;
  paymantNote: string;
  note: string;
};

export const useProfileForm = (
  initialUser: IProfileUser,
  editOpen: boolean,
) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    group: "",
    paymantNote: "",
    note: "",
  });
  const [userDataObj, setUserDataObj] = useState<
    Record<string, string | number>
  >({});
  const [errorObj, setErrorObj] = useState<Record<string, string>>({});
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [matchedPin, setMatchedPin] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!editOpen || !initialUser) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData({
      name: initialUser.name || "",
      email: initialUser.email || "",
      phone: initialUser.phone || "",
      city: initialUser.city || "",
      group: initialUser.group || "",
      paymantNote: initialUser.paymantNote || "",
      note: initialUser.note || "",
    });
    setUserDataObj({});
    setErrorObj({});
    setCurrentPin("");
    setNewPin("");
    setMatchedPin(false);
  }, [editOpen, initialUser]);

  const debouncedValidation = useCallback(
    (
      field: keyof ProfileFormData,
      value: string,
      pattern: RegExp,
      errorMessage: string,
    ) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        const originalValue = String(initialUser?.[field] || "");
        if (originalValue === value) {
          setUserDataObj((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
          });
          setErrorObj((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
          });
          return;
        }
        if (pattern.test(value)) {
          setUserDataObj((prev) => ({ ...prev, [field]: value }));
          setErrorObj((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
          });
        } else {
          setErrorObj((prev) => ({ ...prev, [field]: errorMessage }));
        }
      }, 250);
    },
    [initialUser],
  );

  const createFieldHandler = useCallback(
    (field: keyof ProfileFormData, pattern: RegExp, errorMessage: string) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
        debouncedValidation(field, value, pattern, errorMessage);
      },
    [debouncedValidation],
  );

  const handlePaymantNote = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((p) => ({ ...p, paymantNote: value }));
    if (value !== (initialUser.paymantNote || ""))
      setUserDataObj((p) => ({ ...p, paymantNote: value }));
  };
  const handleNote = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((p) => ({ ...p, note: value }));
    if (value !== (initialUser.note || ""))
      setUserDataObj((p) => ({ ...p, note: value }));
  };
  const handleCurrentPin = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCurrentPin(value);
      setMatchedPin(Number(value) === initialUser.pin);
    }
  };
  const handleNewPin = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPin(value);
    const validation = validatePin(value);
    if (validation.isValid && Number(value) !== initialUser.pin) {
      setUserDataObj((p) => ({ ...p, pin: Number(value) }));
      setErrorObj((prev) => {
        const next = { ...prev };
        delete next.pin;
        return next;
      });
    } else {
      setErrorObj((prev) => ({
        ...prev,
        pin: validation.error || "PIN must be different and valid",
      }));
    }
  };

  return {
    formData,
    userDataObj,
    errorObj,
    currentPin,
    newPin,
    matchedPin,
    handleName: createFieldHandler(
      "name",
      validationPatterns.name,
      errorMessages.name,
    ),
    handleEmail: createFieldHandler(
      "email",
      validationPatterns.email,
      errorMessages.email,
    ),
    handlePhone: createFieldHandler(
      "phone",
      validationPatterns.phone,
      errorMessages.phone,
    ),
    handleCity: createFieldHandler(
      "city",
      validationPatterns.city,
      errorMessages.city,
    ),
    handleGroup: createFieldHandler(
      "group",
      validationPatterns.group,
      errorMessages.group,
    ),
    handlePaymantNote,
    handleNote,
    handleCurrentPin,
    handleNewPin,
    userObjKeysExits: (obj: Record<string, unknown>) =>
      !obj || Object.keys(obj).length === 0,
  };
};
