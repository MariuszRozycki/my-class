import { validateUserLogIn } from './validateUserLogIn.mjs';

const setDocumentBody = (bodyHTML) => {
  document.body.innerHTML = bodyHTML;
};

describe('validateUserLogIn', () => {
  beforeEach(() => {
    setDocumentBody(`
      <div class="email-error d-none"></div>
      <div class="password-error d-none"></div>
    `);
  });

  it('should validate a correct email and password', () => {
    const email = 'user@stud.noroff.no';
    const password = 'password123';
    const result = validateUserLogIn(email, password);
    expect(result.email).toBe(email);
    expect(result.password).toBe(password);
    expect(document.querySelector('.email-error').classList.contains('d-none')).toBe(true);
    expect(document.querySelector('.password-error').classList.contains('d-none')).toBe(true);
  });

  it('should invalidate an incorrect email', () => {
    const email = 'user@incorrect.com';
    const password = 'password123';
    const result = validateUserLogIn(email, password);
    expect(result.email).toBe("");
    expect(result.password).toBe(password);
    expect(document.querySelector('.email-error').classList.contains('d-none')).toBe(false);
    expect(document.querySelector('.password-error').classList.contains('d-none')).toBe(true);
  });

  it('should invalidate a short password', () => {
    const email = 'user@noroff.no';
    const password = 'short';
    const result = validateUserLogIn(email, password);
    expect(result.email).toBe(email);
    expect(result.password).toBe("");
    expect(document.querySelector('.email-error').classList.contains('d-none')).toBe(true);
    expect(document.querySelector('.password-error').classList.contains('d-none')).toBe(false);
  });
});