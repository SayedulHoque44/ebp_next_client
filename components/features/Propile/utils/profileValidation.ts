export const validationPatterns = {
  name: /^.{3,20}$/,
  email: /^(?:$|[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7})$/,
  phone: /^\+?\d{8,15}$/,
  city: /^.{3,20}$/,
  group: /^.{1,20}$/,
  pin: /^[1-9]\d{3,5}$/,
};

export const errorMessages = {
  name: "Name must be 3-20 characters",
  email: "Invalid email format",
  phone: "Invalid phone number",
  city: "City must be 3-20 characters",
  group: "Group must be 1-20 characters",
  pin: "PIN must be 4-6 digits and not weak",
};

export const validatePin = (pin: string) => {
  if (!pin) return { isValid: false, error: "PIN is required" };
  if (!validationPatterns.pin.test(pin)) {
    return { isValid: false, error: "PIN must be 4-6 digits" };
  }
  if (/(\d)\1{3,}/.test(pin)) {
    return { isValid: false, error: "Weak PIN not allowed" };
  }
  return { isValid: true, error: null };
};
