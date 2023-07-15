export const form = document.querySelector('.form__form') as HTMLFormElement;

export const validateCardInput = (input: HTMLInputElement) => {
  if (input.value) {
    input.value = input.value.replace(/[^0-9-]/g, '');
  }
};

export const validateNameInput = (input: HTMLInputElement) => {
  if (input.value) {
    input.value = input.value.replace(/[^a-zA-Z-]/g, '');
  }
};

export const submitForm = (e: SubmitEvent) => {
  e.preventDefault();
};
