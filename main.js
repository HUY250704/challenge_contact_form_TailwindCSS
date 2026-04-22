document.addEventListener("DOMContentLoaded", () => {
  const openMobileMenuButton = document.querySelector("[data-open-mobile-menu]");
  const closeMobileMenuButton = document.querySelector("[data-close-mobile-menu]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const mobileBrand = document.querySelector("[data-mobile-brand]");
  const form = document.querySelector("[data-contact-form]");

  function openMobileMenu() {
    if (!mobileMenu) return;

    mobileMenu.classList.remove("hidden");
    mobileMenu.setAttribute("aria-hidden", "false");
    openMobileMenuButton?.setAttribute("aria-expanded", "true");
    mobileBrand?.classList.add("hidden");
    document.body.classList.add("overflow-hidden");
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;

    mobileMenu.classList.add("hidden");
    mobileMenu.setAttribute("aria-hidden", "true");
    openMobileMenuButton?.setAttribute("aria-expanded", "false");
    mobileBrand?.classList.remove("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  openMobileMenuButton?.addEventListener("click", openMobileMenu);
  closeMobileMenuButton?.addEventListener("click", closeMobileMenu);

  openMobileMenuButton?.setAttribute("aria-expanded", "false");

  mobileMenu?.addEventListener("click", (event) => {
    if (event.target === mobileMenu) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      closeMobileMenu();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  if (!form) return;

  const fields = {
    firstName: form.querySelector('[data-field="firstName"]'),
    lastName: form.querySelector('[data-field="lastName"]'),
    email: form.querySelector('[data-field="email"]'),
    message: form.querySelector('[data-field="message"]'),
  };

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function getErrorNode(fieldName) {
    return form.querySelector(`[data-error-for="${fieldName}"]`);
  }

  function showError(fieldName, message) {
    const field = fields[fieldName];
    const errorNode = getErrorNode(fieldName);

    if (!field || !errorNode) return;

    if (fieldName === "message") {
      field.classList.add("border-b");
      field.classList.add("!border-red-500");
    } else {
      field.classList.add("!border-red-500");
    }

    field.setAttribute("aria-invalid", "true");

    errorNode.textContent = message;
    errorNode.classList.remove("hidden");
  }

  function clearError(fieldName) {
    const field = fields[fieldName];
    const errorNode = getErrorNode(fieldName);

    if (!field || !errorNode) return;

    if (fieldName === "message") {
      field.classList.remove("border-b");
      field.classList.remove("!border-red-500");
    } else {
      field.classList.remove("!border-red-500");
    }

    field.removeAttribute("aria-invalid");

    errorNode.textContent = "";
    errorNode.classList.add("hidden");
  }

  function validateField(fieldName) {
    const field = fields[fieldName];

    if (!field) return true;

    const value = field.value.trim();

    if (!value) {
      showError(fieldName, "This field is required");
      return false;
    }

    if (fieldName === "email" && !validateEmail(value)) {
      showError(fieldName, "Please enter a valid email address");
      return false;
    }

    clearError(fieldName);
    return true;
  }

  function validateForm() {
    return Object.keys(fields).every((fieldName) => validateField(fieldName));
  }

  Object.keys(fields).forEach((fieldName) => {
    const field = fields[fieldName];

    if (!field) return;

    field.addEventListener("input", () => {
      validateField(fieldName);
    });

    field.addEventListener("blur", () => {
      validateField(fieldName);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    alert("Form submitted successfully");
  });
});
