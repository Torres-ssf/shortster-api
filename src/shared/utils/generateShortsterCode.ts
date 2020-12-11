export function generateShortsterCode(): string {
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';

  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const digits = '0123456789';

  const all = lowerCase.concat(upperCase, digits);

  let code = '';

  for (let i = 0; i < 6; i += 1) {
    const index = Math.floor(Math.random() * all.length);

    code = code.concat(all[index]);
  }

  return code;
}
