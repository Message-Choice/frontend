export const fetchContract = async (id: string) => {
  const raw = await fetch(`https://v2.cache.verto.exchange/${id}`);
  const res = await raw.json();

  return res.state;
};

export const fetchIdentity = async (input: string) => {
  const state = await fetchContract(
    "QTdsfuEFuZDF-uu14RJUY_C88Mlr2XVTIp8DRzwoWvQ"
  );
  const people = state.people;
  const isAddress = /[a-z0-9_-]{43}/i.test(input);

  let person: any;
  if (isAddress) {
    // Input is a wallet address.
    person = people.find((entry) => entry.address === input);
  } else {
    // Input is a username.
    person = people.find((entry) => entry.username === input);
  }

  if (person) {
    return {
      hasIdentity: true,
      ...person,
    };
  } else {
    if (isAddress) {
      const len = input.length;
      const formatted = input.slice(0, 5) + "..." + input.slice(len - 5, len);

      return {
        hasIdentity: false,
        name: formatted,
        address: input,
      };
    }
  }
}