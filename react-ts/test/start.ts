
function greeter(person: string) {
  return "Hello, " + person;
}

let user = "Jane User";
// user = ['a', 'b']; // -> error
document.body.textContent = greeter(user);

/*
 * // typescript compiler (need to install ts -g)
 *
 * $ tsc start.ts
 *
 * -> start.ts/start.js
 *
 */
